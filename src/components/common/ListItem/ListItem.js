import React from 'react';
// import PropTypes from 'prop-types'; // ES6
import { Button, Item } from 'semantic-ui-react'
import './ListItem.css';
import $ from 'jquery'; 

const ListItemForURL = ({listdata = [], showEditModalHandler, deleteURLHandler, label, onChange, placeHolder, value, error}) => {
	let wrapperClass = 'form-group';
	let _deleteURLHandler = function(id) {
		deleteURLHandler(id)
	}

	let _showEditModalHandler = function(url) {
		showEditModalHandler(url)
	}

	let _onMouseEnterHandler = function(id, misc, event) {
		$("#" + id + "_image").addClass("focusImage")
		$("#" + id).addClass("focusCard")
		$("#" + id + "_header").removeClass("hide")
	}

	let _onMouseLeaveHandler = function(id, misc, event) {
		$("#" + id + "_image").removeClass("focusImage")
		$("#" + id).removeClass("focusCard")
		$("#" + id + "_header").addClass("hide")
	}

	return (
		<div className="listContainer">  
			{listdata.map((url, index) => {
			    return (
			    	<div className="listItem shadow">
				    	<div>
					    	<div className="imgContainer">
					    		<img id={url._id + "_image"} src={url.metadata.image} />
					    	</div>
					    	<div className="descContainer">
					    		<h1 className="titleCard"><a href={url.metadata.url} target="_blank">{url.metadata.title}</a></h1>
					    		<p className="descCard">{url.metadata.description}</p>
					    	</div>
				    	</div>
				    	<div>
				    		<h1>hello</h1>
				    	</div>
			    	</div>
			    )
    		}, this)}
		</div>
	);
};
		// <Item.Group link>
		// 	{listdata.map((url, index) => {
		// 	    return (<Item key={url._id}>
		// 	    	<Item.Image size='tiny' src={url.metadata.image} />

		// 	    	<Item.Content>
		// 	    		<Item.Header><a href={url.metadata.url} rel="noopener noreferrer" target="_blank">{url.metadata.title}</a></Item.Header>
		// 	    		<Item.Description>{url.metadata.description}</Item.Description>
		// 	    		<Button onClick={_showEditModalHandler.bind(this, url)}>Edit</Button>
		// 	    		<Button onClick={_deleteURLHandler.bind(this, url._id)}>Delete</Button>
		// 	    	</Item.Content>
		// 	    </Item>)
		// 	}, this)}

		// </Item.Group>

// ListItemForURL.propTypes = {
//     data: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     onChange: PropTypes.func,
//     placeHolder: PropTypes.string,
//     value: PropTypes.string,
//     error: PropTypes.string
// };

export default ListItemForURL;

