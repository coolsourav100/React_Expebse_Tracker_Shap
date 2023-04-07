import React from 'react';
import classes from './Expence.module.css'

const Expence = () => {
    
  return (
    <div>
        <div className='d-flex row'>
            <div className={` ${classes.add} container col-2`}>
                <h4> Add Your Expence</h4>
            <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label >Date</label>
      <input type="date" class="form-control"  placeholder="Date"/>
    </div>
    <div class="form-group col-md-6">
      <label >CateGory</label>
      <select class="form-control">
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
    <input type="text" class="form-control"  placeholder="Description"/>
  </div>
  <div class="form-group">
    <label for="inputAddress2">Amount</label>
    <input type="number" class="form-control" placeholder="Amount"/>
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>12/04/2023</td>
      <td>Food</td>
      <td>BreakFast</td>
      <td>₹ 100</td>
    </tr>
    
    <th scope='row'>Total</th>
    <td colspan="3"></td>
    <td colspan="1">Total ₹ 100</td>
  </tbody>

</table>


            </div>
        </div>
    </div>
  )
}

export default Expence