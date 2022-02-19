import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux';
import {logedIn,logedOut} from '../actions/index'
import { Link, useNavigate} from 'react-router-dom';
import Aos from 'aos'
import 'aos/dist/aos.css'
export default function Signup() {
   let navigate= useNavigate()
    let signupURL = 'http://localhost:8000/user/signup/'
    const headers= {  'Content-Type':'application/json'}
    const myLogState=useSelector((state)=>state.changeLogState)
    const dispatch= useDispatch()
    const [state, setstate] = useState({
        email: '',
        password: "",
        password2: "",
        username: "",
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
        if (state.password !== state.password2) {
            setstate({ ...state, ["err"]: "password didn't match" })
            console.log(state)
        } else {
            const data = {
                username: state.username,
                email: state.email,
                password: state.password,
              
            }
            console.log(data)
            axios(
                {
                    method: 'post',
                    url:signupURL,
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
    }
    return (
        <div className='signup'>
            <div className='signup_box'>
                <p className='signup_heading'>Sign Up</p>
                <div className='signup_form' >
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input name='username' onChange={handleChange} type='text' />
                        <label>Email</label>
                        <input type='email' onChange={handleChange}  name='email' />
                        <label>Password</label>
                        <input type='password'  onChange={handleChange}  name='password' />
                        <label>Confirm Password</label>
                        <input type='password' onChange={handleChange} name='password2' />
                        <p className='err_msg'> {state.err?(<>
                        {state.err}</>):""}</p>

                        
                        <button className='submit'>Submit</button>
                    </form>


                </div>
                <button className='submit'>
                <Link  to="/login">Login</Link>
                </button>
            </div>
        </div>
    )
}
