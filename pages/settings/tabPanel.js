import Box from "@mui/material/Box";
import React from "react";

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (<div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        {...other}
    >
        {value === index && (<Box sx={{p: 3}}>
            {children}
        </Box>)}
    </div>);
}

export default TabPanel;
