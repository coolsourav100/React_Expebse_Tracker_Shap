import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const UpdateProfilePage = (props) => {
    const authData = useSelector((state)=>state.auth)
    
    
    const [fullName , setFullName] = useState('')
    const [imgurl , setImgurl] = useState('')
    const [verifyEmail , setVerifyEmail] = useState(false)
    
    useEffect(()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDKk-EwRrMKKHBYl4L-cqXdab47ev2cetw',{
            method:'POST',
            body:JSON.stringify({idToken:authData.token})
        }).then((res)=>res.json())
        .then((res)=>{
            console.log(res,'update')
            setFullName(res.users[0].displayName)
            setImgurl(res.users[0].photoUrl)
            setVerifyEmail(res.users[0].emailVerified)
        })
        
    },[])


    const updateHandler =(e)=>{
        // console.log(localStorage.getItem('token'))
        e.preventDefault();
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDKk-EwRrMKKHBYl4L-cqXdab47ev2cetw',{
            method:'POST',
            body: JSON.stringify({idToken :authData.token,displayName:fullName , photoUrl:imgurl ,returnSecureToken: true }) ,
            headers:{
                'Content-Type': 'application/json' 
            }
        
        }).then(res=>{
            if(res.ok){
              return res.json()
            }else{
              return res.json().then((data)=>window.alert(data.error.message))
            }
          })
        .then((res)=>{
            window.alert('Profile has been Updated Succesfully')
            // console.log(res)
        })
        props.addToggle()
        props.addEmailVerify(verifyEmail)

    }
  return (
    <div className='container mt-4'>
        <form className='form' onSubmit={updateHandler}>
            <div className='row'>
                <div className='col-md-4 d-flex'>
                <div>
                <label className='form-label'>Full Name</label>
                </div>
                <div>
                <input type='text' className='form form-control ms-4' value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
                </div>
                </div>
                <div className='col-5 d-flex'>
                    <div>
                <label className='form-label'>Profile Photo URL</label>
                </div>
                <div>
                <input type='url' className='form form-control ms-4' value={imgurl} onChange={(e)=>setImgurl(e.target.value)}/>
                </div>
                </div>
                <button type='submit' className='btn btn-primary col-2'>Update</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateProfilePage