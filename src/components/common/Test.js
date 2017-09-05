import React from 'react';
import PropTypes from 'prop-types'; // ES6
import {TextArea } from 'semantic-ui-react'
import ContextMenu from './ContextMenu/ContextMenu'
import './ContextMenu/ContextMenu.css';

const Test = ({name}) => {

	return (
		<div className="">
			<ul className="tasks">
				<li className="task" data-id="3">
					<div className="task__content">
						Go To Grocery
					</div>
					<div className="task__actions">
						<i className="fa fa-eye"></i>
						<i className="fa fa-edit"></i>
						<i className="fa fa-times"></i>
						</div>
				</li>
	    	</ul>
		</div>

	);
};

export default Test;

