import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Questions.css";
export default function QuestionDetails() {
  const { id } = useParams();
  const [questionDetail, setQuestionDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestion = async () => {
      try {
  const syllabusRes = await fetch("/data/syllabus.json");
        const categories = await syllabusRes.json();

        let targetFile = null;
        for (const category of categories) {
          const hasQuestion = category.questions.some(
            (q) => q.id === parseInt(id)
          );
          if (hasQuestion) {
            targetFile = category.detail_file;
            break;
          }
        }

        if (!targetFile) {
          setLoading(false);
          return;
        }

        const fileRes = await fetch(`/data/${targetFile}`);
        const questionsData = await fileRes.json();

        // Some detail files are an array of questions (e.g. PatternQuestions.json)
        // while others may be wrapped as { questions: [...] }.
        const questionList = Array.isArray(questionsData)
          ? questionsData
          : questionsData.questions || [];

        const question = questionList.find((q) => q.id === parseInt(id));

        setQuestionDetail(question);

        // Smooth scroll to top (ChatGPT-style)
        window.scrollTo({ top: 0, behavior: "smooth" });

      } catch (err) {
        console.error("Error loading question:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [id]);

  if (loading) return <div className="loading-state">Loading...</div>;
  if (!questionDetail) return <div className="loading-state">Question Not Found!</div>;

  return (
    <div className="detail-container">
      <header className="problem-header">
        <h1 className="problem-title">{questionDetail.question_title}</h1>
      </header>

      <p className="problem-desc">{questionDetail.question_description}</p>

      <hr className="algo-divider" />

      {/* Theory */}
      <section className="algo-section">
        <h3>🔍 Analysis & Theory</h3>
        <ul className="theory-list">
          {questionDetail.question_theory?.map((p, idx) => (
            <li key={idx}>{p}</li>
          ))}
        </ul>
      </section>

      {/* Code */}
      <section className="algo-section">
        <h3>💡 Solution (C++)</h3>
        <div className="code-block-wrapper">
          <pre><code>{(questionDetail.solution?.cpp || []).join("\n")}</code></pre>
        </div>
      </section>
    </div>
  );
}
