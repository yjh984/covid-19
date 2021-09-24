import axios from 'axios'
import {useEffect, useState} from 'react';
import {Bar, Line} from 'react-chartjs-2';

function ContentsWorld() {
  const [confirmedAccMonth, setConfirmedAccMonth]=useState({});
  const [confirmedMonth,setConfirmedMonth]=useState({});
  const [confirmedDay,setConfirmedDay]=useState({});
  const [isLoading,setIsLoading]=useState(false);
  

  useEffect(() => {
    const searchNations=['KR','US','DE','CZ','CN'];  
    const normalize=[1,1,1,1,1];
    const fetchevent = async ()=>{
      const data=[];
      let i=0;
      for (const a of searchNations){
        setIsLoading(true);
        data[i]= (await axios(`https://api.covid19api.com/total/dayone/country/${a}`)).data;
        i++;
        setIsLoading(false);
      }
      makeMonthData(data);
      makeDayData(data);
    }

    const makeDayData=(dataArray)=>{
      const tempData=[];
      dataArray.forEach((a,i)=>{
        const data=a.reduce((acc,cur)=>{
          const currentDate=new Date(cur.Date);
          const year=currentDate.getFullYear();
          const month=currentDate.getMonth();
          const date=currentDate.getDate();
          const confirmed=cur.Confirmed;
          acc.push({year,month,date,confirmed});
          return acc;
        },[]);
        tempData[i]=data;
      });

      // console.log(tempData);      
      const dayCaseArrayCensor=tempData.map(a=>a.splice(a.length-30,30));
      const dayCaseArray=[];
      normalize.map((a,i)=>{
        dayCaseArray[i]=dayCaseArrayCensor[i].map((a2,j,arr)=>{
          if(j===0){return 0};          
          const delta=(a2.confirmed-arr[j-1].confirmed)/a;
        return {...a2,confirmed: delta};
        });
      return a;
      });

      const labels=dayCaseArray[0].map(a=>`${a.year}/ ${a.month+1}/ ${a.date}`);
      labels.splice(0,1);

      setConfirmedDay({
        labels,
        datasets:[
          {
            label: `${searchNations[0]} Trend * ${normalize[0]}`,
            borderColor: 'blue',
            fill: false,
            data: dayCaseArray[0].map(a=>a.confirmed),
          },
          {
            label: `${searchNations[1]} Trend * ${normalize[1]}`,
            borderColor: 'gray',
            fill: false,
            data: dayCaseArray[1].map(a=>a.confirmed),
          },
          {
            label: `${searchNations[2]} Trend * ${normalize[2]}`,
            borderColor: '#036384',
            fill: false,
            data: dayCaseArray[2].map(a=>a.confirmed),
          },
          {
            label: `${searchNations[3]} Trend * ${normalize[3]}`,
            borderColor: 'green',
            fill: false,
            data: dayCaseArray[3].map(a=>a.confirmed),
          },
          {
            label: `${searchNations[4]} Trend * ${normalize[4]}`,
            borderColor: 'black',
            fill: false,
            data: dayCaseArray[4].map(a=>a.confirmed),
          },
        ]
      });
  }

    const makeMonthData=(dataArray)=>{
      const monthData=[];
      dataArray.forEach((a,i)=>{
        const tempData = a.reduce((acc,cur)=>{
          const currentDate=new Date(cur.Date);
          const year=currentDate.getFullYear();
          const month=currentDate.getMonth();
          const date=currentDate.getDate();
          const confirmed=cur.Confirmed;
          const active=cur.Active;

          const findItem=acc.find(a=>a.year === year && a.month===month);
          if(!findItem){
            acc.push({year,month,date,confirmed,active});
          }
          if(findItem && findItem.date < date){
            findItem.active=active;
            findItem.date=date;
            findItem.year=year;
            findItem.month=month;
            findItem.confirmed=confirmed;
          }
        return acc;
        },[]);
        monthData[i]=tempData;
      });
        // console.log(arr));
        const labels=monthData[0].map(a=>`${a.year}/ ${a.month+1}`);
        setConfirmedAccMonth({
          labels,
          datasets:[
            {
              label: `${searchNations[0]} Trend * ${normalize[0]}`,
              backgroundColor:'blue',
              borderColor: 'blue',
              fill: false,
              data: monthData[0].map(a=>a.confirmed),
            },
            {
              label: `${searchNations[1]} Trend * ${normalize[1]}`,
              backgroundColor:'gray',
              borderColor: 'gray',
              fill: false,
              data: monthData[1].map(a=>a.confirmed),
            },
            {
              label: `${searchNations[2]} Trend * ${normalize[2]}`,
              backgroundColor:'#036384',
              borderColor: '#036384',
              fill: false,
              data: monthData[2].map(a=>a.confirmed),
            },
            {
              label: `${searchNations[3]} Trend * ${normalize[3]}`,
              backgroundColor:'green',
              borderColor: 'green',
              fill: false,
              data: monthData[3].map(a=>a.confirmed),
            },
            {
              label: `${searchNations[4]} Trend * ${normalize[4]}`,
              backgroundColor:'black',
              borderColor: 'black',
              fill: false,
              data: monthData[4].map(a=>a.confirmed),
            },
          ]
        });
        setConfirmedMonth({
          labels,
          datasets:[
            {
              label: `${searchNations[0]} Trend * ${normalize[0]}`,
              borderColor: 'blue',
              fill: false,
              data: monthData[0].map((a,i,arr)=>{
                if(i===0){return 0;}
                return a.confirmed-arr[i-1].confirmed;}),
            },
            {
              label: `${searchNations[1]} Trend * ${normalize[1]}`,
              borderColor: 'gray',
              fill: false,
              data: monthData[1].map((a,i,arr)=>{
                if(i===0){return 0;}
                return a.confirmed-arr[i-1].confirmed;}),
            },
            {
              label: `${searchNations[2]} Trend * ${normalize[2]}`,
              borderColor: '#036384',
              fill: false,
              data: monthData[2].map((a,i,arr)=>{
                if(i===0){return 0;}
                return a.confirmed-arr[i-1].confirmed;}),
            },
            {
              label: `${searchNations[3]} Trend * ${normalize[3]}`,
              borderColor: 'green',
              fill: false,
              data: monthData[3].map((a,i,arr)=>{
                if(i===0){return 0;}
                return a.confirmed-arr[i-1].confirmed;}),
            },
            {
              label: `${searchNations[4]} Trend * ${normalize[4]}`,
              borderColor: 'black',
              fill: false,
              data: monthData[4].map((a,i,arr)=>{
                if(i===0){return 0;}
                return a.confirmed-arr[i-1].confirmed;}),
            },
          ]
        });
    };
    fetchevent();
  },[]);

  if(isLoading) return <span>Loading.....</span>

  return (
      <section>
      <div className='contents'>
        <div>
          <h3>코로나 일별 발생 현황</h3>
          <Line className='chart-line-day' data={confirmedDay} options={
            {title:{display: true, text:"new Cases", fontsize:16 },
            legend:{display:true, position:'bottom'}}
          }/>
          <h3>코로나 월별 발생 현황</h3>
          <Line data={confirmedMonth} options={
            {title:{display: true, text:"월간환자수 추이", fontsize:16 },
            legend:{display:true, position:'bottom'}}
          }/>
          <h3>코로나 월별 누적 현황</h3>
          <Bar data={confirmedAccMonth} options={
            {title:{display: true, text:"new Cases", fontsize:100 }}
          }/>
        </div>
      </div>
    </section>
  )
}

export default ContentsWorld
