import SelectWithLabel from "../../components/util/filter/selectWithLabel";
import styles from "./settings.module.css";
import Button from "../../components/util/button/button";
import permissions from "../../components/data/permissions";

const ModifyPermissionsPopup = ({user, handleClose, handleSubmit, selectedPermissions, setSelectedPermissions}) => {

    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    return (<div className={styles.popupBox} onClick={handleClose}>
            <div className={styles.headersPopup} onClick={handlePopupClick}>
                <div className={styles.popupBody}>
                    <h4>Modify Permissions</h4>
                    <div className={styles.center}>
                        <div className={styles.userCell}>
                            {user && user.Person && <>
                                <span>{user.Person.firstName}</span>
                                <span>{user.Person.lastName}</span>
                            </> }
                        </div>
                        <SelectWithLabel
                            options={permissions}
                            value={selectedPermissions}
                            onChange={setSelectedPermissions}
                            placeholder={"Permissions"}
                            isMulti={true}
                            label={"Permissions"}/>

                    </div>
                </div>
                <div className={styles.popupButtons}>
                    <Button onClick={handleClose} label={"Cancel"}></Button>
                    <Button onClick={handleSubmit} label={"Submit"}></Button>
                </div>
            </div>
        </div>);

}
export default ModifyPermissionsPopup;