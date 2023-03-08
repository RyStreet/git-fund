import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import { ADD_DONATION } from '../utils/mutations'
import Auth from '../utils/auth'
import { useNavigate } from "react-router-dom";

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

const DonateModal = ({projectId}) => {
  const [state, dispatch] = React.useReducer(modalReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state

  const navigate = useNavigate()
  //////////// FOR DISPLAYING FUNDINGEARNED UNTIL WE FIGURE OUT STRIPE
  const [amount, setAmount] = useState("");

  const [addDonation, {error}] = useMutation(ADD_DONATION)

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log("adding donation")
    try{
      const {data} = await addDonation({
        variables:{
          projectId,
          amount,
          donaterName: Auth.getProfile().data.username,
        }
      });
      setAmount("")

      // navigate(0)
    } catch (err){
      console.error(err)
    }
  }

  const handleChange = (event) => {
    let {name, value} = event.target;

    if(name = "amount") {
      setAmount(parseInt(value))
    }
  }

  return (
    <>
      <Button className="ui button" onClick={() => dispatch({ type: 'open', size: 'tiny' })}>
        Donate
      </Button>

      <Modal
        as={Form} onSubmit={handleFormSubmit}
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>Donate to this project</Modal.Header>
        <Modal.Content>
         <h6>Donation amount ($):</h6>
            <input 
            value={amount} 
            name='amount' 
            type='number'
            onChange={handleChange}>  
            </input>
                 
        </Modal.Content>

        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Cancel
          </Button>
          <Button type='submit'>
            Send
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default DonateModal;