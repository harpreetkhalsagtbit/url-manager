import React from 'react';
import { Button } from 'semantic-ui-react'
import FlexView from 'react-flexview';
import './Header.css';

// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]
const Header = ({options=[], onChange, placeHolder, logoutHandler}) => {
	return (
		<ul className="navigation">
			<li><a href="#" onClick={logoutHandler}>Logout</a></li>
		</ul>
	);
};
			// <FlexView style={{height: 50, backgroundColor: '#D1236D'}}>
			//     <FlexView  hAlignContent='center' marginTop='5px' marginBottom='5px' marginLeft='auto'>
			//         <Button primary onClick={logoutHandler}>
			//             Logout
			//         </Button>
			//     </FlexView>
			// </FlexView>
			// <FlexView style={{height: 10}}>
			// </FlexView>

export default Header;

