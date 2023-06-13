import React, { useState, useEffect } from "react";
import "./style/App.css";
const audioBank = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {
  const [volume, setVolume] = useState(0);
  const [power, setPower] = useState(false);
  const [recording, setRecording] = useState("");
  const [speed, setSpeed] = useState(0.5);
  const [display, setDisplay] = useState("");

  function ChangeVolume(e) {
    let target = e.target;
    if (e.target.type !== "range") {
      target = document.getElementById("range");
    }
    const min = target.min;
    const max = target.max;
    const val = target.value;
    target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
    setVolume(e.target.value);
  }

  function ChangeSpeed(e) {
    let target = e.target;
    if (e.target.type !== "range") {
      target = document.getElementById("range");
    }
    const min = target.min;
    const max = target.max;
    const val = target.value;
    target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
    setSpeed(e.target.value);
  }

  let interval;
  let isPlaying = false;

  const playRecording = () => {
    if (isPlaying) {
      return;
    }
    isPlaying = true;
    let index = 0;
    let recordArr = recording.split(" ");
    interval = setInterval(() => {
      const audioTag = document.getElementById(recordArr[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
      if (index >= recordArr.length) {
        clearInterval(interval);
        isPlaying = false;
      }
    }, speed * 600);
    setTimeout(
      () => clearInterval(interval),
      600 * speed * recordArr.length - 1
    );
  };

  const clearRecording = () => {
    clearInterval(interval);
    setRecording("");
  };

  const powerOnOff = ["inner"];
  if (power) {
    powerOnOff.push("On");
  } else if (!power) {
    powerOnOff.push("Off");
  }

  const Inclusion = () => {
    if (power === false) {
      setPower(!power);
      setVolume(0.5);
      setRecording("");
      setDisplay("");
    } else {
      setPower(!power);
      setVolume(0);
      setRecording("");
      setDisplay("");
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div id="drum-machine">
          <div className="power">
            <p id="powerTxt">Power</p>
            <div id="selectPwr">
              <div
                onClick={() => Inclusion()}
                className={powerOnOff.join(" ")}
              />
            </div>
          </div>
          <div className="wrapperDisplay">
            <div className="displayWrap">
              {power && (
                <>
                  <div maxLength="10" id="display">
                    {display}
                  </div>
                  <h2 className="volumeTitle">Volume</h2>
                  <input
                    id="range"
                    min="0"
                    max="1"
                    onChange={ChangeVolume}
                    step="0.01"
                    value={volume}
                    type="range"
                  />
                </>
              )}
            </div>
            <div className="recordWrap">
              {power && (
                <>
                  <div id="recording">{recording}</div>
                  {recording && (
                    <>
                      <h2 className="recordTitle">Playback Speed</h2>
                      <input
                        id="range"
                        min="0.01"
                        max="1.2"
                        onChange={ChangeSpeed}
                        step="0.01"
                        value={speed}
                        type="range"
                      />
                      <div className="btnRecBank">
                        <button onClick={playRecording} id="play">
                          play
                        </button>
                        <button onClick={clearRecording} id="clear">
                          clear
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div id="pad_bank">
            {audioBank.map((clip) => (
              <Pad
                key={clip.id}
                clip={clip}
                volume={volume}
                setRecording={setRecording}
                setDisplay={setDisplay}
                name={audioBank.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Pad({ clip, volume, setRecording, setDisplay, over }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setActive(true);
    setTimeout(() => setActive(false), 200);
    setRecording((prev) => prev + clip.keyTrigger + " ");
    setDisplay(clip.id);
  };

  return (
    <div className={`drum-pad ${active && "drumActive"}`} onClick={playSound}>
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
}

export default App;
