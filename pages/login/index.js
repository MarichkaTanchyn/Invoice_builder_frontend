import React, {useState} from 'react';
import Card from "../components/util/card/card";
import style from './login.module.css'
import CustomInput from "../components/util/input/customInput";
import Button from "../components/util/button/button";
import CheckboxWithLabel from "../components/util/filter/checkboxWithLabel";
import WithAuthenticationLayout from "../components/authenticationLayout/withAuthenticationLayout";
import {useRouter} from "next/router";
import {login} from "../api/authorizationApi";
import {setCookie} from "cookies-next";

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = async () => {

        if (email && password) {
            const data = {
                email: email,
                password: password
            };
            // Perform a POST request to the backend with the input values
            const response = await login(data)

            console.log(response.data);
            if (!response.data.message) {
                setCookie('companyId', response.data.companyId, {
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/',
                });
                setCookie('employeeId', response.data.employeeId, {
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/',
                });
                setCookie('accToken', response.data.accessToken, {
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/',
                });
                setCookie('roles', response.data.roles, {
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/',
                });

                await router.push("/")
            } else {
                //setErrorMessage(response.data.message);

            }
        }
    };

    const handleSignUpClick = async () => {
        await router.push("signUp")
    };

    return (
        <Card customStyle={style.card}>
            <div className={style.cardBody}>
                <h1>Log In</h1>
                <div className={style.inputsBox}>
                    <CustomInput
                        className={style.input}
                        label={'Email'}
                        placeholder={'Email'}
                        value={email}
                        type={'email'}
                        onChange={value => setEmail(value)}

                    />
                    <CustomInput
                        className={style.input}
                        label={'Password'}
                        placeholder={'Password'}
                        value={password}
                        type={'password'}
                        onChange={value => setPassword(value)}
                    />
                </div>
                <div className={style.actionsBox}>
                    <CheckboxWithLabel label={'Remember me'}/>
                    <div className={style.buttonsBox}>
                        <Button label={'Sign Up'} onClick={handleSignUpClick}/>
                        <Button label={'Log In'} onClick={handleLoginClick}/>
                    </div>
                </div>
            </div>
        </Card>
    )
};

export default WithAuthenticationLayout(Login);