import React,{useState,useEffect} from 'react'
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux';
import {logedIn,logedOut,lightTheme,darkTheme} from '../actions/index'
export default function Header() {
  let navigate=useNavigate();
  let logoutURL = 'http://localhost:8000/user/logout'
  const myLogState=useSelector((state)=>state.changeLogState)
  const myThemeState=useSelector((state)=>state.changeThemeState)
  const dispatch= useDispatch()
  
  const [themeType, setthemeType] = useState()
  useEffect(() => {
    if(!myLogState.login){
      navigate('/login')
    }
    if (myThemeState.color==='#ffffff'){
      setthemeType('Light')
    }else{
      setthemeType("Dark")
    }
  
    return () => {
     
    }
  }, [])
  const changetheme=()=>{
    if(themeType==='Light'){
      dispatch(lightTheme())
      setthemeType('Dark')
    }else{
      dispatch(darkTheme())
      setthemeType('Light')
    }
   
  }
  const headers= {  'Content-Type':'application/json'}
  const logouting=()=>{
    headers['auth-token']=myLogState.token
    dispatch(logedOut())
    axios(
      {
          method: 'get',
          url:logoutURL,
          headers:headers 
      }
  ).then((res) => {
      console.log('res',res.data)
      navigate('/login')

  })
  .catch(({ response }) => { 
      console.log(response.data);  
      // seterror(response.data )
      
  })
  }
  return (
   
    <div className='header'>
      <div className='stats'>
        <p onClick={()=>navigate("/deleted")}>Deleted Tasks</p>
        <p onClick={()=>changetheme()}>{themeType} Theme</p>
      </div>
      <div onClick={()=>navigate("/")} className='heading'>
          <p>To Do App</p>
      </div>
      <div className='header_options'>
        <div className='create_new' onClick={()=>navigate("/createtask")}>Create New Task</div>
       
        <div className='logout' onClick={()=>logouting()}>Logout</div>
      </div>
        
  </div>
  )
}
