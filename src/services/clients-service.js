import axios from 'axios';
export const insertClient = async (client) => {
    try {
        const response = await axios.post('http://localhost:9000/slim4-crud/api/client/insert', client, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const getClients = async (params) => {
    try {
        const response = await axios.post('http://localhost:9000/slim4-crud/api/client/getAll',params,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const updateClient = async (client) => {
    try {
        const response = await axios.post('http://localhost:9000/slim4-crud/api/client/update', client,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}   
export const delClient = async (client) => {
    try {
        const response = await axios.post('http://localhost:9000/slim4-crud/api/client/delete', client,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}