// import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import ContentsWorld from './Components/ContentsWorld';
import ContentsDom from './Components/ContentsDom';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import Switch from 'switch';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/covid-19' element={<ContentsDom/>}/>
            {/* <ContentsDom/> */}
          {/* </Route> */}
          <Route path='/world' element={<ContentsWorld/>}/>
            {/* <ContentsWorld/> */}
          {/* </Route> */}
          {/* <Route exact path='/' component={PageNotFound} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
