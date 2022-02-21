import { useEffect, useState } from "react";
import "./styles.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GameInfo from "./Components/GameInfo";
import { GameData } from "./Components/GameData";
import Main from "./Components/Main";

export default function App() {
  // States for gameInfo section
  const [showGameInfo, setShowGameInfo] = useState(true);
  const [userName, setUserName] = useState("");
  // States for game
  const [recordHolder, setRecordHolder] = useState(
    localStorage.getItem("recordHolder") || 0
  );
  const [savedRoll, setSavedRoll] = useState(
    () => Number(localStorage.getItem("rolled")) || 0
  );
  const [currentRoll, setCurrentRoll] = useState(0);
  const [totalRoll, setTotalRoll] = useState(savedRoll);
  const [gameData, setGameData] = useState(() => GameData);

  useEffect(() => {
    if (savedRoll === 0 || savedRoll > totalRoll) {
      localStorage.setItem("rolled", totalRoll);
      localStorage.setItem("recordHolder", userName);
    }

    setSavedRoll(Number(localStorage.getItem("rolled")));

    setRecordHolder(localStorage.getItem("recordHolder"));
  }, [totalRoll, savedRoll, userName]);

  const allNumStop = gameData.every((game) => game.stop === true);
  const allNumMatch = gameData.every((game) => game.num === gameData[0].num);

  const showInfo = () => setShowGameInfo((prevState) => !prevState);
  const getName = (event) => setUserName(event.target.value);

  // Game Section
  const rollGame = () => {
    setGameData((prevData) => {
      if (allNumStop) {
        return prevData.map((game) => ({
          ...game,
          stop: false,
          num: Math.floor(Math.random() * 9) + 1,
        }));
      } else {
        return prevData.map((game) => {
          if (game.stop) {
            return game;
          } else {
            return { ...game, num: Math.floor(Math.random() * 9) + 1 };
          }
        });
      }
    });
    if (allNumStop) {
      setCurrentRoll(0);
    } else {
      setCurrentRoll((prevState) => prevState + 1);
    }
  };

  const stopNum = (id) => {
    setGameData((prevData) => {
      return prevData.map((game) => {
        if (game.id === id) {
          return { ...game, stop: !game.stop };
        } else {
          return game;
        }
      });
    });
  };

  const submit = () => {
    console.log(savedRoll);
    if (allNumStop) {
      if (allNumMatch) {
        setTotalRoll(currentRoll);
        toast.success("Hurrah , you have Matched the dice", {
          theme: "colored",
        });

        if (savedRoll === 0 || currentRoll < savedRoll) {
          toast.success("Congratulation you have created new record", {
            theme: "dark",
          });
        } else {
          toast.error(
            "But,you couldn't break the record, Better luck next time",
            {
              theme: "dark",
            }
          );
        }
      } else {
        toast.error("Opps,dice is not mathched", { theme: "colored" });
      }
    }
  };

  const gameElement = gameData.map((game) => (
    <Main key={game.id} {...game} stopNumHandler={stopNum} />
  ));

  const infoGameElement = gameData.map((game) => (
    <Main key={game.id} {...game} />
  ));

  return (
    <>
      <div className="container">
        {showGameInfo ? (
          <div>
            <GameInfo
              showInfoHandler={showInfo}
              getName={getName}
              value={userName}
              gameElement={infoGameElement}
            />
          </div>
        ) : (
          <div className="containerMain">
            <div className="roll">
              <div className="recordText">
                {savedRoll !== 0 && (
                  <div>
                    Record Holder : <span> {recordHolder}</span>
                  </div>
                )}
              </div>
              <div className="recordRoll">
                {savedRoll !== 0 && (
                  <div>
                    Total Rolls : <span>{savedRoll}</span>
                  </div>
                )}
              </div>
              <div className="currentRoll">
                Your Rolls : <span>{currentRoll}</span>
              </div>
            </div>

            <div className="gameContainer">{gameElement}</div>
            <div className="btn">
              <button onClick={rollGame} className="gameBtn rollBtn">
                {allNumStop ? "Reset Game" : "Roll"}
              </button>
              <button className="gameBtn submitBtn" onClick={submit}>
                Submit
              </button>
            </div>

            <ToastContainer position="top-left" />
          </div>
        )}
      </div>
    </>
  );
}
