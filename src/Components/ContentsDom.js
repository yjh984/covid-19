import axios from 'axios'
import {useEffect, useState} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import makeDayData from './makeDayData';
import makeMonthData from './makeMonthData';
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

/*
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,2,3,4,5,6,7],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
*/

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
      setIsLoading(true);

      for (const a of searchNations){
        data[i]= (await axios(`https://api.covid19api.com/total/dayone/country/${a}`)).data;
        i++;
      }
      setIsLoading(false);

      // {console.log("axios : " + Object.keys(data).length)}
      const {completedAccMonth, completedMonth}=makeMonthData(searchNations,normalize,data);
      setConfirmedAccMonth(completedAccMonth);
      setConfirmedMonth(completedMonth);
      const completedDayData= makeDayData(searchNations,normalize,data);
      // {console.log("makeDay : "+Object.keys(completedDayData).length)}
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
          {/* {console.log("Line : "+Object.keys(confirmedDay).length)} */}
          {/* {console.log(Object.keys(confirmedDay).length>0)} */}
          {/* {confirmedDay&& */}
          {/* {Object.keys(confirmedDay).length>0?
            <Line className='chart-line-day' data={confirmedDay}/> :""} */}

          
          {/* <Line options={options} data={data} /> */}
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

export default ContentsDom
