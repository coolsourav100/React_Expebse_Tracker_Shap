import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogOut = () => {
    const navigate = useNavigate()
    const logOutHandler=(e)=>{
        localStorage.removeItem('token')
        window.alert('Log Out Succefully')
        navigate('/')
    }
  return (
    <div>
        <button className='btn btn-outline-dark' onClick={logOutHandler}>Log Out</button>
    </div>
  )
}

export default LogOut