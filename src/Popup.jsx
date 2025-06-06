import React from "react";
import {
  faList,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Popup = ({ setShowInfo, clicked }) => {
  function closelist() {
    setShowInfo("");
  }
  return (
    <>
      <div className="outer-popup">
        <div className="popup">
          <div className="img">
            <img src={clicked.strMealThumb} />
            <div className="locate">
              <div className="type">
                <FontAwesomeIcon icon={faList} />
                <span>{clicked.strCategory}</span>
              </div>
              <div className="place">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{clicked.strArea}</span>
              </div>
            </div>
          </div>
          <div className="foodinfo">
            <div className="name">{clicked.strMeal}</div>
            <div className="para">
              <div className="headline">Instructions:</div>
              {clicked?.strInstructions
                ?.split("\r\n")
                .filter((line) => line.trim() !== "")
                .map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
            </div>
            <div className="ingredient">
              <div className="headline">Ingredient:</div>
              <ul>
                {[...Array(20)]?.map((items, i) => {
                  const count = clicked?.[`strIngredient${i + 1}`];
                  return count ? <li key={i}>{count}</li> : null;
                })}
              </ul>
            </div>
            <div className="measure">
              <div className="headline">Measure:</div>
              <ul>
                {[...Array(20)]?.map((mes, id) => {
                  const measure = clicked?.[`strMeasure${id + 1}`].trim();
                  return measure ? <li key={id}>{measure}</li> : null;
                })}
              </ul>
            </div>
            <div className="source">
              watch viedo: <a href={clicked.strYoutube}>click here</a>
            </div>
          </div>
          <button onClick={closelist}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </>
  );
};
