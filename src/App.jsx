import "./App.css";
import "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Popup } from "./Popup";
import errpage from "../notfound.png";
// import errorpage from "../public/notfound.jpg";
const Foodlist = ({
  values,
  showInfo,
  setShowInfo,
  itemId,
  clicked,
  setClicked,
}) => {
  const ingredient = (e) => {
    const showitems = e.target.parentElement;
    // console.log(itemId);
    setShowInfo(true);
    setClicked(values);
  };
  return (
    <>
      <div className="items">
        <img src={values.strMealThumb} alt={values.strMeal} />
        <div className="name">{values.strMeal}</div>
        <button onClick={ingredient}>How to Cook</button>
      </div>
    </>
  );
};
function App() {
  const [userNeed, setUserNeed] = useState("");
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [clicked, setClicked] = useState(null);
  // const [foodList,setFoodList]=useState("")

  const callAPI = async () => {
    try {
      setLoad(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${userNeed}`
      );
      const data = await res.json();
      const meals = data.meals || [];
      console.log(meals);
      if (meals == "") {
        setError(true);
      } else {
        setError(false);
      }
      setFoodItems(meals);
    } catch (e) {
      console.log(e);
    }
    setLoad(false);
  };
  const userIpt = (e) => {
    const val = e.target.value;
    if (val.trim() != "") {
      setUserNeed(val);
    }
  };

  useEffect(
    function () {
      callAPI();
    },
    [userNeed]
  );
  return (
    <>
      <div className="fullPrg">
        {showInfo && (
          <Popup
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            clicked={clicked}
            setClicked={setClicked}
          />
        )}
        <div className="top">
          <div className="title">food recipe</div>
          <div className="ipt">
            <input type="text" placeholder="Enter here.." onChange={userIpt} />
            <button>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        <div className="result">
          {/* <h1>Let's Get Cooking!</h1> */}
          {load && <div className="load">loading...</div>}
          {error && (
            <div className="errorclass">
              <img src={errpage} alt="Not Found" />
            </div>
          )}
          <div className="total">
            {foodItems.map((item) => (
              <Foodlist
                key={item.idMeal}
                values={item}
                itemId={item.idMeal}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
                clicked={clicked}
                setClicked={setClicked}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
