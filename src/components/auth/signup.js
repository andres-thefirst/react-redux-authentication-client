import React, { Component } from 'react';
import { reduxForm , Field} from 'redux-form';
import * as actions from '../../actions'; 
import { connect } from 'react-redux';

class Signup extends Component {
    renderField(field) {
        const { label, input, type, meta: {touched, error}} = field;
        return (
            <fieldset className="form-group" >
                <label>{label}:</label>
                <input {...input} type={type} className="form-control" />
                {touched && error ? <div className="error">{error}</div> : ''}
            </fieldset>
        );
    }

    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    
    render () {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field 
                    label="Email"
                    name="email"
                    type="email"
                    component={this.renderField}
                />
                <Field 
                    label="Password"
                    name="password"
                    type="password"
                    component={this.renderField}
                />
                <Field 
                    label="Confirm Password"
                    name="passwordConfirm"
                    type="password"
                    component={this.renderField}
                />
                {this.renderAlert()}
                <button actions="submit" className="btn btn-primary">Sign Up!</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};
    const {email, password, passwordConfirm} = formProps;

    if (!email) {
        errors.email = 'Please enter an email';
    }

    if (!password) {
        errors.password = 'Please enter a password';
    }

    if (!passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (password !== passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error};
}

const connectSignup = connect(mapStateToProps, actions)(Signup);

export default reduxForm({
    form: 'signup',
    validate
})(connectSignup);