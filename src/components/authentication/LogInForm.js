import React from 'react';
import TextInput from '../common/TextInput';
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'; // ES6
import FlexView from 'react-flexview';

const LogInForm = ({formDetails, onClick, onChange, loading, labelButton, errors}) => {
	return (
		<FlexView>
			<form className="ui form segment">
				<FlexView column>
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
				</FlexView>

				<FlexView column hAlignContent='center'>
					<Button primary
						type="submit"
						disabled={loading}
						onClick={onClick}
						value={loading ? 'Authenticating...' : 'Done'}
					>{loading ? 'Authenticating...' : labelButton}</Button>
				</FlexView>
			</form>
		</FlexView>
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


