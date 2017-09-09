import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery'; 

const Dropdown = ({label, options}) => {

	let _onClick = function(id, misc, event) {
		$(".contextMenu").toggleClass("hide")
		$(".modal").toggleClass("is-active")
	}

	$(document).on('click', function(e) {
	    if (!$(e.target).hasClass("isMenu") && !$(".contextMenu").hasClass("hide")) {
			$(".contextMenu").addClass("hide")
	    }
	});

	return (
		<div>
			<div className="contextMenuContainer">
				<div onClick={_onClick}>
					<i className="fa fa-home isMenu"></i>
				</div>
				<ul className="contextMenu hide">
					<li>{label}</li>
				  	{
				  		options.map((value, index) => {
					  		return <li value="{value}">{value}</li>
					  	})
				  	}
				</ul>
			</div>
			<div>
				<i className="fa fa-home"></i>
			</div>
			<div>
				<i className="fa fa-home"></i>
			</div>
		</div>
	);
};

Dropdown.propTypes = {
    label: PropTypes.string.isRequired
};

export default Dropdown;

