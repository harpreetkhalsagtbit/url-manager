import React from 'react';
import ListItem from '../common/ListItem/ListItem'
import './Main.css';

// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]
const Main = ({listdata = [], showEditModalHandler, deleteURLHandler, label, onChange, placeHolder, value, error}) => {
	return (
		<div className="page">
			<ListItem listdata={listdata}></ListItem>
		</div>
		
	);
};

export default Main;

