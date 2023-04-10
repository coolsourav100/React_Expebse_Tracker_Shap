import React, { useEffect, useState } from 'react';
import classes from './Expence.module.css'
import LogOut from '../UI/LogOut';
import { useDispatch, useSelector } from 'react-redux';
import { exenceAction } from '../Store/expenceReducer';
import LockIcon from '../../Icon/LockIcon';
import UnLockIn from '../../Icon/UnLockIn';
import { CSVLink } from 'react-csv';
import { authAction } from '../Store/AuthReducer';
import axios from 'axios';




const Expence = () => {
  const userExData = useSelector(state=>state.expence)
  const authData = useSelector(state=>state.auth)


  const dispatch = useDispatch()
  const [ toggle , setToggle ] = useState(false)
  const [ expenceData , setExpenceData] = useState({category:'',date:'',des:'', amount:0})
  const [resData , setResData] = useState([]);
  const [key , setKey] = useState([])
  let price =0
  const headers =['Date','CateGory','>Description','Amount']
  
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

if(authData.ttoggle){
  document.body.className = 'dark-theam'
}else{
  document.body.className = ''
}

const q = userExData.key.map((item,index)=>userExData.expenceData[item])

let sum = 0 ;
for(let i=0;i<q.length;i++){
  sum+=Number(q[i].amount)
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
     {sum>=10000 && <button className='btn btn-dark me-2' onClick={()=>dispatch(authAction.toggleUpdater())}> {!authData.ttoggle ? 'Dark' : 'Light'} </button>}
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
<div className='d-flex justify-content-center mt-4'>
       <CSVLink className='btn btn-outline-dark' data={q}>Download CSV</CSVLink>
       </div>
    </div>
  )
}

export default Expence