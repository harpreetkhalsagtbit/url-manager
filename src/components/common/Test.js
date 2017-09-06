import React from 'react';
import PropTypes from 'prop-types'; // ES6
import {TextArea } from 'semantic-ui-react'
import Dropdown from './Dropdown/Dropdown'
import './Dropdown/Dropdown.css';

const Test = ({name}) => {
	var arr = ["harpreet", "singh"]

	return (
		<div className="">
			<Dropdown label="" options={arr}/>
			<div className="modal">
			  <div className="modal-background"></div>
			  <div className="modal-content">
			  	<h1>Hello</h1>
			  </div>
			  <button className="modal-close is-large" aria-label="close"></button>
			</div>
		</div>

	);
};

export default Test;

