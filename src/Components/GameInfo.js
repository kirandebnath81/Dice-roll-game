export default function GameInfo(props) {
  return (
    <>
      <div>
        <div className="introtext">
          <h1>Tenzies</h1>
          <h2> A Dice Game</h2>
          <p>
            Roll until all dice are the same. Click each die to freeze it all
            its current value between rolls .
          </p>
        </div>
        <div className="gameContainer">{props.gameElement}</div>
        <input
          type="text"
          name="userName"
          value={props.value}
          placeholder="Enter Name"
          onChange={props.getName}
          className="nameInput"
        />
        <button className="startBtn" onClick={props.showInfoHandler}>
          Start
        </button>
      </div>
    </>
  );
}
