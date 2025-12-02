import React, { useState, useEffect } from "react";
import StaggeredMenu from "../components/Navbar";
import "../css/Syllabus.css";
import "../css/Landingcss.css";
import { useNavigate } from "react-router-dom";

export default function Syllabus() {
  const navigate = useNavigate();

  const syllabusData = [
    {
      category: "Pattern Questions",
      points: [
        { id: 101, q: "Right Triangle Star Pattern" },
        { id: 102, q: "Number Pyramid" },
        { id: 103, q: "Diamond Shape Pattern" },
        { id: 104, q: "Hollow Rectangle" },
        { id: 105, q: "Butterfly Pattern" },
      ],
    },
    {
      category: "Arrays",
      points: [
        { id: 201, q: "Max & Min in Array" },
        { id: 202, q: "Reverse Array" },
        { id: 203, q: "Move Zeros to End" },
        { id: 204, q: "Kadane’s Algorithm" },
        { id: 205, q: "Two-Sum Concept" },
      ],
    },
    {
      category: "Strings",
      points: [
        { id: 301, q: "Palindrome Check" },
        { id: 302, q: "Count Frequency of Characters" },
        { id: 303, q: "Anagram Check" },
        { id: 304, q: "Pattern Matching Basics" },
        { id: 305, q: "String Compression" },
      ],
    },
    {
      category: "Searching & Sorting",
      points: [
        { id: 401, q: "Binary Search" },
        { id: 402, q: "Bubble Sort" },
        { id: 403, q: "Merge Sort" },
        { id: 404, q: "Quick Sort" },
        { id: 405, q: "Sort Colors (DNF)" },
      ],
    },
    {
      category: "Linked List",
      points: [
        { id: 501, q: "Insert & Delete" },
        { id: 502, q: "Reverse Linked List" },
        { id: 503, q: "Detect Loop – Floyd’s Algo" },
        { id: 504, q: "Middle of Linked List" },
      ],
    },
    {
      category: "Dynamic Programming",
      points: [
        { id: 601, q: "Fibonacci (Memo + Tabulation)" },
        { id: 602, q: "Knapsack 0/1" },
        { id: 603, q: "Longest Common Subsequence" },
        { id: 604, q: "Coin Change" },
      ],
    },
  ];

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Why", link: "#why" },
    { label: "Curriculum", link: "/curriculum" },
    { label: "How it Works", link: "#how-it-works" },
  ];

  const socialItems = [
    { label: "X", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("completedQuestions");
    if (savedData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompleted(JSON.parse(savedData));
    }
  }, []);

  const toggleCompletion = (id) => {
    const updated = { ...completed, [id]: !completed[id] };
    setCompleted(updated);
    localStorage.setItem("completedQuestions", JSON.stringify(updated));
  };

  const handleClick = (id) => {
    navigate(`/question/${id}`);
  };

  const clearAll = () => {
    setCompleted({});
    localStorage.removeItem("completedQuestions");
  };

  return (
    <div className="syllabus-wrapper">
      <div className="navbar-wrapper text-[1.5rem]">
        <StaggeredMenu items={menuItems} socialItems={socialItems} />
      </div>

      {/* HERO */}
      <section className="syllabus-hero">
        <h1 className="syllabus-title">
          Master <span className="highlight">DSA</span> From Basics 
        </h1>
        <p className="syllabus-sub">
          From Patterns → DP, build real coding confidence step-by-step.
        </p>

        {/* Clear Progress Button */}
        <button className="clear-btn" onClick={clearAll}>
          Clear All Progress ❌
        </button>
      </section>

      {/* CONTENT GRID */}
      <section className="syllabus-content">
        {syllabusData.map((block, idx) => (
          <div className="syllabus-card" key={idx}>
            <h2 className="syllabus-card-title">{block.category}</h2>

            <ul className="point-list">
              {block.points.map((item, i) => (
                <li key={i} className="point-item">
                  <div className="problem-link">
                    {/* Checkbox only manages completion */}
                    <input
                      type="checkbox"
                      checked={!!completed[item.id]}
                      onChange={() => toggleCompletion(item.id)}
                      className="checkbox-style"
                    />

                    {/* Clickable question text to open */}
                    <span
                      onClick={() => handleClick(item.id)}
                      className="question-text"
                    >
                      ➤ {item.q}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
