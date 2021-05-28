import request from '../../../../common/api/request'
import NetworkConfig from '../../../../config/NetworkConfig';

export default class DataManager {
    static async createAccountAction( body ) {
        try{
            const response = await request({
                method: 'POST',
                url: `${ NetworkConfig.AUTH_URL }/createAccount`,
                data: body,
            });
            return response;
        }catch( e ){
            return {
                error:true,
                message:e
            }
        }
    }
    
    static signIn = async(value) =>{
        try {
            const { data } = await request({
                url: `${NetworkConfig.AUTH_URL}/account`,
                method: 'POST',
                data: value
            });
            return data;
        } catch ({ response }) {
            // const { data, status } = response;
            return {
                // message: data.message,
                // code: status,
                error: true,
            };
        }
    }

    static getUsersList = async(value) =>{
        try {
            const data = await request({
                url: `${NetworkConfig.AUTH_URL}/user/users`,
                method: 'GET',
                params: value
            });
            return data;
        } catch ({ response }) {
            // const { data, status } = response;
            return {
                // message: data & data.message,
                // code: status,
                error: true,
            };
        }
    }

    static getUserInfo = async( query ) =>{
        try {
            const data = await request({
                url: `${NetworkConfig.AUTH_URL}/user/userInfo`,
                method: 'GET',
                params: query
            });
            return data;
        } catch ({ response }) {
            const { data, status } = response;
            return {
                message: data.message,
                code: status,
                error: true,
            };
        }
    }
}