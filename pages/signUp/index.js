import WithAuthenticationLayout from "../components/authenticationLayout/withAuthenticationLayout";
import Card from "../components/util/card/card";
import CustomInput from "../components/util/input/customInput";
import Button from "../components/util/button/button";
import React from "react";
import style from './signUp.module.css';
import Link from "next/link";

const SignUp = () => {

    return (
        <Card customStyle={style.card}>
            <div className={style.cardBody}>
                <h1>Sign Up</h1>
                <div className={style.inputsBox}>
                    <CustomInput className={style.input} label={'Firm Name'} placeholder={'Firm Name'}/>
                    <CustomInput className={style.input} label={'Email'} placeholder={'Email'}/>
                    <CustomInput className={style.input} label={'Password'} placeholder={'Password'}/>
                </div>
                <div className={style.actionsBox}>
                    <div>
                    <Link href={"login"}><span className={style.loginLink}>login</span></Link>
                        <span> if you are already registered</span>
                    </div>
                    <div className={style.buttonsBox}>
                        <Button label={'Sign Up'} onClick={() => {}}/>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default WithAuthenticationLayout(SignUp);