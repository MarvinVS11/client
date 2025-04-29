import React, { useState } from 'react';
import {Image, Button, Icon, Confirm} from "semantic-ui-react";
import {BasicModal} from "../../../Shared";
import {CourseForm} from "../CourseForm";
import {ENV} from "../../../../utils";
import "./CourseItem.scss";

export  function CourseItem(props) {
    const {course, onReload} = props; 
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const onOpenCloseModal = ()=>setShowModal((prevState)=>!prevState);
    const openUpdateCourse =() =>{
        setTitleModal(`Actualizar ${course.title}`);
        onOpenCloseModal();
    }

  return (
    <>
        <div className='course-item'>
            <div className='course-item__info'>
                <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
                <div>
                    <p>{course.title}</p>
                </div>
            </div>
            <div>
                <Button icon as="a" href={course.url} target ="_blank">
                    <Icon name="eye"/>                     
                </Button> 
                <Button icon primary  onClick = {openUpdateCourse}>
                    <Icon name='pencil'/>
                </Button>
                <Button icon color='red'>
                    <Icon name='trash'/>
                </Button>
            </div>
        </div>
        <BasicModal show = {showModal} close ={onOpenCloseModal} title={titleModal}>
            <CourseForm
                onClose={onOpenCloseModal}
                onReload={onReload}
                course={course}
            />
        </BasicModal>
    </>
  )
}
