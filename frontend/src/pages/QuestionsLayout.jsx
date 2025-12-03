import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../css/Questions.css";
import StaggeredMenu from "../components/Navbar";

export default function QuestionsLayout() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionList, setQuestionList] = useState([]);

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Curriculum", link: "/curriculum" },
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  // Load categories on mount (and allow re-run if selectedCategory changes)
  useEffect(() => {
    fetch("/data/syllabus.json")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (!selectedCategory && Array.isArray(data) && data.length > 0) {
          setSelectedCategory(data[0]);
        }
      })
      .catch((err) => console.error("Error loading syllabus:", err));
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedCategory) return;
    fetch(`/data/${selectedCategory.detail_file}`)
      .then((res) => res.json())
      .then((data) => {
        // detail files may either be an array of questions or an object with `questions` key
        const list = Array.isArray(data) ? data : data.questions || [];
        setQuestionList(list);
      })
      .catch((err) => {
        console.error("Error loading questions for category:", err);
        setQuestionList([]);
      });
  }, [selectedCategory]);

  return (
    <div className="algo-layout">
      <aside className="algo-sidebar">
        <div className="sidebar-header">
          <h2 className="brand-title">
            AlgoNerd <span className="text-accent">DSA</span>
          </h2>
          <div className="mini-nav">
            <StaggeredMenu items={menuItems} socialItems={socialItems} />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-scroll">
          <div className="category-track">
            {categories.map((cat) => (
              <button
                key={cat.category_id}
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill ${
                  selectedCategory?.category_id === cat.category_id ? "active" : ""
                }`}
              >
                {cat.category_name}
              </button>
            ))}
          </div>
        </div>

        {/* Question Links */}
        <div className="questions-nav-list">
          <h3 className="section-label">Available Problems</h3>
          <ul>
            {questionList.map((q) => (
              <li key={q.id}>
                <NavLink
                  to={`/question/${q.id}`}
                  className={({ isActive }) => (isActive ? "q-link active" : "q-link")}
                >
                  {/* <span className="q-id">#{q.id}</span> */}
                  <span className="q-title">{q.title || q.question_title || "Untitled"}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Content */}
      <main className="algo-content">
        <Outlet />
      </main>
    </div>
  );
}
