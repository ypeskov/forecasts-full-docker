import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "./Answer.css";
import { StepsContext } from "../Contexts/StepsContext";

const Answer = () => {
  const { t } = useTranslation();
  const { question, forecastId } = useContext(StepsContext);
  const [answer, setAnswer] = useState([]);
  const [forecast, setForecast] = useState("");

  useEffect(() => {
    async function getAnswer() {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/forecasts/question`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
            forecast_id: forecastId,
          }),
        }
      );
      const data = await response.json();
      setAnswer(data);
    }
    getAnswer();
  }, [forecastId, question]);

  useEffect(() => {
    if (answer.length > 0) {
      const jsx = answer.map((answerItem) => {
        return (
          <section key={answerItem.title} className="forecast-item">
            <div className="forecast-rune-info">
              <div>
                <span className="forecast-rune-title">{t("Rune")}:</span>{" "}
                {answerItem.title}
              </div>
              <div>
                <span className="forecast-rune-position">{t("Position")}:</span>{" "}
                {t(answerItem.position)}
              </div>
            </div>

            <div className="forecast-info">
              <div className="forecast-subheading">{t("Rune Description")}</div>
              <div
                dangerouslySetInnerHTML={{ __html: answerItem.description }}
              ></div>

              <div className="forecast-subheading">{t("Answer of Runes")}</div>
              <div
                dangerouslySetInnerHTML={{ __html: answerItem.forecast }}
              ></div>
            </div>
          </section>
        );
      });
      setForecast(jsx);
    }
  }, [answer, t]);

  return (
    <div className="main-content">
      <div>{forecast}</div>
    </div>
  );
};

export default Answer;
