import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "./Question.css";
import { StepsContext } from "../Contexts/StepsContext";

const Question = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setQuestion } = useContext(StepsContext);
  const inputEl = useRef();

  const submitQuestion = (event) => {
    event.preventDefault();
    setQuestion(inputEl.current.value);
    navigate("/answer", { replace: true });
  };

  return (
    <div className="main-content">
      <form>
        <div className="question-title">{t("Ask your question")}</div>
        <div className="question-input">
          <p>
            <input id="question" ref={inputEl} />
          </p>
          <p className="button-container">
            <button type="submit" onClick={submitQuestion} className="question-button">
              {t('Ask Runes')}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Question;
