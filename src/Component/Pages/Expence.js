import React, { useEffect, useState } from 'react';
import classes from './Expence.module.css'
import axios from 'axios';
import LogOut from '../UI/LogOut';
import { useDispatch, useSelector } from 'react-redux';
import { exenceAction } from '../Store/expenceReducer';
import LockIcon from '../../Icon/LockIcon';
import UnLockIn from '../../Icon/UnLockIn';



const Expence = () => {
  const userExData = useSelector(state=>state.expence)
  const dispatch = useDispatch()
  const [ toggle , setToggle ] = useState(false)
  const [ expenceData , setExpenceData] = useState({category:'',date:'',des:'', amount:0})
  const [resData , setResData] = useState([]);
  const [key , setKey] = useState([])
  let price =0
  
useEffect(()=>{
  (async()=>{
    await axios.get('https://etshapreact-default-rtdb.asia-southeast1.firebasedatabase.app/expence.json')
    .then(res=>{
    dispatch(exenceAction.expenceUpdater(res.data))
  setKey(Object.keys(userExData.expenceData))
  dispatch(exenceAction.keyUpdater(Object.keys(res.data)))
    })
    .catch(err=>console.log(err))
  })();
  return ()=>{}
},[toggle])

const p = userExData.key.map((item , index)=>Number(userExData.expenceData[item].amount))
let sum = 0 ;
for(let i=0;i<p.length;i++){
  sum+=p[i]
}


    const changeHandler=(e)=>{
      e.preventDefault();
      setExpenceData({...expenceData,[e.target.name]:e.target.value})
    }

    const submitHandler=async(e)=>{
      e.preventDefault();
      await axios.post(`https://etshapreact-default-rtdb.asia-southeast1.firebasedatabase.app/expence.json`,expenceData)
      .then(res=>console.log(res,'expence sent res'))
      .catch(err=>console.log(err, 'expence sent error'))
      setToggle(!toggle)
      setExpenceData({category:'',date:'',des:'', amount:0})
    }
    const editHandler=async(id)=>{
      
      await axios.delete(`https://etshapreact-default-rtdb.asia-southeast1.firebasedatabase.app/expence/${id}.json`)
      .then(res=>{
        
        setExpenceData({category:userExData.expenceData[id].category,date:userExData.expenceData[id].date,des:userExData.expenceData[id].des, amount:userExData.expenceData[id].amount})
      })
      .catch(err=>console.log(err, 'edit error'))
      setToggle(!toggle)
    }

    const deleteHandler=async(id)=>{
      await axios.delete(`https://etshapreact-default-rtdb.asia-southeast1.firebasedatabase.app/expence/${id}.json`)
      .then(res=>window.alert('Delete Successfully'))
      .catch(err=>console.log(err, 'delete error'))
      setToggle(!toggle)
    }
    
  return (
    <div>

      <div className='d-flex justify-content-end'>
      <div className='d-flex'>
     {sum>=10000 && <UnLockIn/>}
      {sum<10000 &&<LockIcon/>}
      <LogOut/>
      </div>
      </div>
        <div className='d-flex row'>
            <div className={` ${classes.add} container col-2`}>
                <h4> Add Your Expence</h4>
            <form onSubmit={submitHandler}>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label >Date</label>
      <input type="date" class="form-control" name='date' value={expenceData.date}  placeholder="Date" onChange={changeHandler} required/>
    </div>
    <div class="form-group col-md-6">
      <label >CateGory</label>
      <select class="form-control" value={expenceData.category} onChange={changeHandler} name='category' required>
        <option>{`<-- Select -->`}</option>
        <option value='Food'>Food</option>
        <option value='Petrol'>Petrol</option>
        <option value='Transportion'>Transportion</option>
        <option value='Room Rent'>Room Rent</option>
        <option value='Others'>Others</option>
      </select>
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Description</label>
    <input type="text" class="form-control" name='des' value={expenceData.des} placeholder="Description" onChange={changeHandler} required/>
  </div>
  <div class="form-group">
    <label for="inputAddress2">Amount</label>
    <input type="number" class="form-control" name='amount' value={expenceData.amount} placeholder="Amount" onChange={changeHandler} required/>
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
    {userExData.key.map((item , index)=>{
      let date = userExData.expenceData[item].date
      let amount = Number(userExData.expenceData[item].amount)
      // console.log(amount)
      // dispatch(exenceAction.priceUpdater(amount))
      
      let des = userExData.expenceData[item].des
      let category = userExData.expenceData[item].category
      price +=amount
      return (
    <tr>
      <th scope="row">{index+1}</th>
      <td>{date}</td>
      <td>{category}</td>
      <td>{des}</td>
      <td>{`₹ ${amount}`}</td>
      <td>
        <button className='btn btn-success' onClick={()=>editHandler(item)}>Edit</button>
        <button className='btn btn-danger ms-4'onClick={()=>deleteHandler(item)}>Delete</button>
      </td>
    </tr>
    
      )
    })}
    
    <th scope='row'>Total</th>
    <td colspan="4"></td>
    <td colspan="1">Total ₹ {` ${price}`}</td>
  </tbody>

</table>


            </div>
        </div>
    </div>
  )
}

export default Expence