
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CardDetails from './components/CardDetails';
import CreateDog from './components/CreateDog';


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
    <div >
      <Routes>
      <Route  path='/home/:id' element = {<CardDetails/>}/>
      </Routes>
    </div>
    <div >
      <Routes>
      <Route  path='/dog' element = {<CreateDog/>}/>
      </Routes>
    </div>

    </BrowserRouter>
  );
}

export default App;