

export default function Main(props) {
  const styles = {
    backgroundColor: props.stop ? "black" : "",
    fontSize: props.stop ? "1.7rem" : "",
  };
  return (
    <>
      <div
        className="game"
        onClick={() => props.stopNumHandler(props.id)}
        style={styles}
      >
        {props.num}
      </div>
    </>
  );
}
