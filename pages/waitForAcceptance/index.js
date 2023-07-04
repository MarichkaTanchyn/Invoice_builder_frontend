import React from 'react';
import withAuthenticationLayout from "../components/authenticationLayout/withAuthenticationLayout";
import style from "./waitForApproval.module.css";
import Card from "../components/util/card/card";

const WaitForAcceptance = () => {


    return (
        <Card customStyle={style.card}>
            <h1>Pending Administrator Approval</h1>
            <span>Once approved, a confirmation email will be dispatched to your inbox.</span>
        </Card>
    )

}

export default withAuthenticationLayout(WaitForAcceptance);