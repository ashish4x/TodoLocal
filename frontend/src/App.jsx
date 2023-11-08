import React from 'react'
import './App.css'
import TodoPage from './TodoPage'
import NewUser from './components/NewUser'
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<NewUser/>}/>
      <Route path="/:todoId" element={<TodoPage/>} />
      <Route path="/:todoId/login" element={<Login/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App