import React from 'react'
import URLPreview from './URLPreview/URLPreview'

const Modal = ({isActive, closeHandler, url}) => {

	var showModal = isActive?"is-active":""
	console.log("showModal", showModal, url)
	return (
		<div className= {"modal " + showModal}>
		  <div className="modal-background"></div>
		  <div className="modal-content">
		  	<URLPreview urlMetadataPreview={url || {}}></URLPreview>
		  </div>
		  <button className="modal-close is-large" aria-label="close"></button>
		</div>
	)
}

export default Modal
