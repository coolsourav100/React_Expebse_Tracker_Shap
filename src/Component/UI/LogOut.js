import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authAction } from '../Store/AuthReducer'

const LogOut = () => {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOutHandler=(e)=>{
        dispatch(authAction.tokenUpdater(''))
        dispatch(authAction.LogOut)
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