import React from 'react'
import FormNote from './FormNote'
import { NoteData, Tag } from './types/note'

type  NewNoteProps  = {
    onSubmit: (data:NoteData) => void
    onAddTag: (e:Tag) => void
    availbleTags: Tag[]
}

function NewNote({onSubmit,onAddTag,availbleTags }: NewNoteProps ) {
  return (
    <>
        <h1 className='my-4'>New Note</h1>
        <FormNote onSubmit={onSubmit} onAddTag={onAddTag} availbleTags={availbleTags} />
    </>
  )
}

export default NewNote