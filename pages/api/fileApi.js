import axios from "axios";

export const postFile = async (file, companyId) => {

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`http://localhost:3000/uploadFile/${companyId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;

}