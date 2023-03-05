import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

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

const CollaborateModal = () => {
  const [state, dispatch] = React.useReducer(modalReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state

  return (
    <>
      <Button className="ui button" onClick={() => dispatch({ type: 'open', size: 'tiny' })}>
        Collaborate
      </Button>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>Collaborate on this project</Modal.Header>
        <Modal.Content>
          <form>
            <label>Provide the creator with some information.</label>
            <div>
              <textarea placeholder='Your relevant language proficiencies?'></textarea>
            </div>
            <div>
              <textarea placeholder='What will you contribute to this project?'></textarea>
            </div>
          </form>
        </Modal.Content>

        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Cancel
          </Button>
          <Button positive onClick={() => dispatch({ type: 'close' })}>
            Send
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default CollaborateModal;