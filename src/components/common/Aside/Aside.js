import React from 'react';
import './Aside.css';

// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]
const Aside = ({options=[]}) => {
	return (
		<aside>
			<h3>Recent Posts</h3>
			<ul>
				<li><a href="#">Post One</a></li>
				<li><a href="#">Post Two</a></li>
			</ul>
		</aside>
	);
};

export default Aside;

