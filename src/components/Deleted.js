import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from './Header'
import Aos from 'aos'
import 'aos/dist/aos.css'
export default function Deleted() {
  let navigate=useNavigate()
  let taskURL = 'http://localhost:8000/task/all/'
  let updatetaskskURL = 'http://localhost:8000/task/update/'
  let deletetaskskURL = 'http://localhost:8000/task/delete/'
  const [taskData, settaskData] = useState()
  const myLogState=useSelector((state)=>state.changeLogState)
  const headers= {  'Content-Type':'application/json'}
  React.useEffect(() => {
    Aos.init({duration:1500});
  }, [])
  useEffect(() => {
    headers['auth-token']=myLogState.token
    axios(
      {
          method: 'get',
          url:taskURL,
          headers:headers 
      }
  ).then((res) => {
      console.log('res',res)
      settaskData(res.data)
   

  })
  .catch(({ response }) => { 
      console.log(response.data);  
      
      
  })
    return () => {
    }
  }, [])
  const [error, seterror] = useState('')
  const deleteing=(task)=>{
    var newtaskData= taskData.filter(t=>t._id!==task._id)
    settaskData(newtaskData)
    headers['auth-token']=myLogState.token
    task['trash']=false
        axios(
            {
                method: 'patch',
                url:updatetaskskURL+task._id+'/',
                data: task,
                headers:headers 
            }
        ).then((res) => {
            console.log('res',res.data)
            // navigate('/')

        })
        .catch(({ response }) => { 
            console.log(response.data);  
            seterror(response.data )
            
        })

  }
  const deletepermanent=(task)=>{
    var newtaskData= taskData.filter(t=>t._id!==task._id)
    settaskData(newtaskData)
    headers['auth-token']=myLogState.token
    axios(
        {
            method: 'delete',
            url:deletetaskskURL+task._id,
            data: task,
            headers:headers 
        }
    ).then((res) => {
        console.log('res',res.data)
        // navigate('/')

    })
    .catch(({ response }) => { 
        console.log(response.data);  
        seterror(response.data )
        
    })
  }
  return (<>
       <div className='home'>
           <Header/>
   {taskData?.map((task,i)=>(<>
    {(task.trash)?(<>
    
    
      <div className='tile' data-aos="fade-up"  key={i} style={(!task.activeStatus)?{borderColor:"gray"}:{borderColor:"green"}} >
     <p className='tile_heading' >{task.title}</p>
     <p className='tile_about' >{task.content} </p>
     <div className='tile_bottum'>
       <div className='tile_status'>Status: <span>{task.activeStatus?("acitve"):("completed")} </span> </div>
       <div className='tile_option' >
       <p onClick={()=>deleteing(task)} >Restore</p>
       <p onClick={()=>deletepermanent(task)} >Delete Permanently</p>
     </div>
     </div>
     
     </div>
    </>):""}
   </>
     
    
   ))}
   


   </div>
  </>

 
  )
}