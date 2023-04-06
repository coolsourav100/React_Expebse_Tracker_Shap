import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Component/Auth/Login";
import Home from './Component/Pages/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
