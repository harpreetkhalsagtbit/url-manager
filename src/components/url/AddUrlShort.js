import React from 'react';
import TextInput from '../common/TextInput';
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'; // ES6
import FlexView from 'react-flexview';

const AddurlShort = ({urlShortForm, saveURLHandler, onChange, loading, labelButton, errors={}}) => {
	return (
		<div>
			<FlexView hAlignContent='center' grow style={{height: '50px', backgroundColor: '#D1236D'}}>
				<FlexView width={"50%"}>
					<FlexView width={"90%"} className="ui form" marginTop='5px' marginBottom='5px' marginRight='10px'>
						<div style={{width: '100%'}}>
					  		<TextInput
					  			name="url" 
					  			value={urlShortForm.url}
					  			onChange={onChange}
					  			error={errors.title}/>
					  	</div>
					</FlexView>
					<FlexView marginTop='5px' marginBottom='5px' marginLeft='auto'>
						<Button primary
							type="submit"
							disabled={loading}
							onClick={saveURLHandler}
						>Add</Button>
					</FlexView>
				</FlexView>
			</FlexView>
		</div>
	);
};

AddurlShort.propTypes = {
	// course: React.PropTypes.object.isRequired,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	loading: PropTypes.bool,
	errors: PropTypes.object
};

export default AddurlShort;


