import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux';
import {logedIn,logedOut} from '../actions/index'
import { Link ,useNavigate} from "react-router-dom";
import Aos from 'aos'
import 'aos/dist/aos.css'
export default function Login() {
    let loginURL = 'http://localhost:8000/user/login/'
    const headers= {  'Content-Type':'application/json'}
    let navigate=useNavigate()
    const myLogState=useSelector((state)=>state.changeLogState)
    const dispatch= useDispatch()
    const [state, setstate] = useState({
        email: '',
        password: "",
        err: null
    })

    React.useEffect(() => {
        Aos.init({duration:1500});
      }, [])
    const handleChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setstate({ ...state, ["err"]:null})
     
            const data = {
                email: state.email,
                password: state.password,    
            }
            console.log(data)
            axios(
                {
                    method: 'post',
                    url:loginURL,
                    data: data,
                    headers:headers 
                }
            ).then((res) => {
                console.log('res',res)
                const token=res.data['auth-token']
                dispatch(logedIn({'token':token}))
                console.log(myLogState)
                navigate('/')

            })
            .catch(({ response }) => { 
                console.log(response.data);  
                setstate({ ...state, ["err"]:response.data })
                
            })
        
    }
  return (

    <div className='signup' data-aos="fade-up">
            <div className='signup_box'>
                <p className='signup_heading'>Login</p>
                <div className='signup_form' >
                    <form onSubmit={handleSubmit}>

                        <label>Email</label>
                        <input type='email' onChange={handleChange}  name='email' />
                        <label>Password</label>
                        <input type='password'  onChange={handleChange}  name='password' />
                        <p className='err_msg'> {state.err?(<>
                        {state.err}</>):""}</p>

                        
                        <button className='submit'>Login</button>
                    </form>


                </div>
                <button className='submit'>
                    <Link  to="/signup"> Signup</Link>
                   </button>
            </div>
        </div>
  )
}
