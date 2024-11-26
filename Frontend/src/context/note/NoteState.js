import NoteContext from "./NoteContext";
import AlertContext from "../alert/AlertContext";
import { useState, useContext } from "react";
import * as GlobalUrls from "../../GlobalURL"


const NoteState = (props) => {
  let initialnotes = [];

  //alert using AlertContext
  const Context = useContext(AlertContext);
  const { showAlert } = Context;

  // Get All notes using api request =================================================================================
  const getNotes = async () => {
    //API CALL
    try {
      const responce = await fetch(GlobalUrls.GETALLNOTES_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await responce.json();
      setNote(json);
      //if accured error
    } catch (err) {
      console.log(err);
    }
  };

  //Add note() using this function =================================================================================
  const addNote = async (title, discription, tag) => {
    //API CALL
    try {
      const responce = await fetch(GlobalUrls.ADDNOTE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, discription, tag }),
      });
      //Add note on db
      const json = await responce.json();
      console.log(json);
      setNote(notes.concat(json));
      showAlert("Note Created SuccesFully", "success");
      //if accured error
    } catch (err) {
      console.log(err);
    }
  };

  //Update note() using this function =============================================================================
  const editNote = async (id, title, discription, tag) => {
    //API CALL
    try {
      const responce = await fetch(`${GlobalUrls.UPDATENOTE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, discription, tag }),
      });
      //Update note on db
      const json = await responce.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          element.title = title;
          element.discription = discription;
          element.tag = tag;
        }
      }

      setNote(newNotes);
      showAlert("Note Updated SuccesFully", "warning");
      //if accured error
    } catch (err) {
      console.log(err);
    }
  };

  //Delete note() using this function =============================================================================
  const deleteNote = async (id) => {
    try {
      //API CALL
      const responce = await fetch(`${GlobalUrls.DELETENOTE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await responce.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
    //Delete note fron db
    const newNotes = notes.filter((note) => note._id !== id);
    setNote(newNotes);
    showAlert("Note Deleted", "danger");
  };

  const [notes, setNote] = useState(initialnotes);

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
