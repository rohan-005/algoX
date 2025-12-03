import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Questions.css";

export default function QuestionDetails() {
  const { id } = useParams();
  const [questionDetail, setQuestionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLang, setActiveLang] = useState("cpp");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadQuestion = async () => {
      setLoading(true);
      try {
        const syllabusRes = await fetch("/data/syllabus.json");
        const categories = await syllabusRes.json();

        let targetFile = null;
        for (const category of categories) {
          if (category.questions) {
            const hasQuestion = category.questions.some(
              (q) => q.id === parseInt(id)
            );
            if (hasQuestion) {
              targetFile = category.detail_file;
              break;
            }
          }
        }

        if (!targetFile) {
          setQuestionDetail(null);
          setLoading(false);
          return;
        }

        const fileRes = await fetch(`/data/${targetFile}`);
        const questionsData = await fileRes.json();

        const questionList = Array.isArray(questionsData)
          ? questionsData
          : questionsData.questions || [];

        const question = questionList.find(
          (q) => q.id === parseInt(id)
        );

        setQuestionDetail(question || null);

        // Reset scroll and states
        const contentContainer = document.querySelector(".algo-content");
        if (contentContainer) contentContainer.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: "smooth" });

        setActiveLang("cpp");
        setCopied(false);
      } catch (err) {
        console.error("Error loading question:", err);
        setQuestionDetail(null);
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [id]);

  const handleCopy = () => {
    const codeArr = questionDetail?.solution?.[activeLang];
    const code = codeArr?.join("\n");
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading)
    return <div className="loading-state">Initializing Neural Link...</div>;

  if (!questionDetail)
    return <div className="loading-state">Data Fragment Missing.</div>;

  const codeLines = questionDetail.solution?.[activeLang] || [
    "// Solution not available for this language.",
  ];

  return (
    <div className="detail-container">
      {/* HEADER */}
      <header className="problem-header anim-entry delay-0">
        <div className="meta-badges">
          {questionDetail.question_level && (
            <span className="badge level">
              {questionDetail.question_level}
            </span>
          )}
          {questionDetail.question_category && (
            <span className="badge category">
              {questionDetail.question_category}
            </span>
          )}
        </div>
        <h1 className="problem-title">
          {questionDetail.question_title}
        </h1>

        {questionDetail.question_tags && (
          <div className="tags-container">
            {questionDetail.question_tags.map((tag, idx) => (
              <span key={idx} className="tag-pill">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* DESCRIPTION */}
      <div className="problem-desc anim-entry delay-1">
        {questionDetail.question_description}
      </div>

      <hr className="algo-divider anim-entry delay-1" />

      {/* CORE CONCEPT */}
      {questionDetail.question_concept && (
        <section className="algo-section anim-entry delay-2">
          <h3>
            <span className="icon">🧠</span> Core Concept
          </h3>
          <ul className="theory-list">
            {questionDetail.question_concept.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* THEORY */}
      {questionDetail.question_theory && (
        <section className="algo-section anim-entry delay-2">
          <h3>
            <span className="icon">📖</span> Theory & Background
          </h3>
          <ul className="theory-list">
            {questionDetail.question_theory.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* LOGIC BREAKDOWN */}
      {questionDetail.question_explanation && (
        <section className="algo-section anim-entry delay-3">
          <h3>
            <span className="icon">⚙️</span> Logic Breakdown
          </h3>
          <ul className="theory-list">
            {questionDetail.question_explanation.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* DRY RUN */}
      {questionDetail.dry_run_explanation && (
        <section className="algo-section anim-entry delay-3">
          <h3>
            <span className="icon">🏃</span> Dry Run Visualization
          </h3>
          <div className="dry-run-box">
            {questionDetail.dry_run_explanation.map((line, idx) => (
              <div key={idx} className="dry-run-line">
                {line}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SOLUTION */}
      <section className="algo-section solution-wrapper anim-entry delay-4">
        <div className="code-header">
          <div className="lang-tabs">
            {["cpp", "python", "java"].map((lang) => (
              <button
                key={lang}
                className={`lang-btn ${
                  activeLang === lang ? "active" : ""
                }`}
                onClick={() => setActiveLang(lang)}
              >
                {lang === "cpp"
                  ? "C++"
                  : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
          <button
            className={`copy-btn ${copied ? "copied" : ""}`}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>

        <div className="code-block-wrapper">
          <pre>
            <code>
              <div className="code-lines">
                {codeLines.map((line, idx) => (
                  <React.Fragment key={idx}>
                    <span className="line-no">{idx + 1}</span>
                    <span className="line-code">{line}</span>
                  </React.Fragment>
                ))}
              </div>
            </code>
          </pre>
        </div>

        {questionDetail.solution_explanation && (
          <div className="complexity-box">
            <h4>Complexity & Solution Notes</h4>
            <ul>
              {questionDetail.solution_explanation.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* TEST CASES */}
      {(questionDetail.dummy_test_cases_explanation ||
        questionDetail.tests_industry_standard) && (
        <section className="algo-section anim-entry delay-5">
          <h3>
            <span className="icon">🧪</span> Test Cases
          </h3>

          <div className="test-grid">
            {questionDetail.dummy_test_cases_explanation?.map(
              (test, idx) => (
                <div key={`dummy-${idx}`} className="test-card">
                  <div className="test-header">
                    Example {idx + 1}
                  </div>
                  <div className="test-body">
                    <div className="io-group">
                      <label>Input:</label>
                      <code className="code-output">
                        {test.input}
                      </code>
                    </div>
                    <div className="io-group">
                      <label>Output:</label>
                      <code className="code-output">
                        {test.output}
                      </code>
                    </div>
                    <p className="test-expl">{test.explanation}</p>
                  </div>
                </div>
              )
            )}

            {questionDetail.tests_industry_standard?.map(
              (test, idx) => (
                <div
                  key={`ind-${idx}`}
                  className="test-card industry"
                >
                  <div className="test-header industry">
                    Industry Test {idx + 1}
                  </div>
                  <div className="test-body">
                    <div className="io-group">
                      <label>Input:</label>
                      <code className="code-output">
                        {test.input}
                      </code>
                    </div>
                    <div className="io-group">
                      <label>Expected:</label>
                      <code className="code-output">
                        {test.expected_output}
                      </code>
                    </div>
                    <p className="test-expl">{test.explanation}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
}
