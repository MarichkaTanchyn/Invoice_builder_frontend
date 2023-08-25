import {useState} from "react";
import * as React from "react";

const EditableCell = ({
                          value: initialValue,
                          row: {index},
                          column: {id},
                          updateMyData,
                      }) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        updateMyData(index, id, value);
    };

    return <input value={value} onChange={onChange} onBlur={onBlur}/>;
};

const ReadOnlyCell = ({value}) => <>{value}</>;

export {EditableCell, ReadOnlyCell};