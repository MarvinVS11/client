import React,{useState, useEffect} from 'react'
import {Loader} from "semantic-ui-react"
import {size, map} from "lodash";
import {CourseItem} from "../CourseItem"
import {Course} from "../../../../api";

const courseController = new Course();

export  function ListCourses() {
const [courses, setCourses] = useState(false)

useEffect(() =>{
    (async() =>{
        try {
            const response = await courseController.getCourses()
            setCourses(response.docs)
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    })()
}, []);

if(!courses) return <Loader  active inline="centered"/>;
if(size(courses)=== 0 ) return "No hay nungun curso";

  return (
    <div>
       {map(courses,(course)=>(
        <CourseItem key ={course._id} course={course}/>
       ))}
       <div>
        {/*A;adir paginacion */}
       </div>
    </div>
  )
}
