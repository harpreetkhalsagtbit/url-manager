import React, { Component } from 'react';
import logo from './logo.svg';
import { bindActionCreators } from 'redux'
import * as authActions from './actions/AuthAction';
import {connect} from 'react-redux';

import './App.css';

class App extends Component {

    constructor(props) {
        console.log(props)
        super(props)
    }
    componentWillMount() {
        if(this.props.auth && !this.props.auth.isLoggedIn && this.props.history) {
            this.props.history.push("/sign-in")
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <main>
                </main>

            </div>
        );
    }
}

// const mapStateToProps = state => ({
//     isLoggedIn: state.getLogInStatus.isLoggedIn,
// })

// const mapDispatchToProps = dispatch => bindActionCreators({
//     getLogInStatus,
//     redirectToLogin
//     // changePage: () => push('/about-us')
// }, dispatch)

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(App)

var count = 0;
function mapStateToProps(state, ownProps) {
    console.log(count++, "mapStateToProps", state)
    // const courseId = ownProps.params.id; //from the path '/course/:id'
    // let course = {id:'', watchHref:'', title:'', authorId:'', length:'', category:''};
    // if(courseId && state.courses && state.courses.length) {
    //     course = getCourseById(state.courses, courseId);
    // }
    // let authors = state.authors || [];

    // const authorsFormattedForDropdown = authors.map(author => {
    //     return {
    //         value:author.id,
    //         text: author.firstName + ' ' + author.lastName
    //     };
    // });
    return {
        auth:state.auth
    };
}

function mapDispatchToProps(dispatch) {
    console.log("mapDispatchToProps")
    return {
        action: bindActionCreators(authActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;