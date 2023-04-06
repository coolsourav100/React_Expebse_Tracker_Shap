import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Component/Auth/Login";
import Home from './Component/Pages/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgetPassword from './Component/Pages/ForgetPassword';



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='forgetpassword' element={<ForgetPassword/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
