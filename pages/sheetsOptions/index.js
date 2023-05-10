import React ,{useState} from 'react';
import withLayout from "../components/layout/withLayout";
import Card from "../components/util/card/card";
import styles from "./sheetsOptions.module.css";
import {Radio} from "@nextui-org/react";
import SelectWithLabel from "../components/util/filter/selectWithLabel";
import { getCookie } from 'cookies-next';


const SheetsOptions = () => {

    const [selectedOption, setSelectedOption] = useState("selectedSheet");
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const sheetsData = getCookie('sheetsData');
    // const sh =  JSON.parse(cookies['sheetsData']);
    console.log(sheetsData);

    return (
        <Card customStyle={styles.card}>
            <div>
                <Radio.Group label={"Type"} defaultValue={"selectedSheet"} className={styles.blackRadio}>
                    <Radio value={"selectedSheet"}
                           size={"sm"}
                           onClick={() => {}}>
                        Preprocess only selected sheet
                    </Radio>
                    <Radio value={"newCategoryFromEach"}
                        size={"sm"}
                        onClick={() => {}}>
                        Create new category for each sheet
                    </Radio>
                    <Radio
                        value={"mergeAllToOne"}
                        size={"sm"}
                        onClick={() => {}}>
                        Merge all sheets to one
                    </Radio>
                </Radio.Group>
                {selectedOption === "selectedSheet" && (
                    //select
                    <SelectWithLabel/>
                )}
                <p>JSON Data: {JSON.stringify(sheetsData)}</p>
            </div>
        </Card>
    );

}

export default withLayout(SheetsOptions);