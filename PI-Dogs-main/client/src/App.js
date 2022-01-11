
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route  path='/' element = {<LandingPage/>}/>
      </Routes>
    </div>
    <div >
      <Routes>
      <Route  path='/home' element = {<Home/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;