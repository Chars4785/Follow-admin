const defaultHeaders = {
    Accept: 'aplication/json',
    'Content-Type': 'application/json',
};
let authInfo;
export default class GlobalDataManager {
    static setAuthInfo(auth){
        authInfo = auth
    }
    static getHeaders(){
        const headers = { ...defaultHeaders };
        if ( authInfo && authInfo.accessToken ) {
            headers.authorization = `Bearer ${ authInfo.accessToken }`;
        }
        return headers;
    }

}