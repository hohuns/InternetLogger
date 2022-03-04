import React, { useRef } from "react";

import "./AddNote.css";

function AddNote(props) {
  const titleRef = useRef("");
  const textRef = useRef("");
  const dateRef = useRef("");
  const now = new Date();

  function submitHandler(event) {
    event.preventDefault();

    const notes = {
      title: titleRef.current.value,
      text: textRef.current.value,
      date: now.toLocaleString(),
    };

    props.AddNote(notes);
    titleRef.current.value = "";
    textRef.current.value = "";
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          ref={titleRef}
          style={{ color: "white" }}
          placeholder="Log the title here..!"
        />
      </div>
      <div className="control">
        <label htmlFor="text-log">Text Log</label>
        <textarea
          rows="5"
          id="text-log"
          ref={textRef}
          style={{ color: "white" }}
          placeholder="Log the things that you wanna say.."
        ></textarea>
      </div>
      <button>Submit</button>
    </form>
  );
}

export default AddNote;
