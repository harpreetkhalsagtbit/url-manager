import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import Dropdown from '../common/Dropdown';

const ModalShorthandExample = ({open, urlForm, tags, editURLHandler, saveURLHandler, onChange, errors={}}) => {
  console.log("tags in modal", tags)
  return (
    <Modal open={open}>
      <Modal.Header>URL Manager</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Add URL</Header>
        </Modal.Description>
  		<TextInput
  			name="url" 
  			label="Paste URL here"
  			value={urlForm.url}
  			onChange={onChange}
  			error={errors.title}/>
      <TextArea
        name="urldesc"
        label="Add URL Description here"
        value={urlForm.urldesc}
        onChange={onChange}
        error={errors.description}/>
      </Modal.Content>
      <Modal.Actions>
        <Button>
        	Cancel
        </Button>
        <Button onClick={saveURLHandler}>
        	Save
        </Button>
      </Modal.Actions>
    </Modal>
    )
}

export default ModalShorthandExample
