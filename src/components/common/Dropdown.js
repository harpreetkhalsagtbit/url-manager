import React from 'react';
import { Dropdown } from 'semantic-ui-react'

// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]
const DropdownInput = ({options=[], onChange, placeHolder}) => {
	return (
		<div>
			<Dropdown placeholder={placeHolder} multiple search selection options={options} />
		</div>
	);
};

export default DropdownInput;

