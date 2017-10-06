import React from 'react';
import TextInput from '../../common/TextInput';
import PropTypes from 'prop-types'; // ES6
import './AddUrlPreviewModal.css';

const AddUrlPreviewModal = ({urlMetadataPreview, hide,  loading, saveURLHandler, onKeyUpAddShortUrlTextInput, onClickModalWrapper, errors={}}) => {

	const hideModalHandler = function(event) {
		onClickModalWrapper();
	}
	var url = Object.keys(urlMetadataPreview).length?urlMetadataPreview.url:{"metadata":{}}

	if(hide) {
		return (<div></div>)
	} else {
		return (
			<div className="addUrlPreviewModalPreviewModalContainer" onClick={hideModalHandler} >
				<div className="addUrlPreviewModalPreviewModalChildWrapper">
					<div className="listItem shadow">
						<div>
							<div className="imgContainer">
								<img id={"preview_image"} src={url.metadata && url.metadata.image} />
							</div>
							<div className="descContainer">
								<h1 className="titleCard"><a href={url.metadata && url.metadata.url} target="_blank">{url.metadata && url.metadata.title}</a></h1>
								<p className="descCard">{url.metadata && url.metadata.description}</p>
							</div>
						</div>
						<div className="">
							<div className="addUrlPreviewSave">
								<button onClick={saveURLHandler}>Done</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);

	}
};
			// <input
			// 	name="url" 
			// 	placeholder="Paste URL..."
			// 	error={errors.title}/>
				// value={urlShortForm.url}
				// onChange={onChange}
				// onKeyUp={onKeyUpAddShortUrlTextInput}

AddUrlPreviewModal.propTypes = {
	// course: React.PropTypes.object.isRequired,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	loading: PropTypes.bool,
	errors: PropTypes.object
};

export default AddUrlPreviewModal;


