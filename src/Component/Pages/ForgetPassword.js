import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import img from '../../Assets/forgetpassword.jpg'

const ForgetPassword = () => {
    const [ enteremail , setEnterEmail] = useState('')
    const forgetpasswordHandler=async(e)=>{
        e.preventDefault();
        await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDKk-EwRrMKKHBYl4L-cqXdab47ev2cetw',{
            method:'POST',
            body:JSON.stringify({email:enteremail , requestType:"PASSWORD_RESET"}),
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
            console.log(res, 'password Reset')
            window.alert('PassWord Reset Link Send Successfully !  Cheak Your mail')
        }).catch(err=>window.alert(err))
    }
  return (
    <div>
        <section className="vh-100">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black rounded">
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
  
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Password Reset</p>
  
                  <form className="mx-1 mx-md-4" onSubmit={forgetpasswordHandler}>
  
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input type="email" id="form3Example3c" className="form-control" value={enteremail} onChange={(e)=>setEnterEmail(e.target.value)} required/>
                        <label className="form-label" for="form3Example3c">Your Email</label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" className="btn btn-primary btn-lg">Reset Password</button>
                    </div>
  
                  </form>
                  <div className="form-check d-flex justify-content-center mb-5">
                      {/* <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" /> */}
                      <label className="form-check-label" for="form2Example3">
                        <Link to='/'>Go to the LogIn Page</Link>
                      </label>
                    </div>
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
  
                  <img src={img}
                    className="img-fluid" alt="Sample image"/>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>
  )
}

export default ForgetPassword