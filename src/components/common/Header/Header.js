import React from 'react';
import './Header.css';

// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]
const Header = ({options=[], onChange, placeHolder, logoutHandler}) => {
	return (
		<header className="shadow">
			<nav>
				<ul>
					<li><h1>Keep It</h1></li>
				</ul>
			</nav>
			<div>
				<span><i className="fa fa-search" aria-hidden="true"></i></span>
				<input type="text" placeholder="Search"/>
				<span><i className="fa fa-times" aria-hidden="true"></i></span>
			</div>
			<button>Logout</button>
		</header>

	);
};
			// <ul className="navigation">
			// 	<li><a href="#" onClick={logoutHandler}>Logout</a></li>
			// </ul>

export default Header;

