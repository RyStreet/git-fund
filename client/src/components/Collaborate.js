import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_COLLABORATOR } from '../utils/mutations';
import {QUERY_SINGLE_PROJECT} from "../utils/queries"

import { Button, Modal, Form } from 'semantic-ui-react';

import Auth from '../utils/auth';

function modalReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}

const CollaborateModal = ({ projectId }) => {
  const [state, dispatch] = React.useReducer(modalReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state

  const [collabNotes, setCollabNotes] = useState('');

  const [addCollaborator, { error }] = useMutation(ADD_COLLABORATOR, {

    update(cache, {data: {addCollaborator}}){
      try {
        const {collaboratorInfo} = cache.readQuery({query: QUERY_SINGLE_PROJECT});
        
        cache.writeQuery({
          query: QUERY_SINGLE_PROJECT,
          data: {collaboratorInfo: [addCollaborator, ...collaboratorInfo]}
        })
      } catch (err){
        console.log(error)
      }
    }

  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log('adding collaborator')
    try {
      console.log({
        projectId,
        collabNotes,
      })
      const { data } = await addCollaborator({
        variables: {
          projectId,
          collabNotes,
        }
      });

      setCollabNotes('');

      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    // event.preventDefault();

    const { name, value } = event.target;

    if (name === 'collabNotes') {
      setCollabNotes(value);
    }
  };

  return (
    <>
      <Button className="ui button" onClick={() => dispatch({ type: 'open', size: 'tiny' })}>
        Collaborate
      </Button>

      {/* { event => handleFormSubmit(event)} */}
      <Modal
        as={Form} onSubmit={handleFormSubmit}
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>Collaborate on this project</Modal.Header>
        
        <Modal.Content>
            <textarea
                name='collabNotes' id='collabNotes' value={collabNotes} type='text'
                label='What will you contribute to this project?' required
                placeholder='Include what languages and technologies you will use'
                className='' onChange={handleChange}
            />
        </Modal.Content>

        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Cancel
          </Button>
          <Button type='submit' >{/* positive onClick={() => dispatch({ type: 'close' })} */}
            Send
          </Button>
        </Modal.Actions>
      </Modal>      
    </>
  )
}

export default CollaborateModal;