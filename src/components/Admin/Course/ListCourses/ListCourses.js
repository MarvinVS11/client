import React,{useState, useEffect} from 'react'
import {Loader, Pagination} from "semantic-ui-react"
import {size, map} from "lodash";
import {CourseItem} from "../CourseItem"
import {Course} from "../../../../api";
import "./ListCourses.scss"

const courseController = new Course();

export function ListCourses(props) {
const {reload, onReload} =  props;
const [courses, setCourses] = useState(false)
const [page, setPage] = useState(1);
const [pagination, setPagination] = useState()

useEffect(() =>{
    (async() =>{
        try {
            const response = await courseController.getCourses({page, limit: 5});
            console.log(response)
            setCourses(response.docs)
            setPagination({
              limit: response.limit,
              page: response.page,
              pages: response.pages,
              total: response.total
            });
        } catch (error) {
            console.log(error);
        }
    })();
}, [page, reload]);

const changePage=(_, data)=>{
  console.log(data)
  setPage(data.activePage)
}

if(!courses) return <Loader  active inline="centered"/>;
if(size(courses)=== 0 ) return "No hay ningun curso";

  return (
    <div className="list-courses">
       {map(courses,(course)=>(
        <CourseItem key ={course._id} course={course} onReload={onReload}/>
       ))}
       <div className="list-courses__pagination">
        <Pagination
        totalPages={pagination.pages}
        defaultActivePage={pagination.page}
        ellipsisItem={null}
        firstItem={null}
        lastItem ={null}
        onPageChange={changePage}
        />
       </div>
    </div>
  )
}
