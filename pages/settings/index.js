import React from "react";
import withLayout from "../components/layout/withLayout";
import Card from "../components/util/card/card";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styles from "./settings.module.css";
import Link from "next/link";
import {useRouter} from "next/router";
import {getCookie} from "cookies-next";
import TabPanel from "./tabPanel";
import CompanyData from "./companyData";
import AccountData from "./accountData";
import Accounts from "./accounts";


const Settings = () => {

    const [value, setValue] = React.useState(0);
    const [userPermissions, setUserPermissions] = React.useState([]);

    React.useEffect(() => {
        const userPermissions = JSON.parse(getCookie("roles"));
        setUserPermissions(userPermissions);
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const router = useRouter();
    const onClick = async () => {
        await router.push("/");
    }

    return (<Card>
        <div>
            <Link href={"/"} passHref>
                <div className={styles.backToInvoices}>
                    <img className={styles.img} src="/arrowLeft.svg" alt={"arrowBack"}/>
                    <button onClick={onClick} className={styles.buttonWithImg}>Back to Invoices</button>
                </div>
            </Link>
            <div className={styles.headers}>
                <h1>Settings</h1>
            </div>
            <hr className={styles.hr}/>
            <Box sx={{display: 'flex', height: 224, alignItems: 'flex-start'}}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{
                        borderRight: 1,
                        borderColor: 'divider',
                        fontFamily: `-apple-system, "San Francisco", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;`,
                    }}
                >
                    <Tab label="Company's Data"/>
                    <Tab label="Account Data"/>
                    <Tab label="Invoice form"/>
                    {/*{userPermissions.some((permission) => permission === "PERMISSION_ADMIN") && <>*/}
                        <Tab label="Accounts"/>
                        <Tab label="Permissions"/>
                    {/*</>}*/}
                </Tabs>
                <TabPanel value={value} index={0}>
                    <CompanyData userPermissions={userPermissions}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AccountData/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Invoice form Content
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Accounts/>
                </TabPanel>

                <TabPanel value={value} index={4}>
                    Permissions Content
                </TabPanel>

            </Box>
        </div>
    </Card>)
}

export default withLayout(Settings);