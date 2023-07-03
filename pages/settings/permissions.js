import {useEffect, useState} from "react";
import {getEmployees, updateEmployeePermissions} from "../api/employeesApi";
import ButtonWithImg from "../components/util/button/buttonWithImg";
import styles from './settings.module.css'
import ModifyPermissionsPopup from "./modifyPermissionsPopup";

const Permissions = () => {

    const [users, setUsers] = useState([]);
    const [showModifyPopup, setShowModifyPopup] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEmployees()
            console.log(data)
            setUsers(data.employees)
        }
        fetchData()
    }, [])

    const handleModify = (user) => {
        setSelectedUser(user)
        setSelectedPermissions(user.Permissions.map(permission => ({ label: permission.name, value: permission.name })));
        setShowModifyPopup(true)
    }

    const handleSubmitPopup = async () => {
        const permissions = selectedPermissions.map(permission => {
            return permission.value
        })
        const resp = await updateEmployeePermissions(selectedUser.id, {permissions})
        if (resp.data === "success") {
            setUsers(users.map(user => {
                if (user.id === selectedUser.id) {
                    return {
                        ...user,
                        Permissions: selectedPermissions.map(permission => {
                            return {
                                name: permission.value
                            }
                        })
                    }
                }
                return user
            }))
        }
        setSelectedPermissions([])
        setSelectedUser(null)
        setShowModifyPopup(false)
    }

    const handleCancelPopup = () => {
        setSelectedUser(null)
        setSelectedPermissions([])
        setShowModifyPopup(false)
    }

    return (<div className={styles.permissionsContent}>
        {users.map((user, index) => {
            return (
                // user.id !== parseInt(getCookie('employeeId')) &&
                <div>
                    {index === 0 &&
                        <div className={styles.permissionHeaders}>
                            <span>User</span>
                            <span>Permissions</span>
                            <span>Actions</span>
                        </div>}
                    <div className={styles.userRow}>
                        <div className={styles.userCell}>
                            <span>{user.Person.firstName}</span>
                            <span>{user.Person.lastName}</span>
                        </div>
                        <div className={styles.permissionsCell}>
                            {user.Permissions.map(permission => {
                                return (<div className={styles.permissionItem}>
                                    <span>{permission.name}</span>
                                </div>)
                            })}
                        </div>
                        <div className={styles.userCell}>
                            <ButtonWithImg label={"Modify"} imgSrc={'/settings.svg'} onClick={() => handleModify(user)}/>
                            <ButtonWithImg label={"Delete"} imgSrc={'/bin.svg'}/>
                        </div>
                    </div>
                    {showModifyPopup && <ModifyPermissionsPopup user={selectedUser}
                                                                handleSubmit={handleSubmitPopup}
                                                                handleCancel={handleCancelPopup}
                                                                selectedPermissions={selectedPermissions}
                                                                setSelectedPermissions={setSelectedPermissions}
                                                                handleClose={handleCancelPopup}
                    />}
                </div>)
        })}
    </div>)

}

export default Permissions;