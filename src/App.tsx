import { Navigate, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from "react-bootstrap";
import NewNote from "./components/NewNote";
import {NoteData, RawNote,RawNoteData,Tag} from './components/types/note'
import {useLocalStorage} from './components/useLocalStorage'
import { useMemo } from "react";
import './App.css'
import {v4 as uuidV4} from 'uuid'
import NoteList from "./components/NoteList";
import NoteLayout from "./components/NoteLayout";
import Note from "./components/Note";
import EditNote from "./components/EditNote";

function App() {

  const [notes,setNotes] = useLocalStorage<RawNote[]>("NOTES",[])
  const [tags,setTags] = useLocalStorage<Tag[]>("Tags",[])

  const noteWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note , tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  },[notes,tags])
  function onCreateNote({tags,...data}: NoteData){
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        {...data, id:uuidV4(),tagIds:tags.map(tag => tag.id)}
      ]
    })
  }
  function addTag(tag:Tag){
    setTags(prev => [...prev, tag])
  }

  function updateNote (id:string, {tags,...data}: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
      if(note.id  === id){
          return {...note, ...data, tagIds: tags.map(tag => tag.id)}
      }else{
        return note
      }
    
    })})

  }
  function deleteNote(id:string){
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function updateTag(id: string,label:string){
    setTags(prevTags => {
      return prevTags.map(tag => {
        if(tag.id === id){
          return {...tag, label}
        }else{
          return tag
        }
      })
    })
  }
  function deleteTag(id:string){
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }
  return (
    <div className="App">
      <Container className="my-4">
      <Routes>
      <Route path="/" element={<NoteList updateTag={updateTag} deleteTag={deleteTag} notes={noteWithTags} availbleTags={tags}  />} />
      <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availbleTags={tags}/>} />
      <Route path="/:id" element={<NoteLayout notes={noteWithTags}/>} >
        <Route index element={<Note onDelete ={deleteNote}/>} />
        <Route path="edit" element={<EditNote onSubmit={updateNote} onAddTag={addTag} availbleTags={tags} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </Container>
    </div>
  );
}

export default App;


