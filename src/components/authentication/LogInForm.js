import React from 'react';
import TextInput from '../common/TextInput';
import PropTypes from 'prop-types'; // ES6

const LogInForm = ({logInDetails, onSave, onChange, loading, errors}) => {
	return (
		<div className="ui column stackable center page grid">
		  <div className="four wide column"></div>
		  <form className="ui six wide column form segment">
			  <TextInput
			  	name="username"
			  	label="Username"
			  	value={logInDetails.username}
			  	onChange={onChange}
			  	error={errors.title}/>

			  <TextInput
			  	name="password"
			  	label="Password"
			  	value={logInDetails.password}
			  	onChange={onChange}
			  	error={errors.category}/>

			  	<button className="ui button"
					type="submit"
					disabled={loading}
					onClick={onSave}
					value={loading ? 'Authenticating...' : 'Done'}
			  	>{loading ? 'Authenticating...' : 'Login'}</button>

		  </form>
		</div>
	);
};

LogInForm.propTypes = {
	// course: React.PropTypes.object.isRequired,
	onSave: PropTypes.func,
	onChange: PropTypes.func,
	loading: PropTypes.bool,
	errors: PropTypes.object
};

export default LogInForm;


