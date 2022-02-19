import React from 'react'
import Header from './Header'
import Task from './Task'
import CreateTask from './CreateTask'
import EditTask from './EditTask'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
export default function Home() {
  return (
    <div className='home'>
      <Header/>
        <div>
       <Task/>
        </div>
    </div>
  )
}
