import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux';
import {logedIn,logedOut} from '../actions/index'
import { Link ,useNavigate} from "react-router-dom";
import Header from "./Header";
import Aos from 'aos'
import 'aos/dist/aos.css'
export default function CreateTask() {
    React.useEffect(() => {
        Aos.init({duration:1500});
      }, [])
    let createtaskskURL = 'http://localhost:8000/task/create/'
    const myLogState=useSelector((state)=>state.changeLogState)
    const headers= {  'Content-Type':'application/json'}
    headers['auth-token']=myLogState.token
    let navigate=useNavigate()
    const dispatch= useDispatch()
    const [state, setstate] = useState({
        title: '',
        content: "",
        err: null
    })

    const handleChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setstate({ ...state, ["err"]:null})
     
            const data = {
                title: state.title,
                content: state.content,    
            }
            console.log(data)
            axios(
                {
                    method: 'post',
                    url:createtaskskURL,
                    data: data,
                    headers:headers 
                }
            ).then((res) => {
                console.log('res',res)
                navigate('/')

            })
            .catch(({ response }) => { 
                console.log(response.data);  
                setstate({ ...state, ["err"]:response.data })
                
            })
        
    }
  return (
    <div className='home'>
      <Header/>
    <div className='signup' data-aos="fade-up">
            <div className='signup_box'>
                <p className='signup_heading'>Create New Task</p>
                <div className='signup_form' >
                    <form onSubmit={handleSubmit}>

                        <label>Title</label>
                        <input type='text' onChange={handleChange}  name='title' />
                        <label>About</label>
                        <input type='text'  onChange={handleChange}  name='content' />
                        <p className='err_msg'> {state.err?(<>
                        {state.err}</>):""}</p>

                        
                        <button className='submit'>Submit</button>
                    </form>


                </div>
            </div>
        </div>
        </div>
        
  )
}
