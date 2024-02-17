import React, { useState } from 'react';
import axios from 'axios';
import "../styles/signup.css";
import Login from './Login';

const Signup = () => {

    const [value, setValue] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleChange = (e) => {
        setValue((prevVal) => ({ ...prevVal, [e.target.name]: e.target.value }))

        if (e.target.value.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [e.target.name]: `${e.target.name} is required`,
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [e.target.name]: '',
            }));
        }
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        // console.log("e:", e);

        setIsButtonDisabled(true);

        if (!value.name || !value.email || !value.password || !value.confirm_password) {
            alert('Please fill in all required fields');
            setErrors({
                name: "",
                email: "",
                password: "",
                confirm_password: ""
            })
            setIsButtonDisabled(false);
            return;
        }

        if (value.password !== value.confirm_password) {
            alert('Password not match. Please try again');
            setValue({
                name: "",
                email: "",
                password: "",
                confirm_password: ""
            });
            setIsButtonDisabled(false);
            return;
        }

        try {
            const response = await axios.post('https://guvi-task-backend-jwfz.onrender.com/api/user/signup', { ...value });
            // console.log("response data:", response.data.Message);

            if (response.data.Message !== "Email already exists") {

                alert("Form submitted successfully");
                setValue({
                    name: "",
                    email: "",
                    password: "",
                    confirm_password: ""
                });
                clearURLParameters();

            } else {

                alert("Email already exists");
                setValue({
                    name: "",
                    email: "",
                    password: "",
                    confirm_password: ""
                });
                clearURLParameters();
            }

        } catch (err) {
            alert(err);
        } finally {
            setIsButtonDisabled(false);
        }
    }

    const clearURLParameters = () => {
        // Clear URL parameters using window.history.replaceState
        window.history.replaceState({}, document.title, window.location.pathname);
    };

    const formReset = (e) => {
        e.preventDefault();

        setValue({
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        })

        setErrors({
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        })
    }

    return (
        <>
            <header>
                <div>
                    <h1>Home page</h1>
                </div>
            </header>
                <div className='container row'>
                    <form className='signup'>
                        <h1>Signup</h1>
                        <label>Name:</label>
                        <input type="text" name="name" value={value.name} onChange={handleChange} /><br />
                        <div style={{ color: 'red' }}>{errors.name}</div>
                        <label>Email:</label>
                        <input type="email" name="email" value={value.email} onChange={handleChange} /><br />
                        <div style={{ color: 'red' }}>{errors.email}</div>
                        <label>Password:</label>
                        <input type="password" name="password" value={value.password} onChange={handleChange} /><br />
                        <div style={{ color: 'red' }}>{errors.password}</div>
                        <label>Confirm password:</label>
                        <input type="password" name="confirm_password" value={value.confirm_password} onChange={handleChange} /><br />
                        <div style={{ color: 'red' }}>{errors.confirm_password}</div>
                        <section className='btn__section'>
                            <button className="btn--class" onClick={(e) => formSubmit(e)}>{isButtonDisabled ? 'Processing...' : 'Submit'}</button>
                            <button className="btn--class" onClick={(e) => formReset(e)}>Reset</button>
                        </section>
                    </form>
                    <Login className="login"/>
                </div>
        </>
    )
};

export default Signup;
