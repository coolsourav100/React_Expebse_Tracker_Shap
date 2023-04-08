import React from 'react'
import classes from './Emailverify.module.css'
import { useSelector } from 'react-redux'
const Emailverify = () => {
const authData = useSelector((state)=>state.auth)
    const emailverifyHandler=async(e)=>{
           e.preventDefault();
            await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDKk-EwRrMKKHBYl4L-cqXdab47ev2cetw',{
                method:'POST',
                body:JSON.stringify({requestType:"VERIFY_EMAIL", idToken:authData.token}),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res=>{
              if(res.ok){
                return res.json()
              }else{
                return res.json().then((data)=>window.alert(data.error.message))
              }})
            .then((res)=>{
                console.log(res,'email res')
                window.alert('Email Veification Link Has been Sent')
            })
    }
  return (
    <div className='container mt-4'>
   <section className="card">
  <h5 className="card-header d-flex justify-content-center">Verify E-mail</h5>
  <div className="card-body">
    <h5 className="card-title d-flex justify-content-center">Welcome to the Alpha Expence Tracker</h5>
    <p className="card-text d-flex justify-content-center">Kindly Verify your email and be with us ...</p>
    <button href="#" className="btn btn-primary d-flex justify-content-between" onClick={emailverifyHandler}>verify</button>
  </div>
</section>
    </div>
  )
}

export default Emailverify