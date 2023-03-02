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
}