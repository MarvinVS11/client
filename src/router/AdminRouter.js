import React from 'react'
import {Routes, Route} from 'react-router-dom';
import{map} from 'lodash'
import {AdminLayout} from '../layouts'
import {Auth, Users, Blog, Courses, Menu, Newsletter} from "../pages/admin";
import {useAuth} from "../hooks"
 
export function AdminRouter ()  {
    const {user}=useAuth();
    const loadLayout = (Layout, Page)=>{
        return(
            <Layout>
                <Page/>
            </Layout>
        )
    }
  return ( 
    <Routes>
        {!user ?(
            //mapeo de rutas para dos paths distintos en un mismo path
            <Route path="/admin/*" element={<Auth/>}/> //Sino esta autenticado se redirige aca
            ):(
                <>
                {["/admin", "/admin/blog"].map((path)=>(
                    <Route key={path}
                     path={path}
                     element={loadLayout(AdminLayout, Blog)}/>

                ))}
                <Route path="/admin/users" element={loadLayout(AdminLayout, Users)}/>
                <Route path="/admin/courses" element={loadLayout(AdminLayout, Courses)}/>
                <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)}/>
                <Route path="/admin/newsletter" element={loadLayout(AdminLayout, Newsletter)}/>
                </>
            )}

    </Routes>
   )
}
