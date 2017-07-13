import React from 'react';
import TextInput from '../common/TextInput';
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'; // ES6

const LogInForm = ({formDetails, onClick, onChange, loading, labelButton, errors}) => {
	return (
		<div className="ui column stackable center page grid">
		  <div className="four wide column"></div>
		  <form className="ui six wide column form segment">
			  <TextInput
			  	name="username"
			  	label="Username"
			  	value={formDetails.username}
			  	onChange={onChange}
			  	error={errors.title}/>

			  <TextInput
			  	name="password"
			  	label="Password"
			  	value={formDetails.password}
			  	onChange={onChange}
			  	error={errors.category}/>

			  	<Button primary
					type="submit"
					disabled={loading}
					onClick={onClick}
					value={loading ? 'Authenticating...' : 'Done'}
			  	>{loading ? 'Authenticating...' : labelButton}</Button>

		  </form>
		</div>
	);
};

LogInForm.propTypes = {
	// course: React.PropTypes.object.isRequired,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	loading: PropTypes.bool,
	errors: PropTypes.object
};

export default LogInForm;


