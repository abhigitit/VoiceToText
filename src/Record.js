import React, { useState, useEffect } from "react";
import "./Record.css";
import { db } from "./Firebase/firebase-config";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { ButtonGroup } from "@material-ui/core";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [finalNote, setFinalNote] = useState([]);
  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
   setFinalNote([...savedNotes, note]);
    setNote("");
    console.log("savedData 1", finalNote);
    
  };

  const onSubmit = () => {
    console.log("savedData 2", finalNote);
 db.collection("VoiceNotes").add({ note: finalNote });
setFinalNote([]);
  }

  return (
    <>
      <h1>Voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current Note</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <ButtonGroup variant="contained" color="primary">
            <Button onClick={() => setIsListening((prevState) => !prevState)}>
              Start/Stop
            </Button>
            <Button
              startIcon={<SaveIcon />}
              onClick={handleSaveNote}
              disabled={!note}
            >
              Save Note
            </Button>
          </ButtonGroup>

          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map((n) => (
            <p key={n}>{n}</p>
          ))}
          <Button onClick={onSubmit}>Send</Button>
        </div>
      </div>
    </>
  );
}

export default App;
