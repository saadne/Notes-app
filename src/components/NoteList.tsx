import React, { useMemo, useState } from 'react'
import {Form, Stack,Row,Col, Button,FormGroup,FormControl,FormLabel, Card, Badge, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import CreatableReactSelect from 'react-select/creatable'
import { setSyntheticLeadingComments } from 'typescript'
import {Note, Tag} from './types/note'

import styles from '../styles.module.css'

type SimplifiedNotes = {
    tags:Tag[]
    title: string,
    id:string
}

type NoteListProps = {
    availbleTags : Tag[],
    notes: SimplifiedNotes[]
    deleteTag: (id:string) => void
    updateTag: (id:string,label: string) => void
}
type EditModalProps = {
    show:boolean,
    availbleTags: Tag[],
    handleClose: () => void
    deleteTag: (id:string) => void
    updateTag: (id:string,label: string) => void

}
function NoteList({availbleTags,notes,deleteTag,updateTag} : NoteListProps ) {
    const [openTag,setOpenTag] = useState(false)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title,setTitle] = useState("")
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                (title === "" ||
                note.title.toLowerCase().includes(title.toLowerCase())) && 
                (selectedTags.length === 0 || 
                    selectedTags.every(tag => 
                    note.tags.some((noteTag) => noteTag.id === tag.id)
                ))
            )
        })
    },[title,selectedTags,notes])
  return (
    <>
        <Row className='align-items-center mb-4'>
            <Col>
                <h1>Notes</h1>
            </Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                    <Link to="/new">
                        <Button variant='primary'>Create</Button>
                    </Link>
                    <Button onClick={() => setOpenTag(true)} variant='outline-secondary'>Edit Tags</Button>
                </Stack>
            </Col>
        </Row>
        <Form>
            <Row className='mb-4'>
                <Col>
                    <FormGroup controlId="title">
                        <FormLabel >Tittle</FormLabel>
                        <FormControl value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup controlId="tags">
                        <FormLabel >Tags</FormLabel>
                        <ReactSelect value={selectedTags.map(tag => {
                            return {label : tag.label, value:tag.id}
                        })} 
                       
                        options={availbleTags.map(tag => {
                                return{label:tag.label,value:tag.id}
                            })
                        }
                        onChange={tags => {
                            setSelectedTags(tags.map(tag => {
                                return {label:tag.label,id:tag.value}
                            }))
                        }}
                        isMulti />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
        <Row xs={1} sm={2} lg={3} xl={4}>
            {filteredNotes.map(note => (
                <Col key={note.id}>
                    <NoteCard id={note.id} title={note.title} tags={note.tags} />
                </Col>
            ))}
        </Row>
        <EditTagsModal deleteTag={deleteTag} updateTag={updateTag} availbleTags={availbleTags} show={openTag} handleClose={() => setOpenTag(false)}/>
    </>
  )
}

export default NoteList

function EditTagsModal({availbleTags,show,handleClose,deleteTag,updateTag}: EditModalProps){
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availbleTags.map(tag => (
                            <Row>
                                <Col>
                                    <Form.Control onChange={e => updateTag(tag.id, e.target.value)} type="text" value={tag.label} />
                                </Col>
                                <Col xs="auto">
                                    <Button onClick={() => deleteTag(tag.id)} variant="outline-danger">&times;</Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

function NoteCard ({id,title,tags}: SimplifiedNotes) {
    return <Card as={Link} to={`/${id}`} 
            className={`h-100 text-reset text-decoration-none ${styles.card}`}>
        <Card.Body>
            <Stack gap={2} className="align-items-center"
                justify-content-center h-100>
                    <span  className='fs-5'>{title}</span>
                    {tags.length > 0 && (
                        <Stack  gap={1} direction='horizontal' className="justify-content-center flex-wrap">
                            {tags.map(tag => (
                                <Badge  className='text-truncate' key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
            </Stack>
        </Card.Body>
    </Card>
}