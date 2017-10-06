import React from 'react';
import TextInput from '../../common/TextInput';
import PropTypes from 'prop-types'; // ES6
import './EditUrlModal.css';

const EditUrlModal = ({urlMetadata, hide,  loading, saveURLHandler, onClickModalWrapper, errors={}}) => {

	const hideModalHandler = function(event) {
		onClickModalWrapper(event);
	}
	var url = Object.keys(urlMetadata).length?urlMetadata:{"metadata":{}}

	const childClickhandler = function(event) {
		event.stopPropagation();
	}

	if(hide) {
		return (<div></div>)
	} else {
		return (
			<div className="editUrlModalContainer" onClick={hideModalHandler} >
				<div className="editUrlModalChildWrapper" onClick={childClickhandler}>
					<div className="listItem shadow">
						<div>
							<div className="imgContainer">
								<img id={"preview_image"} src={url.metadata && url.metadata.image} />
							</div>
							<div className="descContainer">
								<h1 className="titleCard"><a href={url.metadata && url.metadata.url} target="_blank">{url.metadata && url.metadata.title}</a></h1>
								<p contentEditable={true} className="descCard">{url.metadata && url.metadata.description}</p>
							</div>
						</div>
						<div className="">
							<div className="editUrlSave">
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

EditUrlModal.propTypes = {
	// course: React.PropTypes.object.isRequired,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	loading: PropTypes.bool,
	errors: PropTypes.object
};

export default EditUrlModal;


