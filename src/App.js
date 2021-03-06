import React, {useState} from "react";
import {nanoid} from 'nanoid';
import Split from "react-split";
import Data from './data';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';


function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || "");

  function createNewNote(){
    const newNote = {
      id : nanoid(),
      body: "#Type you Markdown Text Here"
    }

    setNotes(prevNotes =>[newNote,...prevNotes]);
    setCurrentNoteId(newNote.id);

  }

  function updateNote(text) {
    setNotes(oldNotes => oldNotes.map(oldNote => {
        return oldNote.id === currentNoteId
            ? { ...oldNote, body: text }
            : oldNote
    }))
}

  function findCurrentNote(){
    return notes.find(note=>{
      return note.id === currentNoteId
    }) || notes[0]
  }



  return (
    <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
  );
}

export default App;
