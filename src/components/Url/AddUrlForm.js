import React from 'react';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import Dropdown from '../common/Dropdown';
import { Button } from 'semantic-ui-react'

import PropTypes from 'prop-types'; // ES6
import FlexView from 'react-flexview';

const AddUrlForm = ({formDetails, onClick, onChange, saveURLHandler, cancelSaveURLHandler, errors}) => {
	return (
		<FlexView row grow>
			<FlexView column hAlignContent='center' grow>
				<form className="ui form segment"  style={{width: '70%'}}>
					<FlexView column>
				  		<TextInput
				  			name="url" 
				  			label="Paste URL here"
				  			value={formDetails.url}
				  			onChange={onChange}
				  			error={errors.title}/>
				    	<TextArea
							rows={2} 
							name="urldesc"
							label="Add URL Description here"
							value={formDetails.urldesc}
							onChange={onChange}
							error={errors.description}/>
					</FlexView>

				</form>
				<FlexView row hAlignContent='center'>
					<FlexView column hAlignContent='center'>
				        <Button onClick={cancelSaveURLHandler}>
				        	Back
				        </Button>
					</FlexView>
					<FlexView column hAlignContent='center'>
						<Button primary
							type="input"
							onClick={saveURLHandler}>
							Save
						</Button>
					</FlexView>
				</FlexView>
			</FlexView>
		</FlexView>
	);
};

AddUrlForm.propTypes = {
	// course: React.PropTypes.object.isRequired,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	loading: PropTypes.bool,
	errors: PropTypes.object
};

export default AddUrlForm;


