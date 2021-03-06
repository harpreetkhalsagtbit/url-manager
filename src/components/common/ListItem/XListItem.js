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
		<ul className="flex-container">
			{listdata.map((url, index) => {
			    return (<li key={url._id} id={url._id} className="flex-item shadow" onMouseEnter={_onMouseEnterHandler.bind(this, url._id)} onMouseLeave={_onMouseLeaveHandler.bind(this, url._id)}>
					<div id={url._id + "_header"} className="cardToolsHeader hide">
						<ui>
							<li className="cardToolsItems"><span className="icon"><i className="fa fa-tag" aria-hidden="true"></i></span></li>
							<li className="cardToolsItems"><span className="icon"><i className="fa fa-edit" aria-hidden="true"></i></span></li>
						</ui>
					</div>
					<div className="imgContainer">
						<img id={url._id + "_image"} src={url.metadata.image} />
					</div>
					<div className="descContainer">
						<h1 className="titleCard"><a href={url.metadata.url} target="_blank">{url.metadata.title}</a></h1>
						<div className="tagContainerCard">
							<a href="#" className="tagsCard">JS</a>
							<a href="#" className="tagsCard">React</a>
							<a href="#" className="tagsCard">JS</a>
							<a href="#" className="tagsCard">React</a>
							<a href="#" className="tagsCard">JS</a>
							<a href="#" className="tagsCard">React</a>
							<a href="#" className="tagsCard">JS</a>
							<a href="#" className="tagsCard">React</a>
							<a href="#" className="tagsCard">JS</a>
							<a href="#" className="tagsCard">React</a>
						</div>
						<p className="descCard">{url.metadata.description}</p>
					</div>
		    	</li>)
    		}, this)}
		</ul>
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

