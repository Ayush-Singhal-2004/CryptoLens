import axios from "axios";
import {ServerConfig} from '../config/serverConfig';

export const error = {
    success: false,
    message: 'Something went wrong',
    data: {},
    error: {}
}

export const success = {
    success: true,
    message: 'Successfully completed the request',
    data: {},
    error: {}
}

export async function postRequest(endpoint: string,Address_hash:string,filter:string="",type:string="")
{
    try {
        let url=`${ServerConfig.apiUrl}/${endpoint}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const data = {
            "address_hash":Address_hash,
            "filter":filter,
            "type":type
        }; 
        const response = await axios.post(url, data, config).then(function (response) {
            return response.data;
        }).catch((err)=>{
            console.log(err);
            return err
        });
        return response
    } catch (error) {
        console.error(error)
        return error
    }
}