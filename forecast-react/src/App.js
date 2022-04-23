import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, Navigate } from "react-router-dom";

import "./i18n";
import "./App.css";
import Forecasts from "./Components/Forecasts";
import Question from "./Components/Question";
import Answer from "./Components/Answer";
import Container from "./Components/Container";

import { StepsContext } from "./Contexts/StepsContext";

function App() {
  const { t } = useTranslation();

  const [question, setQuestion] = useState("");
  const [forecastId, setForecastId] = useState(null);

  return (
    <>
      <header>
        <h1>
          <a href="/">{t("Runes Answers")}</a>
        </h1>
      </header>
      <div className="App">
        <StepsContext.Provider
          value={{
            question,
            setQuestion,
            forecastId,
            setForecastId,
          }}
        >
          <Container>
            <Routes>
              <Route path="/" element={<Navigate to="/forecasts" />}></Route>
              <Route path="/forecasts" element={<Forecasts />} />
              <Route path="/question" element={<Question />} />
              <Route path="/answer" element={<Answer />} />
            </Routes>
          </Container>
        </StepsContext.Provider>
      </div>
    </>
  );
}

export default App;
