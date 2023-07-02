import {useEffect, useState} from "react";
import styles from "./settings.module.css";
import CustomInput from "../components/util/input/customInput";
import Button from "../components/util/button/button";
import {getEmployeeData, updatePersonData} from "../api/employeesApi";


const AccountData = () => {
    const [userData, setUserData] = useState();
    const [editedData, setEditedData] = useState();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEmployeeData();
            setUserData(data.data);
            setEditedData(data.data);
        }
        fetchData();
    }, [])

    const handleChange = (field, value) => {
        setEditedData({
            ...userData,
            [field]: value,
        });

    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        setUserData(editedData);
        const resp = await updatePersonData(editedData);
        console.log(resp);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditedData(userData);
        setEditMode(false);
    };

    return (
        <>
            <div className={styles.rowData}>
                <span>First Name</span>
                <CustomInput className={styles.input}
                             defaultValue={userData ? userData.firstName : ''}
                             readOnly={!editMode}
                             onChange={value => handleChange('firstName', value)}
                             type="text"
                />
            </div>
            <div className={styles.rowData}>
                <span>Middle Name</span>
                <CustomInput className={styles.input}
                             defaultValue={userData ? userData.middleName : ''}
                             readOnly={!editMode}
                             onChange={value => handleChange('middleName', value)}
                             type="text"
                />
            </div>
            <div className={styles.rowData}>
                <span>Last Name</span>
                <CustomInput className={styles.input}
                             defaultValue={userData ? userData.lastName : ''}
                             readOnly={!editMode}
                             onChange={value => handleChange('lastName', value)}
                             type="text"
                />
            </div>
            <div className={styles.rowData}>
                <span>Phone Number</span>
                <CustomInput className={styles.input}
                             defaultValue={userData ? userData.phoneNumber : ''}
                             readOnly={!editMode}
                             onChange={value => handleChange('phoneNumber', value)}
                             type="number"
                />
            </div>
            <div className={styles.rowData}>
                <span>Email</span>
                <CustomInput className={styles.input}
                             defaultValue={userData ? userData.email : ''}
                             readOnly={true}
                             onChange={value => handleChange('email', value)}
                             type="text"
                />
            </div>

            <div className={styles.buttonContainer}>
                {editMode ? (
                    <>
                        <Button label={"Cancel"} onClick={handleCancel}/>
                        <Button label={"Save"} onClick={handleSave}/>
                    </>
                ) : (
                    <Button label={"Edit"} onClick={handleEdit}/>
                )}

            </div>

        </>

    )
}

export default AccountData;