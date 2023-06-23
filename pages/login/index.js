import React from 'react';
import Card from "../components/util/card/card";
import style from './login.module.css'
import CustomInput from "../components/util/input/customInput";
import Button from "../components/util/button/button";
import CheckboxWithLabel from "../components/util/filter/checkboxWithLabel";
import WithAuthenticationLayout from "../components/authenticationLayout/withAuthenticationLayout";
import {useRouter} from "next/router";


const Login = () => {

    const router = useRouter();
    const handleSignUpClick = async () => {
        await router.push("signUp")
    };

    return (
            <Card customStyle={style.card}>
                <div className={style.cardBody}>
                    <h1>Log In</h1>
                    <div className={style.inputsBox}>
                        <CustomInput className={style.input} label={'Email'} placeholder={'Email'}/>
                        <CustomInput className={style.input} label={'Password'} placeholder={'Password'}/>
                    </div>
                    <div className={style.actionsBox}>
                        <CheckboxWithLabel label={'Remember me'}/>
                        <div className={style.buttonsBox}>
                            <Button label={'Log In'} onClick={() => {
                            }}/>
                            <Button label={'Sign Up'} onClick={handleSignUpClick}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
};

export default WithAuthenticationLayout(Login);