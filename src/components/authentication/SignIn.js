import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import * as authActions from '../../actions/AuthAction';
import {connect} from 'react-redux';
import LogInForm from './LogInForm';


class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            check:"check",
            auth:Object.assign({}, this.props.auth),
            logInDetails:{},
            errors:{}
        };

        // console.log("constructor", this)
	    this.verifyLogInCredential = this.verifyLogInCredential.bind(this);
        this.updateLogInFormState = this.updateLogInFormState.bind(this);
        this.submitLogInForm = this.submitLogInForm.bind(this);
    }
    componentWillMount() {
        // console.log("componentWillMount", this)
        // if(this.props.auth && !this.props.auth.isLoggedIn && this.props.history) {
        //     this.props.history.push("/sign-in")
        // }

    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", nextProps)
        if(nextProps.auth && nextProps.auth.isLoggedIn) {
            this.setState({auth: Object.assign({}, nextProps.auth)});
            console.log("state set", {errors: Object.assign({}, nextProps.response)})
            this.props.history.push("/")
        } else if(nextProps.auth && !nextProps.auth.isLoggedIn) {
            console.log("else if")
            this.setState({errors: Object.assign({}, nextProps.auth.response)});
        }
    }

    updateLogInFormState(event) {
        const field = event.target.name;
        let logInDetails = this.state.logInDetails;
        logInDetails[field] = event.target.value;
        return this.setState({logInDetails: logInDetails});
    }

    submitLogInForm(event) {
        event.preventDefault();
        console.log(this.state.logInDetails)
        this.verifyLogInCredential()
        // this.props.action.saveCourse(this.state.course);
        // this.context.router.push('/courses');
        // this.props.actions.saveCourse(this.state.course);
    }

	verifyLogInCredential() {
		// console.log("click", this)
		this.props.action.verifyLogIn(this.state.logInDetails)
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate", nextProps, nextState)
        return true;
        // if(this.props.auth && this.props.auth.isLoggedIn) {
        //     this.setState({course: Object.assign({}, this.props.auth)});
        //     // this.props.history.push("/")
        // }
    }
    componentDidUpdate() {
        // console.log("didUpdate", this)
        // if(this.props.auth && this.props.auth.isLoggedIn) {
        //     this.setState({course: Object.assign({}, this.props.auth)});
        //     // this.props.history.push("/")
        // }
    }
    render() {
        // console.log("render", status, this)
        var showError = <h1>No Error</h1>
        if(this.state.errors.errorCode == 400) {
            showError = <h1>Error</h1>
        }
        console.log(this.state)
        return (
            <div>
                <LogInForm
                    onChange = {this.updateLogInFormState}
                    onSave={this.submitLogInForm}
                    logInDetails={this.state.logInDetails}
                    errors={this.state.errors}
                />
                {showError}
            </div>
        );
    }
}

			  // <div>
			  //   <h1>Sign In</h1>
			  //   <p>Auth Failed!</p>
     //            <h1>status: {this.state.auth.isLoggedIn.toString()}</h1>
			  //   <button onClick={this.verifyLogInCredential} value="click">Click</button>
			  // </div>
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

// var count = 0;
function mapStateToProps(state, ownProps) {
    // console.log(count++, "mapStateToProps", state)
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
    // console.log("mapDispatchToProps")
    return {
        action: bindActionCreators(authActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
