import React, { Component } from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import PropTypes from 'prop-types'; // ES6
import './EditUrlModal.css';
import ContentEditable from 'react-contenteditable'

const XEditUrlModal = ({urlMetadata, hide,  loading, updateURLHandler, onChangeTextInput, onClickModalWrapper, errors={}}) => {

	const hideModalHandler = function(event) {
		onClickModalWrapper(event);
	}

	const onChangeDescription = function(proxy, event) {
		console.log(event, arguments, this)
		// event is undefined - using hardcoded desc name
		onChangeTextInput({
			target: {
				name:"description",
				value:event.value
			}
		})
	}

	var url = Object.keys(urlMetadata).length?urlMetadata:{"metadata":{}}

	const childClickhandler = function(event) {
		event.stopPropagation();
	}

	// _showEditModalHandler.bind(this, url)
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
								<TextArea name="description" rows="5" onChange={onChangeDescription} value={url.metadata && url.metadata.description} className="descCard"></TextArea>
							</div>
						</div>
						<div className="">
							<div className="editUrlSave">
								<button onClick={updateURLHandler}>Done</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);

	}
};

			// <p contentEditable={true} onChange={onChangeTextInput} className="descCard">{url.metadata && url.metadata.description}</p>
			// <input
			// 	name="url" 
			// 	placeholder="Paste URL..."
			// 	error={errors.title}/>
				// value={urlShortForm.url}
				// onChange={onChange}
				// onKeyUp={onKeyUpAddShortUrlTextInput}

// EditUrlModal.propTypes = {
// 	// course: React.PropTypes.object.isRequired,
// 	onClick: PropTypes.func,
// 	onChange: PropTypes.func,
// 	loading: PropTypes.bool,
// 	errors: PropTypes.object
// };



class EditUrlModal extends Component {

	constructor(props) {
		super(props)
	    this.state = {
			urlMetadata:props.urlMetadata,
		};
			console.log("props", props)
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
	}

	onDescriptionChange(event) {
		console.log("working", event.target)
		const field = "description";
		console.log(this.state)
	    let urlMetadata = this.state.urlMetadata;
	    urlMetadata["metadata"][field] = event.target.value || "";
	    return this.setState({urlMetadata: urlMetadata});
	}

	componentWillReceiveProps(nextProps) {
		console.log("nextProps", nextProps)
		if(!nextProps.hide) {
			this.setState({
				urlMetadata:nextProps.urlMetadata
			})
		}
	}

	render () {
		var url = Object.keys(this.props.urlMetadata).length?this.props.urlMetadata:{"metadata":{}}
		var style = {
			color:'black'
		}

		if(this.props.hide) {
			return (<div></div>)
		} else {
			return (
				<div className="editUrlModalContainer" onClick={this.props.hideModalHandler} >
					<div className="editUrlModalChildWrapper" onClick={this.props.childClickhandler}>
						<div className="listItem shadow">
							<div>
								<div className="imgContainer">
									<img id={"preview_image"} src={url.metadata && url.metadata.image} />
								</div>
								<div className="descContainer">
									<h1 className="titleCard"><a href={url.metadata && url.metadata.url} target="_blank">{url.metadata && url.metadata.title}</a></h1>
									<ContentEditable
										html={url.metadata && url.metadata.description} // innerHTML of the editable div
										disabled={false}       // use true to disable edition
										onChange={this.onDescriptionChange} // handle innerHTML change
									/>
								</div>
							</div>
							<div className="">
								<div className="editUrlSave">
									<button onClick={this.props.updateURLHandler}>Done</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);	
		}
	}

}

export default EditUrlModal;
