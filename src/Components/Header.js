import React from 'react'
import { useHistory } from 'react-router';


function Header() {
  const history=useHistory();

  function onSelect(e){
    // console.log(e.target.value);
    if(e.target.value==='dom'){
      // console.log('Domestic...')
      history.push(`/`);
    } else{
      // console.log('Abroad...')
      history.push('/world');
    }
  }
  return (
      <header className='header'>
      <h1>COVID-19</h1>
      <select onChange={onSelect}>
        <option value='dom'>국내</option>
        <option value='abroad'>해외</option>
      </select>
    </header>
  )
}

export default Header
