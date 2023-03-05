import React, { useState } from 'react'
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

const DonateModal = () => {
  const [state, dispatch] = React.useReducer(modalReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state

  //////////// FOR DISPLAYING FUNDINGEARNED UNTIL WE FIGURE OUT STRIPE
  const [fundingEarned, setFundingEarned] = useState(0);

  return (
    <>
      <Button className="ui button" onClick={() => dispatch({ type: 'open', size: 'tiny' })}>
        Donate
      </Button>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>Donate to this project</Modal.Header>
        <Modal.Content>
          <form>
            <h6>Donation amount ($):</h6>
            <input type='number'></input>
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

export default DonateModal;