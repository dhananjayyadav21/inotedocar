import React, { useContext, useRef } from "react";
import NoteContext from "../context/note/NoteContext";

const Noteiteam = (props) => {
  const context = useContext(NoteContext);

  const { deleteNote } = context;

  const { note, noteUpdate } = props;

  //handle delete coinfirmation
  const ref = useRef(null);
  const refClose = useRef(null);

  const handleDeletenote = () => {
    ref.current.click();
  };

  const handleyesDelete = () => {
    deleteNote(note._id);
    refClose.current.click();
  };

  return (
    <>
      <div
        className="modal fade "
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="deleteNote deleteacount modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Delete Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">You will lose your note</div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={handleyesDelete}
                type="button"
                className="btn btn-danger"
              >
                Yes Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <a ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        href="#exampleModalToggle"
        role="button"
      >
        Open first modal
      </a>

      <div className="card my-2">
        <div className="card-body">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="fa-solid fa-delete-left mx-2"
                onClick={handleDeletenote}
              ></i>
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => {
                  noteUpdate(note);
                }}
              ></i>
            </div>
          </div>
          <h6 className="card-text">{note.discription}</h6>
          <p className=" fw-bold">#{note.tag}</p>
          <h6 className="card-text">{note.Date}</h6>
        </div>
      </div>
    </>
  );
};

export default Noteiteam;
