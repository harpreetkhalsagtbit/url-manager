import React from 'react';
import './Aside.css';

// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]
const Aside = ({options=[]}) => {
	return (
		<aside>
			<h4>Labels</h4>
			<ul>
				<li>
					<svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="#767676" viewBox="0 0 24 24" height="24px" className="gb_pc"><path d="m0 0h24v24h-24z" fill="none"></path><path d="m17.63 5.84c-0.36-0.51-0.96-0.84-1.63-0.84l-11 0.01c-1.1 0-2 0.89-2 1.99v10c0 1.1 0.9 1.99 2 1.99l11 0.01c0.67 0 1.27-0.33 1.63-0.84l4.37-6.16-4.37-6.16z"></path></svg>
					<a href="#">JS</a>
				</li>
				<li>
					<svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="#767676" viewBox="0 0 24 24" height="24px" className="gb_pc"><path d="m0 0h24v24h-24z" fill="none"></path><path d="m17.63 5.84c-0.36-0.51-0.96-0.84-1.63-0.84l-11 0.01c-1.1 0-2 0.89-2 1.99v10c0 1.1 0.9 1.99 2 1.99l11 0.01c0.67 0 1.27-0.33 1.63-0.84l4.37-6.16-4.37-6.16z"></path></svg>
					<a href="#">Angular</a>
				</li>
				<li>
					<svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="#767676" viewBox="0 0 24 24" height="24px" className="gb_pc"><path d="m0 0h24v24h-24z" fill="none"></path><path d="m17.63 5.84c-0.36-0.51-0.96-0.84-1.63-0.84l-11 0.01c-1.1 0-2 0.89-2 1.99v10c0 1.1 0.9 1.99 2 1.99l11 0.01c0.67 0 1.27-0.33 1.63-0.84l4.37-6.16-4.37-6.16z"></path></svg>
					<a href="#">React</a>
				</li>
				<li>
					<svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="#767676" viewBox="0 0 24 24" height="24px" className="gb_pc"><path d="m0 0h24v24h-24z" fill="none"></path><path d="m17.63 5.84c-0.36-0.51-0.96-0.84-1.63-0.84l-11 0.01c-1.1 0-2 0.89-2 1.99v10c0 1.1 0.9 1.99 2 1.99l11 0.01c0.67 0 1.27-0.33 1.63-0.84l4.37-6.16-4.37-6.16z"></path></svg>
					<a href="#">Node</a>
				</li>
				<li>
					<svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="#767676" viewBox="0 0 24 24" height="24px" className="gb_pc"><path d="m0 0h24v24h-24z" fill="none"></path><path d="m17.63 5.84c-0.36-0.51-0.96-0.84-1.63-0.84l-11 0.01c-1.1 0-2 0.89-2 1.99v10c0 1.1 0.9 1.99 2 1.99l11 0.01c0.67 0 1.27-0.33 1.63-0.84l4.37-6.16-4.37-6.16z"></path></svg>
					<a href="#">CSS</a>
				</li>
				<li>
					<svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="#767676" viewBox="0 0 24 24" height="24px" className="gb_pc"><path d="m0 0h24v24h-24z" fill="none"></path><path d="m17.63 5.84c-0.36-0.51-0.96-0.84-1.63-0.84l-11 0.01c-1.1 0-2 0.89-2 1.99v10c0 1.1 0.9 1.99 2 1.99l11 0.01c0.67 0 1.27-0.33 1.63-0.84l4.37-6.16-4.37-6.16z"></path></svg>
					<a href="#">JS</a>
				</li>
				<li>
					<svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="#767676" viewBox="0 0 24 24" height="24px" className="gb_pc"><path d="m0 0h24v24h-24z" fill="none"></path><path d="m17.63 5.84c-0.36-0.51-0.96-0.84-1.63-0.84l-11 0.01c-1.1 0-2 0.89-2 1.99v10c0 1.1 0.9 1.99 2 1.99l11 0.01c0.67 0 1.27-0.33 1.63-0.84l4.37-6.16-4.37-6.16z"></path></svg>
					<a href="#">Angular</a>
				</li>
				<li>
					<svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="#767676" viewBox="0 0 24 24" height="24px" className="gb_pc"><path d="m0 0h24v24h-24z" fill="none"></path><path d="m17.63 5.84c-0.36-0.51-0.96-0.84-1.63-0.84l-11 0.01c-1.1 0-2 0.89-2 1.99v10c0 1.1 0.9 1.99 2 1.99l11 0.01c0.67 0 1.27-0.33 1.63-0.84l4.37-6.16-4.37-6.16z"></path></svg>
					<a href="#">React</a>
				</li>
				<li>
					<svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="#767676" viewBox="0 0 24 24" height="24px" className="gb_pc"><path d="m0 0h24v24h-24z" fill="none"></path><path d="m17.63 5.84c-0.36-0.51-0.96-0.84-1.63-0.84l-11 0.01c-1.1 0-2 0.89-2 1.99v10c0 1.1 0.9 1.99 2 1.99l11 0.01c0.67 0 1.27-0.33 1.63-0.84l4.37-6.16-4.37-6.16z"></path></svg>
					<a href="#">Node</a>
				</li>
				<li>
					<svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="#767676" viewBox="0 0 24 24" height="24px" className="gb_pc"><path d="m0 0h24v24h-24z" fill="none"></path><path d="m17.63 5.84c-0.36-0.51-0.96-0.84-1.63-0.84l-11 0.01c-1.1 0-2 0.89-2 1.99v10c0 1.1 0.9 1.99 2 1.99l11 0.01c0.67 0 1.27-0.33 1.63-0.84l4.37-6.16-4.37-6.16z"></path></svg>
					<a href="#">CSS</a>
				</li>

			</ul>
		</aside>
	);
};

export default Aside;

