import React, {useEffect, useState} from "react";
import {acceptEmployee, deleteEmployee, getEmployees} from "../api/employeesApi";
import styles from './settings.module.css'
import CustomInput from "../components/util/input/customInput";
import {getRegisterToken, sendRegisterLinkViaEmail} from "../api/authorizationApi";
import {getCookie} from "cookies-next";
import ConfirmationDialog from "../components/util/confirmationDialog/confirmationDialog";
import Button from "../components/util/button/button";
import ButtonWithImg from "../components/util/button/buttonWithImg";

const Accounts = () => {

    const [admins, setAdmins] = useState([])
    const [users, setUsers] = useState([])
    const [registerLink, setRegisterLink] = useState('')
    const [showConfirmationDialogBeforeUserDelete, setShowConfirmationDialogBeforeUserDelete] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState('')
    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = React.useState(true);
    const [emailMessage, setEmailMessage] = React.useState('');
    const [copySuccess, setCopySuccess] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            const data = await getEmployees()

            const token = await getRegisterToken()

            const admins = data.employees.filter(employee =>
                employee.Permissions.some(permission => permission.name === 'admin')
            )
            const users = data.employees.filter(employee =>
                employee.Permissions.every(permission => permission.name !== 'admin')
            )

            setAdmins(admins)
            setUsers(users)
            setRegisterLink(`http://localhost:3001/userSignUp/${token.data.token}`)
        }

        fetchData()
    }, [])

    const handleDeleteEmployee = async (id) => {
        setShowConfirmationDialogBeforeUserDelete(true)
        setDeleteUserId(id)
    }

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const onCancelDeleteEmployee = () => {
        setDeleteUserId('')
        setShowConfirmationDialogBeforeUserDelete(false)
    }

    const onConfirmDeleteEmployee = async () => {
        await deleteEmployee(deleteUserId);

        const updatedAdmins = admins.filter(admin => admin.id !== deleteUserId);
        setAdmins(updatedAdmins);
        const updatedUsers = users.filter(user => user.id !== deleteUserId);
        setUsers(updatedUsers);

        setDeleteUserId('')
        setShowConfirmationDialogBeforeUserDelete(false)
    }


    const handleSendEmail = async () => {
        const isEmailValid = validateEmail(email);
        setEmailValid(isEmailValid);
        if (!isEmailValid) {
            setEmailMessage('Please enter a valid email.');
        } else {
            await sendRegisterLinkViaEmail({email: email})
            setEmail("")
        }
    }

    const handleAcceptUser = async (acceptedUser) => {
        const resp = await acceptEmployee(acceptedUser.id)
        if (!resp.message) {
            setUsers(users.map(user => {
                if (user.id === acceptedUser.id) {
                    return {
                        ...user, accepted: true
                    }
                }
                return user
            }))
        }
    }

    return (
        <div className={styles.accountsContent}>
            <div className={styles.section}>
                <span className={styles.sectionSpan}>Admin-User</span>
                <div>
                    {admins.map(admin => {
                        return (
                            <div className={styles.sectionContent} key={admin.id}>
                                <span>{admin.Person.firstName}</span>
                                <span>{admin.Person.lastName}</span>
                                <span>{admin.email}</span>
                                {admin.id !== parseInt(getCookie('employeeId')) &&
                                    <img className={`${styles.img} ${styles.bin}`} src={"/bin.svg"} alt={"bin"}
                                         onClick={() => handleDeleteEmployee(admin.id)}/>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.section}>
                <span className={styles.sectionSpan}>Users</span>
                <div>
                    {users && users.map(user => {
                        return (
                            <div className={styles.sectionContent} key={user.id}>
                                <span>{user.Person.firstName}</span>
                                <span>{user.Person.lastName}</span>
                                <span>{user.email}</span>
                                {user.accepted ?
                                    <span style={{visibility:'hidden'}}></span> :
                                    <span className={styles.accept} onClick={() => handleAcceptUser(user)}>Accept</span>
                                }
                                <img className={`${styles.img} ${styles.bin}`} src={"/bin.svg"} alt={"bin"}
                                     onClick={() => handleDeleteEmployee(user.id)}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.section}>
                <span className={styles.sectionSpan}>Add New User</span>
                <div className={styles.sendViaEmailBox}>
                    <CustomInput defaultValue={registerLink} className={`${styles.input} ${styles.linkInput}`}
                                 label={"Copy link to send personally"} readOnly={true}/>
                    <Button onClick={() => {
                        navigator.clipboard.writeText(registerLink)
                            .then(() => {
                                setCopySuccess('Copied!');
                                setTimeout(() => setCopySuccess(''), 1000);
                            })
                            .catch(err => console.error('Copy failed!', err));
                    }} className={ styles.copy} label={"Copy"}/>
                    {copySuccess && <div style={{color: 'green'}}>{copySuccess}</div>}
                </div>
                <span>or</span>
                <div className={styles.sendViaEmailBox}>
                    <CustomInput defaultValue={email}
                                 onChange={setEmail}
                                 isValid={emailValid}
                                 validationMessage={emailMessage}
                                 type={"email"}
                                 className={`${styles.input} ${styles.emailInput}`}
                                 label={"Send link via Email"} placeholder={"Email"}/>
                    <Button className={!emailValid ? styles.invalidEmailButton : ''} label={"Send"}
                            onClick={handleSendEmail}/>
                </div>
            </div>
            {showConfirmationDialogBeforeUserDelete &&
                <ConfirmationDialog type={'Delete'}
                                    onCancel={onCancelDeleteEmployee}
                                    onAgree={onConfirmDeleteEmployee}
                                    message={'Are you sure you want to delete this user?'}
                                    header={'Delete User'}
                />}
        </div>
    )
}

export default Accounts;