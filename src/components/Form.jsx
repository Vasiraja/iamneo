import React, { useState, useRef } from "react";

import form from "../styles/form.module.css";

 
export default function Form({ notes, setNotes }) {
  const titleRef = useRef();
  const contentRef = useRef();
  const buttontRef = useRef();

  const [values, setValues] = useState({
    title: "",
    content: "",
  });
  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function addNote() {
    if (values.content === "" && values.title === "") return;
    const randomId = Math.floor(Math.random() * 100000000000000);
    const updatedNotes = [...notes, { ...values, id: randomId }];
    setNotes(updatedNotes);
    setValues({ title: "", content: "" });
    titleRef.current.value = "";
    contentRef.current.value = "";
    localStorage.removeItem("notes");
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    titleRef.current.parentNode.style.display = "none";
    buttontRef.current.style.display = "none";
  }
  function handleAnimate(e) {
    titleRef.current.parentNode.style.display = "block";
    e.target.parentNode.nextElementSibling.style.display = "block";
  }
  return (
    <section className={form.form}>
      <div style={{ display: "none" }} className={form.inputDiv}>
        <input
          ref={titleRef}
          type="text"
          defaultValue={values.title}
          name="title"
          className={form.input}
          onChange={(e) => handleInputChange(e)}
          placeholder=" "
        />
        <label>Title</label>
      </div>

      <div className={`${form.inputDiv} ${form.textAreaDiv}`}>
        <textarea
          onClick={(e) => handleAnimate(e)}
          ref={contentRef}
          className={form.input}
          name="content"
          defaultValue={values.content}
          onChange={(e) => handleInputChange(e)}
          placeholder=" "
        ></textarea>
        <label>Content</label>
      </div>

      <button
        ref={buttontRef}
        style={{ display: "none" }}
        className={form.button}
        onClick={addNote}
      >
         Create Note
      </button>
    </section>
  );
}
