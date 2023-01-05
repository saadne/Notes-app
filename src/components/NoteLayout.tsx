import React from 'react'
import { Navigate, Outlet, useOutlet, useOutletContext, useParams } from 'react-router-dom'
import { Note } from './types/note'

type NoteLayoutProps = {
    notes: Note[]
}

function NoteLayout({notes}: NoteLayoutProps) {
    const {id} = useParams()
    const note = notes.find(n => n.id === id)

    if(note == null ) return <Navigate to="/" replace/>
  return <Outlet context={note}/>
}

export default NoteLayout

export function useNote(){
    return useOutletContext<Note>()
}