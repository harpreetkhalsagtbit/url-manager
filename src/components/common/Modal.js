import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import TextInput from '../common/TextInput';

const ModalShorthandExample = ({open, urlIdToEdit, urlForm, editURLHandler, saveURLHandler, header, content, onChange, errors={}}) => {

  return (
    <Modal open={open}>
      <Modal.Header>URL Manager</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>{header}</Header>
          <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        </Modal.Description>
  		<TextInput
  			name="url"
  			label="Paste URL here"
  			value={urlForm.url}
  			onChange={onChange}
  			error={errors.title}/>

      </Modal.Content>
      <Modal.Actions>
        <Button>
        	Cancel
        </Button>
        <Button onClick={urlIdToEdit?editURLHandler:saveURLHandler}>
        	Save
        </Button>
      </Modal.Actions>
    </Modal>
    )
}

export default ModalShorthandExample
