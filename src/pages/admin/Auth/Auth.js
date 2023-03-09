//import React, {useState} from 'react'
import {Tab} from "semantic-ui-react"
import {RegisterForm, LoginForm} from "../../../components/Admin/Auth"
import {Icon} from "../../../assets"
import "./Auth.scss"
import { useState } from "react"

export function Auth  ()  {
  //CREA UN ESTADO VACIO PARA VALIDAR CUAL SE ENCUENTERA ACTIVO
  const [activeIndex, setactiveIndex] = useState(0);

  const openLogin =()=> setactiveIndex(0);
  const panes=[

    {
      menuItem:"Entrar",
      render:()=>(
      <Tab.Pane>
          <LoginForm/>
      </Tab.Pane>
      ) 
    },
    {
      menuItem:"Nuevo Usuario",
      render:()=>(
        <Tab.Pane>
          <RegisterForm  openLogin={openLogin}/>
        
      </Tab.Pane>
      ) 
    }
  ]
  return (
    
    <div className="auth">
      <Icon.LogoWhite className="logo"/>

       <Tab panes ={panes} className="auth__forms" activeIndex={activeIndex} onTabChange={(_, data)=>setactiveIndex(data.activeIndex)}/>
    </div>
  )
}
