import React from "react";
import Note from "./Note";
import "./NoteList.css";

const NoteList = (props) => {
  return (
    <ul className="note-list">
      {props.note.map((note) => (
        <Note
          key={note.id}
          title={note.title}
          date={note.date}
          text={note.text}
        />
      ))}
    </ul>
  );
};

export default NoteList;
