import WithAuthenticationLayout from "../../components/authenticationLayout/withAuthenticationLayout";
import Card from "../../components/util/card/card";
import CustomInput from "../../components/util/input/customInput";
import Button from "../../components/util/button/button";
import React from "react";
import style from './signUp.module.css';
import Link from "next/link";
import {employeeSignUp} from "../api/authorizationApi";
import {useRouter} from "next/router";

const UserSignUp = () => {
    const router = useRouter();

    const {token} = router.query
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [firstNameValid, setFirstNameValid] = React.useState(true);
    const [lastNameValid, setLastNameValid] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [emailValid, setEmailValid] = React.useState(true);
    const [password, setPassword] = React.useState('');
    const [passwordValid, setPasswordValid] = React.useState(true);
    const [firstNameMessage, setFirstNameMessage] = React.useState('');
    const [lastNameMessage, setLastNameMessage] = React.useState('');
    const [emailMessage, setEmailMessage] = React.useState('');
    const [passwordMessage, setPasswordMessage] = React.useState('');


    const validateFirstName = (firstName) => {
        return firstName.trim() !== '';
    };

    const validateLastName = (lastName) => {
        return lastName.trim() !== '';
    };
    const validateEmail = (email) => {
        // Check if the email is in a valid format
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        // Check if the password has at least one uppercase, one lowercase, one number, one special character, and is at least 8 characters long
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        return regex.test(password);
    };
    const handleSignUp = async () => {
        const isFirstNameValid = validateFirstName(firstName);
        const isLastNameValid = validateLastName(lastName);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        setFirstNameValid(isFirstNameValid);
        setLastNameValid(isLastNameValid);
        setEmailValid(isEmailValid);
        setPasswordValid(isPasswordValid);

        if (isFirstNameValid && isEmailValid && isPasswordValid) {
            const signUpdData = {
                firstName, lastName, email, password
            }
            const response = await employeeSignUp(signUpdData, token);
            if (response.data !== 'success') {
                setEmailMessage(response.data.message)
                setEmailValid(false)
            } else {
                await router.push("/waitForAcceptance")
            }
        } else {
            if (!isFirstNameValid) {
                setFirstNameMessage('Please enter a valid firm name.');
            }
            if (!isLastNameValid) {
                setLastNameMessage('Please enter a valid last name.');
            }
            if (!isEmailValid) {
                setEmailMessage('Please enter a valid email.');
            }
            if (!isPasswordValid) {
                setPasswordMessage('Password requires uppercase, lowercase, number,<br/> special character, and minimum 8 characters.');
            }
        }
    }

    const handleChange = (value, setInput, setValid) => {
        setInput(value);
        setValid(true);
    };

    return (<Card customStyle={style.card}>
        <div className={style.cardBody}>
            <h1>Sign Up</h1>
            <div className={style.inputsBox}>
                <CustomInput onChange={(value) => handleChange(value, setFirstName, setFirstNameValid)}
                             defaultValue={firstName}
                             label={'First Name'}
                             className={`${style.input} ${!firstNameValid ? "" : style.inputValid}`}
                             placeholder={'First Name'}
                             type={'text'}
                             isValid={firstNameValid}
                             validationMessage={firstNameMessage}
                />
                <CustomInput onChange={(value) => handleChange(value, setLastName, setLastNameValid)}
                             defaultValue={lastName}
                             label={'Last Name'}
                             className={`${style.input} ${!lastNameValid ? "" : style.inputValid}`}
                             placeholder={'Last Name'}
                             type={'text'}
                             isValid={lastNameValid}
                             validationMessage={lastNameMessage}
                />
                <CustomInput onChange={(value) => handleChange(value, setEmail, setEmailValid)}
                             defaultValue={email}
                             className={`${style.input} ${!emailValid ? "" : style.inputValid}`}
                             label={'Email'}
                             placeholder={'Email'}
                             type={'email'}
                             isValid={emailValid}
                             validationMessage={emailMessage}
                />
                <CustomInput onChange={(value) => handleChange(value, setPassword, setPasswordValid)}
                             defaultValue={password}
                             className={`${style.input} ${!passwordValid ? "" : style.passwordValid}`}
                             label={'Password'}
                             placeholder={'Password'}
                             type={'password'}
                             isValid={passwordValid}
                             validationMessage={passwordMessage}
                />
            </div>
            <div className={style.actionsBox}>
                <div>
                    <Link href={"login"}><span className={style.loginLink}>login</span></Link>
                    <span> if you are already registered</span>
                </div>
                <div className={style.buttonsBox}>
                    <Button label={'Sign Up'} onClick={handleSignUp}/>
                </div>
            </div>
        </div>
    </Card>)
}

export default WithAuthenticationLayout(UserSignUp);