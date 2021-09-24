// import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import ContentsWorld from './Components/ContentsWorld';
import ContentsDom from './Components/ContentsDom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path='/'>
            <ContentsDom/>
          </Route>
          <Route path='/world'>
            <ContentsWorld/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
