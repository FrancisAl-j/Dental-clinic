import React, { useEffect, useState } from "react";
import "./note.css";
import axios from "axios";
import { toast } from "react-toastify";

const Note = ({ setNote, id, name, dataNotes }) => {
  const [notes, setNotes] = useState([]);
  const [inputNotes, setInputeNotes] = useState("");

  const insertNote = (e) => {
    e.preventDefault();
    if (inputNotes.trim()) {
      setNotes([...notes, inputNotes.trim()]);
      setInputeNotes("");
    }
  };

  const handleRemoveNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // If the patient already had notes fetch it

  useEffect(() => {
    if (dataNotes.length !== 0) {
      fetchExistingNotes();
    }
  }, []);

  const fetchExistingNotes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chart/get/notes/${id}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        setNotes(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotes = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/chart/create/notes/${id}`,
        { notes },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success("Notes save.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="note-container">
      <form onSubmit={handleNotes}>
        <header>
          <h1>Create Notes Summary</h1>
          <h3 onClick={() => setNote(false)}>X</h3>
        </header>

        <section className="form-contents">
          <div className="notes-container">
            <span>Notes</span>
            <textarea
              name=""
              id=""
              value={inputNotes}
              onChange={(e) => setInputeNotes(e.target.value)}
            ></textarea>
            <button onClick={insertNote}>Add Notes</button>
            <hr />
            <h1>Name: {name}</h1>
          </div>
          <div className="notes-contents">
            <ul>
              {notes &&
                notes.map((note, index) => {
                  return (
                    <li key={index}>
                      <h1>{note}</h1>{" "}
                      <h4 onClick={() => handleRemoveNote(index)}>X</h4>
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>

        <button>Save Notes</button>
      </form>
    </div>
  );
};

export default Note;
