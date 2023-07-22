import CustomInput from "../components/util/input/customInput";
import styles from "./settings.module.css";
import {useEffect, useState} from "react";
import {getCompanyData, updateCompanyData} from "../api/companyAPI";
import Button from "../components/util/button/button";

const CompanyData = ({adminPermission}) => {

    const [hasEditPermission, setHasEditPermission] = useState(adminPermission)
    const [companyData, setCompanyData] = useState();
    const [editedData, setEditedData] = useState();
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const data = await getCompanyData()
            setCompanyData(data.data[0])
            setEditedData(data.data[0]);
        }
        fetchData()
    }, [])

    const handleChange = (field, value) => {
        setEditedData({
            ...editedData,
            [field]: value,
        });
    };


    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        setCompanyData(editedData);
        const resp = await updateCompanyData(editedData);
        console.log(resp);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditedData(companyData);
        setEditMode(false);
    };

    return (
        <>
        <div className={styles.companyDataContent}>
            <div>
                <div className={styles.rowData}>
                    <span>Name</span>
                    <CustomInput className={styles.input}
                                 defaultValue={companyData ? companyData.firmName : ''}
                                 readOnly={!editMode}
                                 type="text"
                                 onChange={value => handleChange('firmName', value)}
                    />
                </div>
                <div className={styles.rowData}>
                    <span>NIP</span>
                    <CustomInput className={styles.input}
                                 defaultValue={companyData ? companyData.nip : ''}
                                 readOnly={!editMode}
                                 onChange={value => handleChange('nip', value)}
                                 type="number"
                    />
                </div>
                <div className={styles.rowData}>
                    <span>Bank Account</span>
                    <CustomInput className={styles.input}
                                 readOnly={!editMode}
                                 defaultValue={companyData ? companyData.bankAccountNumber : ''}
                                 onChange={value => handleChange('bankAccountNumber', value)}
                                 type="text"
                    />
                </div>
            </div>
            <div>
                <div className={styles.rowData}>
                    <span>Country</span>
                    <CustomInput className={styles.input}
                                 defaultValue={companyData? companyData.country : ''}
                                 readOnly={!editMode}
                                 onChange={value => handleChange('country', value)}
                                 type="text"
                    />
                </div>
                <div className={styles.rowData}>
                    <span>City</span>
                    <CustomInput className={styles.input}
                                 defaultValue={companyData ? companyData.city : ''}
                                 readOnly={!editMode}
                                 onChange={value => handleChange('city', value)}
                                 type="text"
                    />
                </div>
                <div className={styles.rowData}>
                    <span>Address</span>
                    <CustomInput className={styles.input}
                                 defaultValue={companyData? companyData.address : ''}
                                 readOnly={!editMode}
                                 onChange={value => handleChange('address', value)}
                                 type="text"
                    />
                </div>
                <div className={styles.rowData}>
                    <span>Postal-Code</span>
                    <CustomInput className={styles.input}
                                 defaultValue={companyData ? companyData.postalCode : ''}
                                 readOnly={!editMode}
                                 onChange={value => handleChange('postalCode', value)}
                                 type="text"
                    />
                </div>
            </div>
        </div>
    <div className={styles.buttonContainer}>
        {hasEditPermission &&
        <>
        {editMode ? (
            <>
                <Button label={"Cancel"} onClick={handleCancel} />
                <Button label={"Save"} onClick={handleSave} />
            </>
        ) : (
            <Button label={"Edit"} onClick={handleEdit} />
        )}
        </>
        }
    </div>
    </>
    )
}

export default CompanyData;