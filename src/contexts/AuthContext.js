import {useState, useEffect, createContext} from "react";
import {User, Auth}from "../api";
import {hasExpiredToken} from "../utils";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

//Se gestiona todo lo que tiene el contexto
export function AuthProvider(props){
    const {children}= props;
const [user, setUser] = useState( null);
const [token, setToken] = useState(null);
const [loading, setLoading] = useState(true)


useEffect(() => {

    (async()=>{
        //Comprobamos si el usuario esta logueado o no
        const accessToken = authController.getAccessToken();
        const refreshToken = authController.getRefreshToken();
       if(!accessToken || !refreshToken){
        logout();
        setLoading(false);
        return;
       }
       //Comprobar que no este caducado
       if(hasExpiredToken(accessToken)){
        //Ha caducado
        if(hasExpiredToken(refreshToken)){
           await logout()
        }else{
            await reLogin(refreshToken);
        }
       }else{
        await login(accessToken)
       }

      //borrar ** await login(accessToken);
       setLoading(false);
    })();
}, []);

const reLogin= async(refreshToken)=>{
    try {
        const {accessToken} = await authController.refreshAccessToken(refreshToken);
        //Modificamos el access token el localStorage
        authController.setAccessToken(accessToken);
        await login(accessToken);
    } catch (error) {
        console.log(error)
        
    }
}

const login= async(accesToken)=>{
 try {
    const response = await userController.getMe(accesToken);
   delete response.password;
     
     setUser(response)
    //Seteamos el token del usuario
    setToken(accesToken);
   // console.log("TOKEN", accesToken);
 } catch (error) {
    console.log(error);
 }
}
const logout=()=>{
    setUser(null);
    setToken(null);
    authController.removeTokens();
}
const data ={
    accesToken:token,
    user,
    login,
    logout
};

if(loading)return null;

//Retornamos el valor o valores que quereamos utilizar en el contexto
return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;


}
