import React, { useEffect, useState } from 'react';
import classes from './Expence.module.css'
import axios from 'axios';

const Expence = () => {
  const [ toggle , setToggle ] = useState(false)
  const [ expenceData , setExpenceData] = useState({category:'',date:'',des:'', amount:0})
  const [resData , setResData] = useState([]);
  const [key , setKey] = useState([])
  let price =0
  
useEffect(()=>{
  (async()=>{
    await axios.get('https://etshapreact-default-rtdb.asia-southeast1.firebasedatabase.app/expence.json')
    .then(res=>{
      console.log(res,'data recived')
    setResData(res.data)
   setKey(Object.keys(res.data))
    })
    .catch(err=>console.log(err))
  })();

  return ()=>{}
},[toggle])

    const changeHandler=(e)=>{
      e.preventDefault();
      setExpenceData({...expenceData,[e.target.name]:e.target.value})
    }

    const submitHandler=async(e)=>{
      e.preventDefault();
      console.log(expenceData)
      await axios.post(`https://etshapreact-default-rtdb.asia-southeast1.firebasedatabase.app/expence.json`,expenceData)
      .then(res=>console.log(res,'expence sent res'))
      .catch(err=>console.log(err, 'expence sent error'))
      setToggle(!toggle)
    }
    console.log(resData)
    // console.log(key,'key')
  return (
    <div>
        <div className='d-flex row'>
            <div className={` ${classes.add} container col-2`}>
                <h4> Add Your Expence</h4>
            <form onSubmit={submitHandler}>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label >Date</label>
      <input type="date" class="form-control" name='date'  placeholder="Date" onChange={changeHandler}/>
    </div>
    <div class="form-group col-md-6">
      <label >CateGory</label>
      <select class="form-control" onChange={changeHandler} name='category'>
        <option>Food</option>
        <option>Petrol</option>
        <option>Transportion</option>
        <option>Room Rent</option>
        <option>Others</option>
      </select>
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Description</label>
    <input type="text" class="form-control" name='des'  placeholder="Description" onChange={changeHandler}/>
  </div>
  <div class="form-group">
    <label for="inputAddress2">Amount</label>
    <input type="number" class="form-control" name='amount' placeholder="Amount" onChange={changeHandler}/>
  </div>
  <button type="submit" class="btn btn-primary mt-4">Add Expence</button>
</form>
            </div>
            <div className={`${classes.list} container col-8`}>
                <h4>Expence List</h4>
            <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">CateGory</th>
      <th scope="col">Description</th>
      <th scope="col">Amount</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {key.map((item , index)=>{
      let date = resData[item].date
      let amount = Number(resData[item].amount)
      let des = resData[item].des
      let category = resData[item].category
      price +=amount
      return (
    <tr>
      <th scope="row">{index+1}</th>
      <td>{date}</td>
      <td>{category}</td>
      <td>{des}</td>
      <td>{`₹ ${amount}`}</td>
      {/* <td>
        <button className='btn btn-success'>Edit</button>
        <button className='btn btn-danger ms-4'>Delete</button>
      </td> */}
    </tr>
      )
    })}
    
    <th scope='row'>Total</th>
    <td colspan="3"></td>
    <td colspan="1">Total ₹ {` ${price}`}</td>
  </tbody>

</table>


            </div>
        </div>
    </div>
  )
}

export default Expence