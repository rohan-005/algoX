/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/Landingcss.css";
import StaggeredMenu from "../components/Navbar";
import { EncryptedText } from "../components/encrypted-text";

export default function Landing() {
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

  // --- CONTENT DATA ---
  const whyPoints = [
    {
      title: "Clear Explanations",
      desc: "Every concept broken down logically.",
    },
    { title: "Your Environment", desc: "Code in VS Code, CLion, or IntelliJ." },
    { title: "Multi-Language", desc: "Solutions in C++ | Java | Python | JS." },
    { title: "No Time Pressure", desc: "Learn at your own pace." },
    { title: "Real Mindset", desc: "Develop true problem-solving intuition." },
    {
      title: "Create Notes",
      desc: " Write your own learning summary for recall",
    },
  ];

  const masterTopics = [
    "Arrays & Strings",
    "Searching & Sorting",
    "Linked Lists",
    "Stacks & Queues",
    "Recursion",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "Backtracking",
    "Hashing & more…",
  ];

  const howSteps = [
    {
      num: "01",
      title: "Learn the Concept",
      desc: "Clear logic breakdown + visuals",
    },
    {
      num: "02",
      title: "Try Yourself First",
      desc: "Implement on your IDE — real coding feel",
    },
    {
      num: "03",
      title: "Compare Solutions",
      desc: "Best optimized approaches explained",
    },
    {
      num: "04",
      title: "Improve",
      desc: "Notes + reference + alternative methods",
    },
  ];

  return (
    <div className="page-wrapper">
      {/* INJECT CSS */}

      {/* Navbar Wrapper */}
      <div className="navbar-wrapper text-[1.5rem]">
        <StaggeredMenu items={menuItems} socialItems={socialItems} />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="hero-section" id="home">
        {/* Abstract Glow Background */}
        {/* <div className="glow-bg"></div> */}

        <div className="center-content">
          {/* LEFT: Hero Text */}
          <div className="hero-text-side">
            <h1 className="title">
              algo<span className="nerd-text">NERD</span>
              <span className="dot">...</span>
            </h1>

            <h2 className="tagline">
              <span className="code-bracket">&lt;</span>
              <EncryptedText
                text="Code Like a Nerd"
                // encryptedClassName="text-neutral-500"
                // revealedClassName="dark:text-white text-black"
                revealDelayMs={80}
              />

              <span className="code-bracket">/&gt;</span>
            </h2>

            <p className="subtitle">
              Build real problem-solving skills using your own IDE.
              <br />
              <p className="font-bold text-amber-300">
                Stop memorizing. Start engineering.
              </p>
            </p>

            <div className="btn-box">
              <button className="btn primary-btn">Start Learning</button>
              <button className="btn secondary-btn">Curriculum</button>
            </div>
          </div>

          {/* RIGHT: Curriculum Panel */}
          <div className="hero-visual-side">
            <div className="curriculum-card">
              <div className="curr-header">
                <h3 className="curr-title">What You'll Master</h3>
                <span className="curr-badge">70+ Problems</span>
              </div>
              <div className="hero-topics-grid">
                {masterTopics.map((topic, i) => (
                  <span className="hero-topic-pill" key={i}>
                    <span className="hash">#</span>
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <a href="#why" className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </a>
      </section>

      {/* --- WHY ALGONERD --- */}
      <section className="section-container" id="why">
        <div className="section-header">
          <span className="section-tag">💡 Why AlgoNerd?</span>
          <h2 className="section-title">
            We don’t want you to learn.
            <br />
            We want you to <span className="highlight">understand.</span>
          </h2>
          <p className="section-sub">No spoon-feeding. Just pure logic.</p>
        </div>

        <div className="grid-cards">
          {whyPoints.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="card-border"></div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="section-container" id="how-it-works">
        <span className="section-tag center-tag">⭐ Workflow</span>
        <h2 className="section-title center-text">How it Works</h2>

        <div className="steps-container">
          {howSteps.map((step, i) => (
            <div className="step-card" key={i}>
              <div className="step-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- INDUSTRY PREP --- */}
      <section className="section-container prep-section">
        <div className="prep-box">
          <h2>🧑‍💻 Built For Industry</h2>
          <p className="prep-intro">
            Tech companies don't ask you to code in browser IDEs. Why prepare
            that way?
          </p>

          <div className="checklist-container">
            <div className="check-item">
              <span className="check-icon">✓</span>
              <span>Debugging Skills</span>
            </div>
            <div className="check-item">
              <span className="check-icon">✓</span>
              <span>Memory Management</span>
            </div>
            <div className="check-item">
              <span className="check-icon">✓</span>
              <span>Real Setup</span>
            </div>
          </div>

          <div className="student-goals">
            <h4>For Students Who Want To...</h4>
            <div className="goals-grid">
              <span>Understand &gt; Memorize</span>
              <span>Build Intuition</span>
              <span>Crack Interviews</span>
              <span>Code Confidently</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER / MOTTO --- */}
      <footer className="footer-section">
        <div className="footer-content">
          <p className="motto">“Think logically. Code practically.”</p>
          <p className="copyright">© 2025 AlgoNerd.</p>
        </div>
      </footer>
    </div>
  );
}
