import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "./Header";
import wordBank from "./Randomwords";

const WORD_COUNT = 55;
const DEFAULT_TIME = 30;

function makeWords() {
  return [...wordBank].sort(() => Math.random() - 0.5).slice(0, WORD_COUNT);
}

function App() {
  const [words, setWords] = useState(makeWords);
  const [timeLimit, setTimeLimit] = useState(DEFAULT_TIME);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [input, setInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const textInput = useRef(null);

  useEffect(() => {
    if (status !== "running") {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timer);
          setStatus("finished");
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  const correct = results.filter(Boolean).length;
  const incorrect = results.filter((result) => result === false).length;
  const accuracy = results.length ? Math.round((correct / results.length) * 100) : 100;
  const wpm = useMemo(() => {
    const elapsed = Math.max(timeLimit - timeLeft, 1);
    return Math.round((correct / elapsed) * 60);
  }, [correct, timeLimit, timeLeft]);

  function reset(newTime = timeLimit) {
    setWords(makeWords());
    setTimeLimit(newTime);
    setTimeLeft(newTime);
    setInput("");
    setWordIndex(0);
    setResults([]);
    setStatus("idle");
    setTimeout(() => textInput.current?.focus(), 0);
  }

  function start() {
    if (status === "finished") {
      reset();
    }
    setStatus("running");
    textInput.current?.focus();
  }

  function finishWord() {
    const typedWord = input.trim();
    if (!typedWord) {
      return;
    }
    setResults((current) => [...current, typedWord === words[wordIndex]]);
    setWordIndex((current) => current + 1);
    setInput("");
  }

  function handleKeyDown(event) {
    if (status !== "running") {
      event.preventDefault();
      return;
    }
    if (event.key === " ") {
      event.preventDefault();
      finishWord();
    }
  }

  function setTime(seconds) {
    if (status === "running") {
      return;
    }
    reset(seconds);
  }

  function getWordClass(index) {
    if (index === wordIndex && status === "running") {
      return "word active";
    }
    if (index < results.length) {
      return results[index] ? "word complete" : "word wrong";
    }
    return "word";
  }

  function getCharClass(word, char, charIndex) {
    if (word !== words[wordIndex] || status !== "running") {
      return "";
    }
    if (charIndex >= input.length) {
      return "";
    }
    return input[charIndex] === char ? "correct" : "incorrect";
  }

  return (
    <main className="app">
      <Header />

      <section className="toolbar" aria-label="typing settings">
        <div className="mode">time</div>
        {[15, 30, 60, 120].map((seconds) => (
          <button
            className={timeLimit === seconds ? "active-time" : ""}
            key={seconds}
            onClick={() => setTime(seconds)}
          >
            {seconds}
          </button>
        ))}
      </section>

      <section className="test-panel" onClick={start}>
        <div className="timer">{timeLeft}</div>
        <div className="words-container">
          {words.map((word, i) => (
            <span className={getWordClass(i)} key={`${word}-${i}`}>
              {word.split("").map((char, id) => (
                <span className={getCharClass(word, char, id)} key={id}>
                  {char}
                </span>
              ))}
              {i === wordIndex && input.length > word.length && (
                <span className="incorrect">{input.slice(word.length)}</span>
              )}
            </span>
          ))}
        </div>
        <div className="input-container">
          <input
            disabled={status === "finished"}
            placeholder={status === "running" ? "" : "click start and type here"}
            type="text"
            ref={textInput}
            onFocus={() => status === "idle" && start()}
            onKeyDown={handleKeyDown}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </section>

      <section className="actions">
        <button onClick={start}>{status === "finished" ? "try again" : "start"}</button>
        <button onClick={() => reset()}>reset</button>
      </section>

      <section className="results">
        <div>
          <span>wpm</span>
          <strong>{status === "finished" ? wpm : "-"}</strong>
        </div>
        <div>
          <span>acc</span>
          <strong>{status === "finished" ? `${accuracy}%` : "-"}</strong>
        </div>
        <div>
          <span>correct</span>
          <strong>{correct}</strong>
        </div>
        <div>
          <span>missed</span>
          <strong>{incorrect}</strong>
        </div>
      </section>
    </main>
  );
}

export default App;
