import React from 'react';
import TextInput from '../common/TextInput';
import PropTypes from 'prop-types'; // ES6

const CourseForm = ({logInDetails, onSave, onChange, loading, errors}) => {
	return (
		<form>
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

			<input
				type="submit"
				disabled={loading}
				value={loading ? 'Authenticating...' : 'Done'}
				className="btn btn-primary"
				onClick={onSave}/>

		</form>
	);
};

CourseForm.propTypes = {
	// course: React.PropTypes.object.isRequired,
	onSave: PropTypes.func,
	onChange: PropTypes.func,
	loading: PropTypes.bool,
	errors: PropTypes.object
};

export default CourseForm;


