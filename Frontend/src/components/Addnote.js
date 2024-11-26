import React, { useContext, useState } from "react";
import NoteContext from "../context/note/NoteContext";
import Alert from "./Alert";

const Addnote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", discription: "", tag: "" });

  const addnotehandle = (e) => {
    e.preventDefault();
    addNote(note.title, note.discription, note.tag);
    setNote({ title: "", discription: "", tag: "" });
  };

  const handleonchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container border border border-3 rounded-4 py-4 px-md-5 px-3 col-md-7 col-11 my-4 addnote">
        <h2 className="mt-2">Add New Note </h2>

        <div className=" my-2" style={{ height: "50px" }}>
          <Alert />
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Note Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={handleonchange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="discription" className="form-label">
              Note Description
            </label>
            <input
              type="text"
              className="form-control"
              id="discription"
              name="discription"
              value={note.discription}
              onChange={handleonchange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Note #Tag
            </label>
            <input
              type="tex"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={handleonchange}
              minLength={2}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={addnotehandle}
            disabled={note.title.length < 5 || note.discription.length < 5}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default Addnote;
