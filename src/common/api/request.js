import axios from 'axios';
import GlobalDataManager from './GlobalDataManager';
import NetworkConfig from '../../config/NetworkConfig';

let notAuthorizedCallback;
export default async function request(option){
    if ( !option.headers ) {
        //access token
        option.headers = GlobalDataManager.getHeaders();
    }
    try{
        const { data } = await axios( option );
        return data;
    }catch( error ){
        console.log( `Error Api ${ option.url }` )
        const { response, request } = error
        if( notAuthorizedCallback ){
            addAuthorizedCallback();
        }
        if ( response  && response.statusCode === 401){
            const data = await requestNoAuth({
                url:`${NetworkConfig.AUTH_URL}/sign/token`,
                method:'POST',
                data: option.headers
            })
            GlobalDataManager.setAuthInfo(data);
        }
        return request(option)
        // refrash Token 없을때 다시 쏘는 로직 필요 변경 필요
    }
}

export async function requestNoAuth(option){
    try{
        const { data } = await axios(option);
        return data
    }catch(error){
        throw error.response.data
    }
}

// 앱 사이트 같은 경우는 계속 로그인 하도록
const addAuthorizedCallback = (callback) =>{
    notAuthorizedCallback = callback
}