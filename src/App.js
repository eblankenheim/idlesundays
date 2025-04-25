import "./App.css";
import poster001 from "./media/images/poster001.png";

function App() {
  return (
    <div className="App">
      <div>
        <img
          src={poster001}
          style={{ width: "100%", border: "none" }}
          alt="poster for Idle Sundays"
        ></img>
      </div>
    </div>
  );
}

export default App;
