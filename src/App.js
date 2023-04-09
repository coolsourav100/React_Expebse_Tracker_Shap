import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Component/Auth/Login";
import Home from './Component/Pages/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgetPassword from './Component/Pages/ForgetPassword';
import Expence from './Component/Pages/Expence';
import './App.css'



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/expence' element={<Expence/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
