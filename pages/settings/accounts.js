import React, {useEffect, useState} from "react";
import {getEmployees} from "../api/employeesApi";
import styles from './settings.module.css'
import ButtonWithImg from "../components/util/button/buttonWithImg";
import CustomInput from "../components/util/input/customInput";
import {getRegisterToken} from "../api/authorizationApi";

const Accounts = ({userPermissions}) => {

    const [hasEditPermission, setHasEditPermission] = useState(false)
    const [admins, setAdmins] = useState({})
    const [users, setUsers] = useState([])
    const [registerLink, setRegisterLink] = useState('')

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

            if (userPermissions.some((permission) => permission === "PERMISSION_ADMIN")) {
                setHasEditPermission(true)
            }

            console.log(users)
            console.log(admins)
            setAdmins(admins)
            setUsers(users)

            setRegisterLink(`http://localhost:3001/userSignUp/${token.data.token}`)
        }

        fetchData()
    }, [])



    return (
        <div className={styles.accountsContent}>
            <div className={styles.section}>
                <span className={styles.sectionSpan}>Admin-User</span>
                {/*<div>*/}
                {/*    {admins && admins.map(admin => {*/}
                {/*        return (*/}
                {/*            <div className={styles.sectionContent}>*/}
                {/*                /!*<span>{admin.Person.firstName}</span>*!/*/}
                {/*                <span>{admin.Person.lastName}</span>*/}
                {/*                <span>{admin.email}</span>*/}
                {/*                /!*<img className={`${styles.img} ${styles.bin}`} src={"/bin.svg"} alt={"bin"}/>*!/*/}
                {/*            </div>*/}
                {/*        )})}*/}
                {/*</div>*/}
            </div>
            <div className={styles.section}>
                <span className={styles.sectionSpan}>Users</span>
                <div>
                    {users && users.map(user => {
                        return (
                            <div className={styles.sectionContent}>
                                <span>{user.Person.firstName}</span>
                                <span>{user.Person.lastName}</span>
                                <span>{user.email}</span>
                                <img className={`${styles.img} ${styles.bin}`} src={"/bin.svg"} alt={"bin"}/>
                            </div>
                        )})}
                </div>
            </div>
            <div className={styles.section}>
                <span className={styles.sectionSpan}>Add New User</span>
                <div>
                    <CustomInput defaultValue={registerLink} className={`${styles.input} ${styles.linkInput}`} label={"Copy link to send personally"} readOnly={true}/>
                </div>
                <span>or</span>
                <div>
                    {/* Copy link to send personally */}
                </div>
            </div>
        </div>
    )
}

export default Accounts;