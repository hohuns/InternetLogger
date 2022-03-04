import React, { useState, useEffect, useCallback } from "react";

import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import "./App.css";
import Login from "./components/Login";
function App() {
  const [note, setNote] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState(null);
  const correctPw = "0623";

  //Fetching Data from API
  const fetchNoteHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-2887f-default-rtdb.firebaseio.com/notetest.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedNotes = [];
      for (const key in data) {
        loadedNotes.push({
          id: key,
          title: data[key].title,
          text: data[key].text,
          date: `You logged at ${data[key].date}...`,
        });
      }
      loadedNotes.reverse();
      console.log(loadedNotes);
      setNote(loadedNotes);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNoteHandler();
  }, [fetchNoteHandler]);

  const pwHandler = (pw) => {
    if (pw === correctPw) {
      setIsCorrect(true);
    } else {
      alert("Invalid passcode.");
    }
    console.log(pw);
  };

  //Adding logger
  async function addNoteHandler(note) {
    const response = await fetch(
      "https://react-http-2887f-default-rtdb.firebaseio.com/notetest.json",
      {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "appication/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    fetchNoteHandler();
  }

  let content = <p style={{ color: "white" }}>Found no Notes.</p>;
  if (note.length > 0) {
    content = <NoteList note={note} />;
  }

  if (error) {
    content = <p style={{ color: "white" }}>{error}</p>;
  }

  if (isLoading) {
    content = <p style={{ color: "white" }}>Loading...</p>;
  }

  return (
    <React.Fragment>
      {!isCorrect ? (
        <Login pw={pwHandler}></Login>
      ) : (
        <div>
          {" "}
          <section>
            <h2 style={{ color: "white" }}>Log Format</h2>
            <AddNote AddNote={addNoteHandler}></AddNote>
          </section>
          <section>
            <button onClick={fetchNoteHandler}>Update Notes</button>
          </section>
          <section>
            <h2 style={{ color: "white" }}>Log</h2>
            {content}
          </section>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
