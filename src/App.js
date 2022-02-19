
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import {logedIn,logedOut,lightTheme,darkTheme} from './actions/index'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,

} from "react-router-dom";

import Home from './components/Home';
import Login from './auth/Login'
import Signup from './auth/Signup';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import Header from './components/Header';
import Deleted from './components/Deleted';

function App() {
  let navigate=useNavigate()
  const myLogState=useSelector((state)=>state.changeLogState)
  const myThemeState=useSelector((state)=>state.changeThemeState)
  const dispatch= useDispatch()
  console.log(myThemeState,myLogState)
  const logredirect=()=>{
   if(myLogState.login){
    return  navigate('/', { replace: true })
   }else{
   return navigate('/login', { replace: true })
   }
    }
  return (
        <div className="App" style={myThemeState}>
   <Routes> 
     {myLogState.login?(<>

      <Route path="/" element={<Home />} />
      <Route path="deleted" element={<Deleted />} />
      <Route path="/createtask" element={<CreateTask/>} />
      <Route path="/edittask/:id" element={<EditTask/>} />
      <Route path='*' element={logredirect} />
      </>):
     ( <><Route path="/login" element={<Login/>} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<Login/>} />
      </>)}
    </Routes>
        </div>
  );
}

export default App;
