import axios from "axios";
import {getCookie} from "cookies-next";

export const postFile = async (file, companyId) => {

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(process.env.API_URL + `uploadFile/${companyId}`, formData, {
        headers: {
            'Authorization': `Bearer ${getCookie("accToken")}`
        }
    });

    return response.data;

}