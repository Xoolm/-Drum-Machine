import React, { useEffect } from "react";
import "./App.css";

function App() {
  const play = (str) => {
    const display = document.getElementById("display");
    if (str === "q" || str === "Q") {
      display.innerHTML = "Heater 1";
    } else if (str === "w" || str === "W") {
      display.innerHTML = "Heater 2";
    } else if (str === "e" || str === "E") {
      display.innerHTML = "Heater 3";
    } else if (str === "a" || str === "A") {
      display.innerHTML = "Heater 4";
    } else if (str === "s" || str === "S") {
      display.innerHTML = "Clap";
    } else if (str === "d" || str === "D") {
      display.innerHTML = "Open-HH";
    } else if (str === "z" || str === "Z") {
      display.innerHTML = "Kick-n'-Hat";
    } else if (str === "x" || str === "X") {
      display.innerHTML = "Kick";
    } else if (str === "c" || str === "C") {
      display.innerHTML = "Closed-HH";
    }
    let audio = document.getElementById(str);
    audio.currentTime = 0;
    audio.play();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 81) {
        document.getElementById("display").innerText = "Heater 1";
        play("Q");
      } else if (e.keyCode === 87) {
        document.getElementById("display").innerText = "Heater 2";
        play("W");
      } else if (e.keyCode === 69) {
        document.getElementById("display").innerText = "Heater 3";
        play("E");
      } else if (e.keyCode === 65) {
        document.getElementById("display").innerText = "Heater 4";
        play("A");
      } else if (e.keyCode === 83) {
        document.getElementById("display").innerText = "Clap";
        play("S");
      } else if (e.keyCode === 68) {
        document.getElementById("display").innerText = "Open-HH";
        play("D");
      } else if (e.keyCode === 90) {
        document.getElementById("display").innerText = "Kick-n'-Hat";
        play("Z");
      } else if (e.keyCode === 88) {
        document.getElementById("display").innerText = "Kick";
        play("X");
      } else if (e.keyCode === 67) {
        document.getElementById("display").innerText = "Closed-HH";
        play("C");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <div id="drum-machine">
          <div className="displayWrap">
            <div id="display"></div>
          </div>
          <div id="pad_bank">
            <div
              onClick={() => play("Q")}
              tabIndex={0}
              className="drum-pad"
              id="Heater 1"
              autoFocus
            >
              Q
              <audio
                preload="none"
                id="Q"
                className="clip"
                src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
              ></audio>
            </div>
            <div
              onClick={() => play("W")}
              className="drum-pad"
              id="Heater 2"
              tabIndex={0}
              autoFocus
            >
              W
              <audio
                id="W"
                className="clip"
                src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
              ></audio>
            </div>
            <div
              onClick={() => play("E")}
              className="drum-pad"
              id="Heater 3"
              tabIndex={0}
              autoFocus
            >
              E
              <audio
                id="E"
                className="clip"
                src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
              ></audio>
            </div>
            <div
              onClick={() => play("A")}
              className="drum-pad"
              id="Heater 4"
              tabIndex={0}
              autoFocus
            >
              A
              <audio
                id="A"
                className="clip"
                src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
              ></audio>
            </div>
            <div
              onClick={() => play("S")}
              className="drum-pad"
              id="Clap"
              tabIndex={0}
              autoFocus
            >
              S
              <audio
                id="S"
                className="clip"
                src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
              ></audio>
            </div>
            <div
              onClick={() => play("D")}
              className="drum-pad"
              id="Open-HH"
              tabIndex={0}
              autoFocus
            >
              D
              <audio
                id="D"
                className="clip"
                src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
              ></audio>
            </div>
            <div
              onClick={() => play("Z")}
              className="drum-pad"
              id="Kick-n'-Hat"
              tabIndex={0}
              autoFocus
            >
              Z
              <audio
                id="Z"
                className="clip"
                src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
              ></audio>
            </div>
            <div
              onClick={() => play("X")}
              className="drum-pad"
              id="Kick"
              tabIndex={0}
              autoFocus
            >
              X
              <audio
                id="X"
                className="clip"
                src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
              ></audio>
            </div>
            <div
              onClick={() => play("C")}
              className="drum-pad"
              id="Closed-HH"
              tabIndex={0}
              autoFocus
            >
              C
              <audio
                id="C"
                className="clip"
                src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
              ></audio>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
