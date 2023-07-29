import WithAuthenticationLayout from "../../components/authenticationLayout/withAuthenticationLayout";
import Card from "../../components/util/card/card";
import CustomInput from "../../components/util/input/customInput";
import Button from "../../components/util/button/button";
import React from "react";
import style from './signUp.module.css';
import Link from "next/link";
import {companySignup} from "../api/authorizationApi";
import {useRouter} from "next/router";

const SignUp = () => {

    const [firmName, setFirmName] = React.useState('');
    const [firmNameValid, setFirmNameValid] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [emailValid, setEmailValid] = React.useState(true);
    const [password, setPassword] = React.useState('');
    const [passwordValid, setPasswordValid] = React.useState(true);
    const [firmNameMessage, setFirmNameMessage] = React.useState('');
    const [emailMessage, setEmailMessage] = React.useState('');
    const [passwordMessage, setPasswordMessage] = React.useState('');

    const router = useRouter();

    const validateFirmName = (firmName) => {
        // Check if the firm name is not empty
        return firmName.trim() !== '';
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
        const isFirmNameValid = validateFirmName(firmName);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        setFirmNameValid(isFirmNameValid);
        setEmailValid(isEmailValid);
        setPasswordValid(isPasswordValid);

        if (isFirmNameValid && isEmailValid && isPasswordValid) {
            const signUpdData = {
                firmName,
                email,
                password
            }
            const response = await companySignup(signUpdData);
            if (response !== 'success') {
                setEmailMessage(response)
                setEmailValid(false)
            } else {
                await router.push("login")
            }
        } else {
            if (!isFirmNameValid) {
                setFirmNameMessage('Please enter a valid firm name.');
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
                <CustomInput onChange={(value) => handleChange(value, setFirmName, setFirmNameValid)}
                             defaultValue={firmName}
                             label={'Firm Name'}
                             className={`${style.input} ${!firmNameValid ? "" : style.inputValid}`}
                             placeholder={'Firm Name'}
                             type={'text'}
                             isValid={firmNameValid}
                             validationMessage={firmNameMessage}
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

export default WithAuthenticationLayout(SignUp);