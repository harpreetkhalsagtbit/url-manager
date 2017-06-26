import React from 'react';
import TextInput from '../common/TextInput';

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
	onSave: React.PropTypes.func,
	onChange: React.PropTypes.func,
	loading: React.PropTypes.bool,
	errors: React.PropTypes.object
};

export default CourseForm;


