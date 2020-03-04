import React, { useState } from 'react';
import * as yup from 'yup';
import ErrorMessage from './ErrorMessage';

const loginValidationSchema = yup.object().shape({
  email: yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: yup.string()
    .required('Please enter a password')
});

function Login() {
  const [emailAndPassword, setEmailAndPassword] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState();

  function handleChange(event) {
    console.log('Change value: ', event.target.value);
    setEmailAndPassword({ ...emailAndPassword, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    console.log('Email and password: ', emailAndPassword);
    loginValidationSchema.validate(emailAndPassword, {abortEarly: false})
      .catch(err => {
        setFormErrors(err.errors);
        console.log('yup thing: ', err);
      });
    // Do the thing you want to do with the combo
    setEmailAndPassword({
      email: '',
      password: ''
    });
    event.preventDefault();
  }

  return (
    <div className="login">
      <h2>Login Page</h2>
      {formErrors && formErrors.map(err => (
        <ErrorMessage key={err} message={err}/>
      ))}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type='text'
              name='email'
              value={emailAndPassword.email}
              placeholder='johndoe@gmail.com'
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type='password'
              name='password'
              value={emailAndPassword.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;

