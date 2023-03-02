import * as Yup from 'yup';

//Connfiguracion del formulario
export function initialValues(){
    return{
        email:"",
        password:"",
         repeatPassword:"",
        conditionsAccepted: false,

    };
}
//Objeto de validacion del formulario
export function validationSchema(){
    return Yup.object({
        email:Yup.string().email("El email no es valido").required("Campo obligatorio"),
        password:Yup.string().required("Campo obligatorio"),
       repeatPassword:Yup.string().required("Campo obligatorio").oneOf([Yup.ref("password")],"Las contraseñas tienen que ser iguales"),
        conditionsAccepted: Yup.bool().isTrue(true)
    })
}