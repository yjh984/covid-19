import axios from 'axios'
import {useEffect, useState} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import makeDayData from './makeDayData';
import makeMonthData from './makeMonthData';

function ContentsDom() {
  const [confirmedAccMonth, setConfirmedAccMonth]=useState({});
  const [confirmedMonth,setConfirmedMonth]=useState({});
  const [confirmedDay,setConfirmedDay]=useState({});
  const [isLoading,setIsLoading]=useState(false);
  

  useEffect(() => {
    const searchNations=['KR'];  
    const normalize=[1];
    const fetchevent = async ()=>{
      const data=[];
      let i=0;
      for (const a of searchNations){
        setIsLoading(true);
        data[i]= (await axios(`https://api.covid19api.com/total/dayone/country/${a}`)).data;
        i++;
        setIsLoading(false);
      }
      const {completedAccMonth, completedMonth}=makeMonthData(searchNations,normalize,data);
      setConfirmedAccMonth(completedAccMonth);
      setConfirmedMonth(completedMonth);
      const completedDayData= makeDayData(searchNations,normalize,data);
      setConfirmedDay(completedDayData);
    }
    fetchevent();
  },[]);


  if(isLoading) return <span>Loading.....</span>

  return (
      <section>
      <div className='contents'>
        <div>
          <h3>코로나 일별 발생 현황</h3>
          <Line className='chart-line-day' data={confirmedDay}/>
          {/* <Line className='chart-line-day' data={confirmedDay} options={
            {title:{display: true, text:"new Cases", fontsize:16 },
            legend:{display:true, position:'bottom'}}
          }/> */}

          <h3>코로나 월별 발생 현황</h3>
          <Line className='chart-line-day' data={confirmedMonth} options={
            {title:{display: true, text:"월간환자수 추이", fontsize:16 },
            legend:{display:true, position:'bottom'}}
          }/>
          <h3>코로나 월별 누적 현황</h3>
          <Bar className='chart-line-day' data={confirmedAccMonth} options={
            {title:{display: true, text:"new Cases", fontsize:100 }}
          }/>
        </div>
      </div>
    </section>
  )
}

export default ContentsDom
