import React, { useEffect, useState } from 'react';
import classes from './Homepage.module.css'
import UpdateProfilePage from './UpdateProfilePage';
import Emailverify from '../UI/Emailverify';
import LogOut from '../UI/LogOut';

const Homepage = () => {
  const [ toggle,setToggele] = useState(false)
  const [userData , setUserData] = useState(false)
  useEffect(()=>{
   (async()=>await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDKk-EwRrMKKHBYl4L-cqXdab47ev2cetw',{
            method:'POST',
            body:JSON.stringify({idToken:localStorage.getItem('token')})
        }).then((res)=>res.json())
        .then((res)=>{
            if(res.users[0].displayName.length > 0 && res.users[0].photoUrl.length > 0){
              setUserData(true)
            }
        }))();
        return ()=>{}
  },[toggle])
  console.log(toggle ,'toogggggg')
  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1>Welcome to Alpha Expence Tracker</h1>
        <div className='d-flex flex-row-reverse'>
      <LogOut/>
        {!toggle ? <div className={classes.profile}>
        
        <h4 className='me-2 px-2' onClick={()=>setToggele(!toggle)}>{userData ? <span>Edit your Profile</span> : <>Your Profile is incomplete. <span>Complete Now</span></>}</h4>
        </div> : null}
      </div>
      </div>
      
      
      <div className='container'>
      {toggle ? <UpdateProfilePage addToggle={()=>setToggele(!toggle)}/> : null}
      </div>
      <div>

      </div>
      <Emailverify/>
    </>
  )
}

export default Homepage