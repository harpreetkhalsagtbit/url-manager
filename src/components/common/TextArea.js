import React from 'react';
import PropTypes from 'prop-types'; // ES6
import {TextArea } from 'semantic-ui-react'

const TextAreaInput = ({name, label, onChange, rows, placeHolder, value="", error}) => {
	let wrapperClass = 'form-group';
	if(error && error.length > 0) {
		wrapperClass += " " + "has-error";
	}

	return (
		<div className={wrapperClass}>
			<label htmlFor={name}>{label}</label>
			<div className="field">
				<TextArea
					type="text"
					name={name}
					rows={rows}
					className="form-control"
					placeholder={placeHolder}
					value={value}
					onChange={onChange}/>
			</div>
		</div>

	);
};

TextAreaInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    placeHolder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
};

export default TextAreaInput;

