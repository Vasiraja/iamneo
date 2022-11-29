import React, { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Note from "./components/Note";

export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    function callMe() {
      let fetchedNotes = localStorage.getItem("notes");
      if (fetchedNotes === null) {
        localStorage.setItem("notes", JSON.stringify(notes));
      } else {
        setNotes(JSON.parse(fetchedNotes));
      }
    }
    callMe();
  }, []);

  return (
    <section className="app">
      <Navbar />
      <Form setNotes={setNotes} notes={notes} />
      <div className="note-div">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            notes={notes}
            setNotes={setNotes}
          />
        ))}
      </div>
    </section>
  );
}
