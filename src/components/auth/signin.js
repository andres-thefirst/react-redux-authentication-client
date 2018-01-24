import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
    handleFormSubmit({email, password}) {
        console.log(email, password);

        this.props.signinUser({ email, password});
    }

    renderField(field) {
        const { label, input, type} = field;
        return (
            <fieldset className="form-group" >
                <label>{label}:</label>
                <input {...input} type={type} className="form-control" />
            </fieldset>
        );
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> { this.props.errorMessage }
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field 
                    label="Email"
                    name="email"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    label="Password"
                    name="password"
                    type="password"
                    component={this.renderField}
                />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

const connectSignin = connect(mapStateToProps, actions)(Signin);

export default reduxForm({
    form: 'signin'
})(connectSignin);