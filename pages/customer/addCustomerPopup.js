import styles from "./customer.module.css";
import CustomInput from "../../components/util/input/customInput";
import Button from "../../components/util/button/button";


const AddCustomerPopup = ({handleClosePopup, handleSubmitPopup, customer, newCustomer, setNewCustomer}) => {

    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    const handleChange = (field, value) => {
        if (field in newCustomer.Person) {
            setNewCustomer({
                ...newCustomer,
                Person: { ...newCustomer.Person, [field]: value },
            });
        } else {
            setNewCustomer({ ...newCustomer, [field]: value });
        }
    };

    return (
        <div className={styles.popupBox}>
            <div className={styles.popupContent} onClick={handlePopupClick}>
                {customer ? <h4>Edit Customer</h4> : <h4>Add Customer</h4>}
                <div className={styles.addCustomerFields}>
                    <div>
                        <h6>Company</h6>
                        <div className={styles.rowData}>
                            <span>Name</span>
                            <CustomInput className={styles.input}
                                         defaultValue={customer ? customer.name : ''}
                                         type="text"
                                         onChange={value => handleChange('name', value)}
                            />
                        </div>
                        <div className={styles.rowData}>
                            <span>Company Number</span>
                            <CustomInput className={styles.input}
                                         defaultValue={customer ? customer.companyNumber : ''}
                                         onChange={value => handleChange('companyNumber', value)}
                                         type="number"
                            />
                        </div>
                        <div className={styles.rowData}>
                            <span>Tax Identification Number</span>
                            <CustomInput className={styles.input}
                                         defaultValue={customer ? customer.nip : ''}
                                         onChange={value => handleChange('nip', value)}
                                         type="text"
                            />
                        </div>
                        <div className={styles.rowData}>
                            <span>Description</span>
                            <CustomInput className={styles.input}
                                         defaultValue={customer ? customer.description : ''}
                                         onChange={value => handleChange('description', value)}
                                         type="text"
                            />
                        </div>
                    </div>
                    <div>
                        <h6>Representative</h6>
                        <div className={styles.rowData}>
                            <span>First Name</span>
                            <CustomInput className={styles.input}
                                         defaultValue={customer ? customer.Person.firstName : ''}
                                         type="text"
                                         onChange={value => handleChange('firstName', value)}
                            />
                        </div>
                        <div className={styles.rowData}>
                            <span>Last Name</span>
                            <CustomInput className={styles.input}
                                         defaultValue={customer ? customer.Person.lastName : ''}
                                         type="text"
                                         onChange={value => handleChange('lastName', value)}
                            />
                        </div>
                        <div className={styles.rowData}>
                            <span>Email</span>
                            <CustomInput className={styles.input}
                                         defaultValue={customer ? customer.Person.email : ''}
                                         type="text"
                                         onChange={value => handleChange('email', value)}
                            />
                        </div>
                        <div className={styles.rowData}>
                            <span>Phone Number</span>
                            <CustomInput className={styles.input}
                                         defaultValue={customer ? customer.Person.phoneNumber : ''}
                                         type="text"
                                         onChange={value => handleChange('phoneNumber', value)}
                            />
                        </div>
                    </div>
                    <div>
                        <h6>Address</h6>
                        <div className={styles.rowData}>
                            <span>Country</span>
                            <CustomInput className={styles.input}
                                         defaultValue={customer ? customer.country : ''}
                                         onChange={value => handleChange('country', value)}
                                         type="text"
                            />
                        </div>
                        <div className={styles.rowData}>
                            <span>City</span>
                            <CustomInput className={styles.input}
                                         defaultValue={customer ? customer.city : ''}
                                         onChange={value => handleChange('city', value)}
                                         type="text"
                            />
                        </div>
                        <div className={styles.rowData}>
                            <span>Address</span>
                            <CustomInput className={styles.input}
                                         defaultValue={customer ? customer.address : ''}
                                         onChange={value => handleChange('address', value)}
                                         type="text"
                            />
                        </div>
                        <div className={styles.rowData}>
                            <span>Postal-Code</span>
                            <CustomInput className={styles.input}
                                         defaultValue={customer ? customer.postalCode : ''}
                                         onChange={value => handleChange('postalCode', value)}
                                         type="text"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.buttonsContainer}>
                    <Button onClick={handleClosePopup} label={"Cancel"}/>
                    <Button onClick={handleSubmitPopup} label={"Submit"}/>

                </div>
            </div>
        </div>
    )

}
export default AddCustomerPopup;