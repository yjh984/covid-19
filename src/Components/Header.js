import React from 'react'
import { useState} from 'react';
import { useHistory } from 'react-router';


let isInit=true;

function Header() {
  const history=useHistory();
  const [isAbroad,setIsAbroad]=useState(false);
  // let isAbroad=false;
  let normalize=[1,1,1,1,1];
  // const {normalize, setNormalize}=useState(1,1,1,1,1);

  function onSelect(e){
    // console.log(e.target.value);
    if(e.target.value==='dom'){
      // console.log('Domestic...')
      setIsAbroad(false);
      history.push(`/`);
    } else{
      // console.log('Abroad...')
      setIsAbroad(true);
      // const normalize=[1,100,1,1,1];
      // history.push({
      //   pathname: `/world`,
      //   state:{normalize:normalize}
      //  });
      history.push('/world');
    }
  }

  function onRerendering() {
    // history.push('/');
    history.push({
      pathname: `/world`,
      state:{normalize:normalize, isInit:isInit}
     });
    isInit=!isInit;
    // setNormalize(tempNormalize);
    // window.location.replace('/world');
    // console.log('history~~')
  }

  function onNormalizeKR(e) {
    // console.log(e.target.value);
    normalize[0]=e.target.value;
  }
  function onNormalizeUS(e) {
    // console.log(e.target.value);
    normalize[1]=e.target.value;
  }
  function onNormalizeDE(e) {
    // console.log(e.target.value);
    normalize[2]=e.target.value;
  }
  function onNormalizeCZ(e) {
    // console.log(e.target.value);
    normalize[3]=e.target.value;
  }
  function onNormalizeCN(e) {
    // console.log(e.target.value);
    normalize[4]=e.target.value;
  }


  return (
    <header className='header'>
      <div className='header1'>
        <h1>COVID-19</h1>
        <select onChange={onSelect}>
          <option value='dom'>국내</option>
          <option value='abroad'>해외</option>
        </select>
      </div>
      {isAbroad?
      <div className='header2'>
        <label>KR<input placeholder='1' className='norm' type='text' onChange={onNormalizeKR}/></label>
        <label>US<input placeholder='1' className='norm' type='text' onChange={onNormalizeUS}/></label>
        <label>DE<input placeholder='1' className='norm' type='text' onChange={onNormalizeDE}/></label>
        <label>CZ<input placeholder='1' className='norm' type='text' onChange={onNormalizeCZ}/></label>
        <label>CN<input placeholder='1' className='norm' type='text' onChange={onNormalizeCN}/></label>
        <button onClick={onRerendering}>적용</button>
      </div>
      :
      ''}
    </header>
  )
}

export default Header
