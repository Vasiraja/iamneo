import React, { useRef } from "react";
import note from "../styles/note.module.css";
import { FiEdit2, FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

export default function Note({ id, title, content, notes, setNotes }) {
  const titleRef = useRef();
  const contentRef = useRef();

  function editNote(e, id) {
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "block";
    titleRef.current.setAttribute("contentEditable", true);
    titleRef.current.classList.add("editable");
    contentRef.current.setAttribute("contentEditable", true);
    contentRef.current.classList.add("editable");
  }

  function handleLocalStorage(updatedNotes) {
    localStorage.removeItem("notes");
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }

  function updateNote(e, id) {
    e.target.style.display = "none";
    e.target.previousElementSibling.style.display = "block";
    titleRef.current.removeAttribute("contentEditable");
    titleRef.current.classList.remove("editable");
    contentRef.current.removeAttribute("contentEditable");
    contentRef.current.classList.remove("editable");

    let updatedNotes = [...notes];

    updatedNotes.forEach((note) => {
      if (note.id === id) {
        note.title = titleRef.current.textContent;
        note.content = contentRef.current.textContent;
      }
    });
    setNotes(updatedNotes);
    handleLocalStorage(updatedNotes);
  }

  function deleteNote(id) {
    const updatedNotes = [...notes].filter((note) => note.id !== id);
    setNotes(updatedNotes);
    handleLocalStorage(updatedNotes);
  }
  return (
    <div className={note.note}>
      <h3 ref={titleRef}>{title}</h3>
      <p ref={contentRef}>{content}</p>

      <div className={`edit ${note.buttonWrap}`}>
        <button className={note.edit} onClick={(e) => editNote(e, id)}>
          <FiEdit2 />
        </button>
        <button className={note.update} onClick={(e) => updateNote(e, id)}>
          <FiEdit3 />
        </button>
        <button className={note.delete} onClick={() => deleteNote(id)}>
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
}
