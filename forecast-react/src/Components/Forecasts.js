import React from "react";
import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "./Forecasts.css";
import { StepsContext } from "../Contexts/StepsContext";

const Forecasts = () => {
  const { t } = useTranslation();
  const { setForecastId } = useContext(StepsContext);
  const [forecasts, setForecasts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/forecasts`);
      setForecasts(await response.json());
    }
    fetchData();
  }, []);

  const forecastClicked = (forecastId) => {
    setForecastId(forecastId);
    navigate('/question', {replace: true});
  };

  return (
    <div className="main-content list-of-forecasts">
      <ul>
        {forecasts.map((forecast) => (
          <li key={forecast.order}>
            <button href="#" onClick={() => forecastClicked(forecast.order)} className="forecast-button">
              {t(forecast.title)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forecasts;
