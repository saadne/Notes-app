import React from 'react'
import FormNote from './FormNote'
import Note from './Note'
import { useNote } from './NoteLayout'
import { NoteData, Tag } from './types/note'

type  EditNoteProps  = {
    onSubmit: (id:string,data:NoteData) => void
    onAddTag: (e:Tag) => void
    availbleTags: Tag[]
}

function EditNote({onSubmit,onAddTag,availbleTags }: EditNoteProps ) {
    const note = useNote()
    return (
    <>
        <h1 className='my-4'>Edit Note</h1>
        <FormNote
            title={note.title}
            markdown={note.markdown}
            tags = {note.tags}
         onSubmit={data => onSubmit(note.id, data)} onAddTag={onAddTag} availbleTags={availbleTags} />
    </>
  )
}

export default EditNote