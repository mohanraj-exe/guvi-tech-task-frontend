import React, { useState } from 'react';
import axios from 'axios';
import Logout from './Logout';

const UserProfile = () => {

    const [value, setValue] = useState({
        age: '',
        gender: '',
        dob: '',
        mobile: ''
    });

    const [errors, setErrors] = useState({
        age: '',
        gender: '',
        dob: '',
        mobile: ''
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check for empty input
        if (value.trim() === '') {
            setValue((prevValues) => ({ ...prevValues, [name]: value }));
            setErrors((prevErrors) => ({ ...prevErrors, [name]: `${name} is required` }));
            return;
        }

        // Validate input for age, dob, and mobile
        let isValid = true;
        let errorMessage = '';

        if (name === 'age' && !/^\d+$/.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid numeric age.';

        } else if (name === 'mobile') {
            // Allow only numbers for mobile, no specific digit constraint
            if (!/^\d+$/.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid numeric mobile number.';
            }
        }

        setValue((prevVal) => ({ ...prevVal, [name]: isValid ? value : prevVal[name] }))
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));

    }

    const formSubmit = async (e) => {
        e.preventDefault();
        setIsButtonDisabled(true);

        if (!value.age || !value.gender || !value.dob || !value.mobile) {
            alert('Please fill in all required fields');
            setErrors({
                age: "",
                gender: "",
                dob: "",
                mobile: "",
            });
            setIsButtonDisabled(false);
            return;
        }

        try {
            const backendUrl = 'https://guvi-task-backend-jwfz.onrender.com/api/user';
            const patchEndpoint = '/profile';
            const payloadData = { ...value }

            const accessToken = JSON.parse(localStorage.getItem("accessToken"));

            // Set up the Axios request headers with authorization token
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken.token}`,
            };

            // Make the PATCH request using Axios
            const response = await axios.patch(`${backendUrl}${patchEndpoint}`, payloadData, { headers });

            // console.log("response:", response.data);

            if (response.data.Message !== "Not authorized user") {

                alert("User info updated successfully");
                setValue({
                    age: "",
                    gender: "",
                    dob: "",
                    mobile: ""
                });
                clearURLParameters();
            } else {

                alert("Not authorized user");
                setValue({
                    age: "",
                    gender: "",
                    dob: "",
                    mobile: ""
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
            age: "",
            gender: "",
            dob: "",
            mobile: ""
        })

        setErrors({
            age: "",
            gender: "",
            dob: "",
            mobile: ""
        })
    }



    return (
        <>
            <header>
                <div className='header__container'>
                    <h1>User profile</h1>
                    <Logout />
                </div>
            </header>
            <div className='container row'>
                <form className='user_profile'>
                    <h1>Additonal information:</h1>

                    <label>Age:</label>
                    <input type="nubmer" name="age" maxLength={2} value={value.age} onChange={handleChange} /><br />
                    <div style={{ color: 'red' }}>{errors.age}</div>

                    <section className='gender__section'>
                        <label>Gender:</label>
                        <section className='gender__section--option'>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={value.gender === "male"}
                            onChange={handleChange}>
                        </input>
                        <label>Male</label>&nbsp;

                        <input type="radio" name="gender" value="female" checked={value.gender === "female"} onChange={handleChange} />
                        <label>Female</label>
                            
                        </section>
                        <div style={{ color: 'red' }}>{errors.gender}</div>
                    </section>

                    <label>DOB:</label>
                    <input type="date" name="dob" value={value.dob} onChange={handleChange} /><br />
                    <div style={{ color: 'red' }}>{errors.dob}</div>

                    <label>Mobile:</label>
                    <input type="nubmer" name="mobile" maxLength={10} value={value.mobile} onChange={handleChange} /><br />
                    <div style={{ color: 'red' }}>{errors.mobile}</div>

                    <section className='btn__section'>
                        <button className="btn--class" onClick={(e) => formSubmit(e)}>{isButtonDisabled ? 'Processing...' : 'Submit'}</button>
                        <button className="btn--class" onClick={(e) => formReset(e)}>Reset</button>
                    </section>
                </form>
            </div>
        </>
    )
};

export default UserProfile;
