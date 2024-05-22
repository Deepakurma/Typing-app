import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import {TbReload} from "react-icons/tb";

const NumWords = 200;
const Seconds = 10;

function App() {
  const [words, setWords] = useState([]);
  const [count, setCount] = useState(Seconds);
  const [input, setInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const textInput = useRef(null);
  const [currentCharIndex, setCurrentCharIndex] = useState(-1);
  const [currentChar, setCurrentChar] = useState("");

  useEffect(() => {
    // Fetch words from an API
    fetchWordsFromAPI().then((words) => {
      setWords(words);
    });
  }, []);

  useEffect(() => {
    if (status === "started") {
      textInput.current.focus();
    }
  }, [status]);

  async function fetchWordsFromAPI() {
    try {
      const response = await fetch("http://api.quotable.io/random");
      if (response.ok) {
        const data = await response.json();
        if (data && data.content) {
          const words = data.content.split(" ").slice(0, NumWords);
          return words;
        } else {
          console.error("API response is missing the 'content' property.");
          return [];
        }
      } else {
        console.error("Failed to fetch words from the API.");
        return [];
      }
    } catch (error) {
      console.error("An error occurred while fetching words from the API:", error);
      return [];
    }
  }
  function restart() {
    window.location.reload();
  }
  
  function start() {
    if (status === "finished") {
      // You should also reset the input field and focus it when restarting.
      setInput("");
      textInput.current.focus();
      setCorrect(0);
      setIncorrect(0);
      setWordIndex(0);
      setCurrentCharIndex(-1);
      setCurrentChar("");
    }
  
    setStatus("started");
  
    let interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 0) {
          setStatus("finished");
          clearInterval(interval);
          return Seconds;
        } else {
          return prevCount - 1;
        }
      });
    }, 1000);
  }
  

  function handleKeyDown(event, key) {
    if (status !== "started") {
      return;
    }

    if (event.keyCode === 32) {
      checkMatch();
      setInput("");
      setWordIndex((prevIndex) => (prevIndex < words.length - 1 ? prevIndex + 1 : 0));
      setCurrentCharIndex(-1);
    } else if (event.keyCode === 8) {
      setCurrentCharIndex((prevIndex) => (prevIndex > -1 ? prevIndex - 1 : -1));
      setCurrentChar("");
    }else if(event.keyCode === 16){
      setCurrentChar("");
      setCurrentCharIndex(-1);
    } 
    else {
      setCurrentCharIndex((prevIndex) => prevIndex + 1);
      setCurrentChar(key);
    }
  }

  function checkMatch() {
    const currentIndex = words[wordIndex];
    const doesItMatch = currentIndex === input.trim();
    if (doesItMatch) {
      setCorrect((prevCorrect) => prevCorrect + 1);
    } else {
      setIncorrect((prevIncorrect) => prevIncorrect + 1);
    }
  }

  function getcharclass(wIndex, charIndex, char) {
    if (wIndex < wordIndex) {
      return "correct";
    } else if (wIndex === wordIndex && charIndex < currentCharIndex) {
      return "correct";
    } else if (wIndex === wordIndex && charIndex === currentCharIndex) {
      return char === currentChar ? "correct" : "incorrect";
    } else {
      return "";
    }
  }


  return (
    <div className="container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
      <button className="btn-res" onClick={restart}><TbReload size={30} color="orange"/></button>
        <div className="count">
          <h2>{count}</h2>
        </div>
        <p className="p">Time</p>
        <div className="btns">
          <button onClick={() => (setCount(30))}>30</button>
          <button onClick={() => (setCount(60))}>60</button>
          <button onClick={() => (setCount(120))}>120</button>
        </div>
        <div className="input-container">
          <input
            disabled={status !== "started"}
            type="text"
            ref={textInput}
            onKeyDown={(e) => handleKeyDown(e, e.key)}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="btn">
          <button onClick={start}>Start</button>
          {status === "finished" && (<button onClick={restart}>Restart</button>)}
          {/* <button onClick={restart}>Reload</button> */}
        </div>
        {status === "started" && (
          <div className="words-container">
            {words.map((word, i) => (
              <div className="words-card" key={i}>
                {word.split("").map((char, id) => (
                  <div key={id} className={getcharclass(i, id, char)} style={{ display: "inline" }}>
                    {char}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      {status === "finished" && (
        <div className="section">
          <div className="columns">
            <div className="column1">
              <p>WPM</p>
              <p className="pp1">{correct}</p>
            </div>
            <div className="column2">
              <p>Accuracy</p>
              <p className="pp2">{Math.round((correct / (correct + incorrect)) * 100)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;










