import axios from "axios";

async function getResponse(route:string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${route}`;
        const response = await axios.get(url);
        return {
            status: 200,
            data: response.data
        } 
    }
    catch(error) {
        return {
            status: 400,
            error: error
        };
    }
}

export default getResponse;