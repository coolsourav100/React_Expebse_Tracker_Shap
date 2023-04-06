import React, { useState } from 'react';
import classes from './Homepage.module.css'
import UpdateProfilePage from './UpdateProfilePage';

const Homepage = () => {
  const [ toggle,setToggele] = useState(false)
  
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h1>Welcome to Alpha Expence Tracker</h1>
        <div className={classes.profile}>
        <h4 className='me-2' onClick={()=>setToggele(!toggle)}>Your Profile is incomplete. <span>Complete Now</span></h4>
        </div>
      </div>
      <div className='container'>
      {toggle ? <UpdateProfilePage/> : null}
      </div>
    </div>
  )
}

export default Homepage