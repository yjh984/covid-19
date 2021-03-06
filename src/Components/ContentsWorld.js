import axios from 'axios'
import {useEffect, useState} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import makeDayData from './makeDayData';
import makeMonthData from './makeMonthData';
// import {useLocation} from 'react-router';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      // text: 'Covid19 일별 발생 현황',
    },
  },
};

function ContentsWorld() {
  const [confirmedAccMonth, setConfirmedAccMonth]=useState({});
  const [confirmedMonth,setConfirmedMonth]=useState({});
  const [confirmedDay,setConfirmedDay]=useState({});
  const [isLoading,setIsLoading]=useState(false);
  // const location=useLocation();
  let normalize=[1,1,1,1,1,1];
  let isInit=false;

  // console.log(location.state.normalize);
  // const normalize=location.state.normalize;
  // normalize=[1,100,1,1,1];
  // console.log(confirmedDay.datasets===undefined);
  /*
  if(location.state!==undefined) {
    normalize =location.state.normalize;
    isInit=location.state.isInit;
    // setIsLoading(false);
    // setTimeout(()=>setIsLoading(false),10);
    // console.log(normalize);
    // window.location.replace('/world')
    // setIsLoading(false);
    // if(normalize!==tempNormalize){
    //   normalize=tempNormalize.slice();
      // setIsLoading(false);
      // console.log('diff',normalize);
    // }
  }
  */
 
 
  // setIsLoading(false);

  useEffect(() => {
    const searchNations=['KR','JP','CN','CZ','DE','US'];
    const normalize=[1,1,1,1,1,1];
    const fetchevent = async ()=>{
      const data=[];
      let i=0;
      setIsLoading(true);
      for (const a of searchNations){
        data[i]= (await axios(`https://api.covid19api.com/total/dayone/country/${a}`)).data;
        i++;
      }
      setIsLoading(false);

      const {completedAccMonth, completedMonth}=makeMonthData(searchNations,normalize,data);
      setConfirmedAccMonth(completedAccMonth);
      setConfirmedMonth(completedMonth);
      const completedDayData= makeDayData(searchNations,normalize,data);
      setConfirmedDay(completedDayData);
    }

    fetchevent();
    // console.log('fetch...')
  },[isInit]);
  
  if(isLoading) return <span>Loading.....</span>

  // isInit=false;

  return (
      <section>
      <div className='contents'>
        <div>
          <h3>코로나 일별 발생 현황</h3>
          <Line options={options} data={confirmedDay}/>
          {/* <Line className='chart-line-day' data={confirmedDay} options={
            {title:{display: true, text:"new Cases", fontsize:16 },
            legend:{display:true, position:'bottom'}}
          }/> */}
          <h3>코로나 월별 발생 현황</h3>
          <Line options={options} data={confirmedMonth}/>
          {/* <Line className='chart-line-day' data={confirmedMonth} options={
            {title:{display: true, text:"월간환자수 추이", fontsize:16 },
            legend:{display:true, position:'bottom'}}
          }/> */}
          <h3>코로나 월별 누적 현황</h3>
          <Line options={options} data={confirmedAccMonth}/>
          {/* <Bar className='chart-line-day' data={confirmedAccMonth} options={
            {title:{display: true, text:"new Cases", fontsize:100 }}
          }/> */}
        </div>
      </div>
    </section>
  )
}

export default ContentsWorld
