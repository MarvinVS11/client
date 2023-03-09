import {ENV}from '../utils'

export class Auth{
    baseApi = ENV.BASE_API;

        //Recibe datos del formulario
    async register(data){
        try {
            const url=`${this.baseApi}/${ENV.API_ROUTES.REGISTER}`;
            console.log(url)
            const params ={
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    email:data.email,
                    password:data.password
                }),
            };
            console.log(params)
        //     //Se ejecuta la peticion
            const response = await fetch(url, params);
            //const response = await fetch(url, null);
           const result = await response.json();
        //  console.log(response.status)
        //  console.log(response)

        //    // Se valida si hubo algun error
              if(response.status !== 200) throw result;
              return result;
            
        } catch (error) {
            throw error;
            
        }
    }
    async login(data){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`
            const params={
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error
        }
    }
    //***Refrescamos el token ****
    async refreshAccessToken(refreshToken){
        try {
            const url =`${this.baseApi}/${ENV.API_ROUTES.REFRES_ACCESS_TOKEN}`;
            const params ={
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                        token:refreshToken,
                    }),
                
            };

            const response= await fetch(url, params);
            const result = await response.json();

            if(response.status!==200) throw result;
            
            return result;
        } catch (error) {
         throw error;   
        }
    }
 //****

    setAccessToken (token){
        localStorage.setItem(ENV.JWT.ACCESS, token );
    }

    getAccessToken(){
        return localStorage.getItem(ENV.JWT.ACCESS);
    }
    setRefreshToken(token){
        localStorage.setItem(ENV.JWT.REFRESH, token);
    }
    
    getRefreshToken(){
        return localStorage.getItem(ENV.JWT.REFRESH);
    }
    removeTokens(){
        localStorage.removeItem(ENV.JWT.ACCESS);
        localStorage.removeItem(ENV.JWT.REFRESH);
    }
}