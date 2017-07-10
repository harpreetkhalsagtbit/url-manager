import React from 'react';
// import PropTypes from 'prop-types'; // ES6
import { Button, Item } from 'semantic-ui-react'

const ListItemForURL = ({listdata = [], showEditModalHandler, deleteURLHandler, label, onChange, placeHolder, value, error}) => {
	let wrapperClass = 'form-group';
	let _deleteURLHandler = function(id) {
		deleteURLHandler(id)
	}

	let _showEditModalHandler = function(url) {
		showEditModalHandler(url)
	}

	return (
		<div>
		<Item.Group link>
			{listdata.map((url, index) => {
			    return (<Item key={url._id}>
			    	<Item.Image size='tiny' src={url.metadata.image} />

			    	<Item.Content>
			    		<Item.Header><a href={url.metadata.url} rel="noopener noreferrer" target="_blank">{url.metadata.title}</a></Item.Header>
			    		<Item.Description>{url.metadata.description}</Item.Description>
			    		<Button onClick={_showEditModalHandler.bind(this, url)}>Edit</Button>
			    		<Button onClick={_deleteURLHandler.bind(this, url._id)}>Delete</Button>
			    	</Item.Content>
			    </Item>)
			}, this)}

		</Item.Group>

		</div>
	);
};

// ListItemForURL.propTypes = {
//     data: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     onChange: PropTypes.func,
//     placeHolder: PropTypes.string,
//     value: PropTypes.string,
//     error: PropTypes.string
// };

export default ListItemForURL;

