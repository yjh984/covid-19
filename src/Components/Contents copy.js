import axios from 'axios'
// import React from 'react'
import {useEffect, useState} from 'react';
// import {Bar, Doughnut, Line} from 'react-chartjs-2';
import {Bar, Line} from 'react-chartjs-2';

function Contents() {
  const [confirmedData, setConfirmedData]=useState({});
  const [newCases,setNewCases]=useState({});
  const [daysData,setDaysData]=useState({});

  useEffect(() => {
    const fetchevent = async ()=>{
      const res=await axios('https://api.covid19api.com/total/dayone/country/KR');
      // console.log(res.data);
      makeData(res.data);
      makeDayData(res.data);
    }
    const makeDayData=(items)=>{
      const arr2=items.reduce((acc,cur)=>{
        const currentDate=new Date(cur.Date);
        const year=currentDate.getFullYear();
        const month=currentDate.getMonth();
        const date=currentDate.getDate();
        const confirmed=cur.Confirmed;
        const active=cur.Active;
        const death=cur.Deaths;
        const recovered=cur.Recovered;
        acc.push({year,month,date,confirmed,active,death,recovered});
        return acc;
      },[]);
      // const daysArray=arr2.splice(0,arr2.length-30);
      arr2.splice(0,arr2.length-30);
      // console.log(arr2);
      const labels=arr2.map(a=>`${a.year}/ ${a.month+1}/ ${a.date}`);
      labels.splice(0,1);
      setDaysData({
        labels,
        datasets:[
          {
            label: '최근 30일 환자 추이',
            borderColor: 'blue',
            fill: false,
            data: arr2.map((a,i,arr2) =>{
              if(i===0){return 0};
              const delta=a.confirmed-arr2[i-1].confirmed;
              return delta;
              }).splice(1,arr2.length)
          },
        ]
      });

    }

    const makeData=(items)=>{
      const arr = items.reduce((acc,cur)=>{
        const currentDate=new Date(cur.Date);
        const year=currentDate.getFullYear();
        const month=currentDate.getMonth();
        const date=currentDate.getDate();
        const confirmed=cur.Confirmed;
        const active=cur.Active;
        const death=cur.Deaths;
        const recovered=cur.Recovered;

        const findItem=acc.find(a=>a.year === year && a.month===month);
        if(!findItem){
          acc.push({year,month,date,confirmed,active,death,recovered});
        }
        if(findItem && findItem.date < date){
          findItem.active=active;
          findItem.death=death;
          findItem.date=date;
          findItem.year=year;
          findItem.month=month;
          findItem.recovered=recovered;
          findItem.confirmed=confirmed;
        }
        return acc;
      },[])
      // console.log(arr));
      const labels=arr.map(a=>`${a.year}/ ${a.month+1}`);
      setConfirmedData({
        labels,
        datasets:[
          {
            label: '국내 누적 환진자',
            backgroundColor: 'salmon',
            fill: true,
            data: arr.map(a=>a.confirmed)
          },
        ]
      });
      setNewCases({
        labels,
        datasets:[
          {
            label: '월별 환자발생 추이',
            borderColor: 'salmon',
            fill: true,
            data: arr.map((a,i,arr) =>{
              if(i===0){return a.confirmed};
              const delta=a.confirmed-arr[i-1].confirmed;
              return delta;
            })
          },
        ]
      });
      // const last=arr[arr.length-1];
      // console.log(last);
      // setCompareData({
      //   labels: ['확진자','격리자해제','사망자'],
      //   datasets:[
      //     {
      //       label: '누적확진, 격리해제, 사망자',
      //       backgroundColor: ['#ff3d67','#059bff','#ffc233'],
      //       borderColor: ['#ff3d67','#059bff','#ffc233'],
      //       fill: true,
      //       data: [last.confirmed,last.recovered,last.death],
      //     }
      //   ],
      // });
    };
    fetchevent();
  },[]);

  return (
      <section>
      <h2>코로나 현황</h2>
      <div className='contents'>
        <div>
          <Line data={daysData} options={
            {title:{display: true, text:"new Cases", fontsize:16 },
            legend:{display:true, position:'bottom'}}
          }/>
          {/* <Bar data={confirmedData} options={ {title:{display: true, text:"누적환자추이", fontsize:16 }}, {legend:{display:true, position:'bottom'}}}/> */}
          <Bar data={confirmedData} options={
            {title:{display: true, text:"누적환자추이", fontsize:16 },
            legend:{display:true, position:'bottom'}}
          }/>
          <Line data={newCases} options={
            {title:{display: true, text:"월간환자수 추이", fontsize:16 },
            legend:{display:true, position:'bottom'}}
          }/>
          {/* <Doughnut className='doughnut' data={compareData} options={
            {title:{display: true, text:`이번달 현황`, fontsize:16 },
            legend:{display:true, position:'bottom',
            }}
          }/> */}
        </div>
      </div>
    </section>
  )
}

export default Contents
