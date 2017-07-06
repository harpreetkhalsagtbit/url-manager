import React from 'react';
// import PropTypes from 'prop-types'; // ES6
import { Item } from 'semantic-ui-react'

const ListItemForURL = ({listdata = [], label, onChange, placeHolder, value, error}) => {
	let wrapperClass = 'form-group';

	return (
		<div>
		<Item.Group link>
			{listdata.map((url) => {
			    return (<Item key={url._id}>
			    	<Item.Image size='tiny' src={url.metadata.image} />

			    	<Item.Content>
			    		<Item.Header><a href={url.metadata.url} rel="noopener noreferrer" target="_blank">{url.metadata.title}</a></Item.Header>
			    		<Item.Description>{url.metadata.description}</Item.Description>
			    	</Item.Content>
			    </Item>)
			})}

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

