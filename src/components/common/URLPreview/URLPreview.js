import React from 'react';
// import PropTypes from 'prop-types'; // ES6
import { Button, Item } from 'semantic-ui-react'
import './URLPreview.css';
import $ from 'jquery'; 

var test = {
	"metadata": {
		author:	"10207994725935780",
		date:	"2017-07-20T13:01:42.898Z",
		description:	"A powerful React component to create any layout on any browser using the power of flex.",
		image:	"https://cdn-images-1.medium.com/max/1200/0*kOe7LHCs0WBFQXxA.png",
		publisher:	"buildo blog",
		title:	"FlexView: the easiest way to use flex with React – buildo blog",
		url:	"https://blog.buildo.io/flexview-the-easiest-way-to-use-flex-with-react-c698db55926a"
	},
	"userId": "59463871a92e082354f3b367"
}

const URLPreviewItem = ({urlMetadataPreview, value, error}) => {
	if(!Object.keys(urlMetadataPreview).length) {
		urlMetadataPreview=test
	}
	console.log('urlMetadataPreview', urlMetadataPreview, Object.keys(urlMetadataPreview).length)

	let wrapperClass = 'form-group';
	// let _deleteURLHandler = function(id) {
	// 	deleteURLHandler(id)
	// }

	// let _showEditModalHandler = function(url) {
	// 	showEditModalHandler(url)
	// }

	return (
		<div className="flex-container">
			<div className="flex-item-preview shadow">
				<div id={urlMetadataPreview._id + "_header"} className="cardToolsHeader hide">
					<ui>
						<li className="cardToolsItems">A</li>
						<li className="cardToolsItems">B</li>
					</ui>
				</div>
				<div className="imgContainer">
					<img id={urlMetadataPreview._id + "_image"} src={urlMetadataPreview.metadata.image} />
				</div>
				<div className="descContainer">
					<h1 className="titleCard"><a href={urlMetadataPreview.metadata.urlMetadataPreview} target="_blank">{urlMetadataPreview.metadata.title}</a></h1>
					<p className="descCard">{urlMetadataPreview.metadata.description}</p>
				</div>
			</div>
		</div>
	);
};

export default URLPreviewItem;

