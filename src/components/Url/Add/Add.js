import React from 'react';
import TextInput from '../../common/TextInput';
import PropTypes from 'prop-types'; // ES6
import './Add.css';

const AddUrl = ({urlShortForm, saveURLHandler, onChange, loading, onKeyUpAddShortUrlTextInput, errors={}}) => {
	return (
		<div className="addUrlContainer">
			<div className="addUrlChildWrapper shadow">
				<span></span>
				<input type="text" placeholder="Add Url"/>
				<span><i className="fa fa-times" aria-hidden="true"></i></span>
			</div>
		</div>
	);
};
			// <input
			// 	name="url" 
			// 	placeholder="Paste URL..."
			// 	error={errors.title}/>
				// value={urlShortForm.url}
				// onChange={onChange}
				// onKeyUp={onKeyUpAddShortUrlTextInput}

AddUrl.propTypes = {
	// course: React.PropTypes.object.isRequired,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	loading: PropTypes.bool,
	errors: PropTypes.object
};

export default AddUrl;


