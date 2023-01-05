import React, { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import {Note,NoteData,Tag} from './types/note'
import {v4 as uuidV4} from 'uuid'

type NoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag:Tag) => void
    availbleTags : Tag[]
} & Partial<NoteData>
function FormNote({
    title = "",
    markdown = "",
    tags =[],
    onSubmit,
    onAddTag,
    availbleTags
    }: NoteProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markDownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown : markDownRef.current!.value,
            tags: selectedTags
        })
        navigate('..')
    }
    
  return (
    <Form onSubmit={handleSubmit}>
        <Stack gap={4 }>
            <Row>
                <Col>
                    <FormGroup controlId="title">
                        <FormLabel >Tittle</FormLabel>
                        <FormControl defaultValue={title} ref={titleRef} required/>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup controlId="tags">
                        <FormLabel >Tags</FormLabel>
                        <CreatableReactSelect value={selectedTags.map(tag => {
                            return {label : tag.label, value:tag.id}
                        })} 
                        onCreateOption = {label => {
                            const newTag = {id: uuidV4(),label}
                            onAddTag(newTag)
                            setSelectedTags(prev => [...prev,newTag])
                        }}
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
            <Form.Group controlId="MarkDown">
                <FormLabel>Body</FormLabel>
                <Form.Control required defaultValue={markdown} as="textarea" ref={markDownRef} rows={10}  />
            </Form.Group>
            <Stack direction='horizontal' gap={2} className="justify-content-end">
                <Button type='submit' variant="primary">
                    Save
                </Button>
                <Link to="..">
                    <Button type='button' variant="outline-secondary">
                        Cancel
                    </Button>
                </Link>
            </Stack>
        </Stack>
    </Form>
  )
}

export default FormNote