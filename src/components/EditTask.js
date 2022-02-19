import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux';
import {logedIn,logedOut} from '../actions/index'
import { Link ,useNavigate,useParams} from "react-router-dom";
import Header from "./Header";
import Switch from "react-switch";
import Aos from 'aos'
import 'aos/dist/aos.css'
export default function EditTask() {
  React.useEffect(() => {
    Aos.init({duration:1500});
  }, [])
  let { id } = useParams();
  let updatetaskskURL = 'http://localhost:8000/task/update/'
  let gettaskskURL = 'http://localhost:8000/task/details/'
  const myLogState=useSelector((state)=>state.changeLogState)
  const headers= {  'Content-Type':'application/json'}
  headers['auth-token']=myLogState.token
  let navigate=useNavigate()
  const dispatch= useDispatch()
  const [taskData, settaskData] = useState()
  const [state, setstate] = useState({
      err: null
  })

  useEffect(() => {
    headers['auth-token']=myLogState.token
    axios(
      {
          method: 'get',
          url:gettaskskURL+id,
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


  const handleChange = (e) => {
    settaskData({ ...taskData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(taskData)
      setstate({ ...state, ["err"]:null})
          axios(
              {
                  method: 'patch',
                  url:updatetaskskURL+taskData._id+'/',
                  data: taskData,
                  headers:headers 
              }
          ).then((res) => {
              // console.log('res',res.data)
              navigate('/')

          })
          .catch(({ response }) => { 
              // console.log(response.data);  
              setstate({ ...state, ["err"]:response.data })
              
          })
      
  }
  const handleChangebool=(e)=>{
    console.log(e)
    settaskData({ ...taskData, ['activeStatus']: e })
  }
  return (
    <div className='home'>
    <Header/>
  <div className='signup'>
    {taskData?(<>
      <div data-aos="fade-up" className='signup_box'>
              <p className='signup_heading'>Edit Task</p>
              <div className='signup_form' >
                  <form onSubmit={handleSubmit}>

                      <label>Title</label>
                      <input type='text' onChange={handleChange}  name='title' value={taskData.title} />
                      <label>About</label>
                      <input type='text'  onChange={handleChange} value={taskData.content}  name='content' />
                      <label className='booleninput'>Status : 
                      <Switch onChange={handleChangebool}  name='activeStatus' checked={taskData.activeStatus} />
                        <span>{taskData.activeStatus?("acitve"):("completed")} </span> 

                      </label>
    
                      <p className='err_msg'> {state.err?(<>
                      {state.err}</>):""}</p>

                      
                      <button className='submit'>Submit</button>
                  </form>
              </div>
          </div></>):""}
      </div>
      </div>
  )
}
