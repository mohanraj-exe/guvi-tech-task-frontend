import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [value, setValue] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const navigate = useNavigate();

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

        setIsButtonDisabled(true);

        if (!value.email || !value.password) {
            alert('Please fill in all required fields');
            setErrors({
                email: "",
                password: "",
            });
            setIsButtonDisabled(false);
            return;
        }

        try {
            const response = await axios.post('https://guvi-task-backend-jwfz.onrender.com/api/user/login', { ...value });

            if (response.data.Message !== "User not found") {

                localStorage.setItem('accessToken', JSON.stringify(response.data));

                alert("Login successful");
                setValue({
                    email: "",
                    password: "",
                });
                clearURLParameters();
                navigate('/profile');

            } else {

                alert("Email not exists/Credentials not match. Please try again");
                setValue({
                    email: "",
                    password: "",
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
            email: "",
            password: "",
        });

        setErrors({
            email: "",
            password: "",
        });
    }

    return (
        <>
            <div className='login'>
                <div className='container'>
                    <h1>Login</h1>
                    <form>
                        <label>Email:</label>
                        <input type="email" name="email" value={value.email} onChange={handleChange} /><br />
                        <div style={{ color: 'red' }}>{errors.email}</div>
                        <label>Password:</label>
                        <input type="password" name="password" value={value.password} onChange={handleChange} /><br />
                        <div style={{ color: 'red' }}>{errors.password}</div>
                        <section className='btn__section'>
                            <button className="btn--class" onClick={(e) => formSubmit(e)}>{isButtonDisabled ? 'Processing...' : 'Submit'}</button>
                            <button className="btn--class" onClick={(e) => formReset(e)}>Reset</button>
                        </section>
                    </form>
                </div>
            </div>
        </>
    )
};

export default Login;
