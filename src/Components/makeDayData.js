// import React from 'react'

function makeDayData(searchNations, normalize, dataArray) {
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
      const delta=(a2.confirmed-arr[j-1].confirmed)*a;
    return {...a2,confirmed: delta};
    });
  return a;
  });

  const labels=dayCaseArray[0].map(a=>{
    // console.log(String(a.year).substr(2,2))
    return`${a.month+1}/ ${a.date}`;
  });
  
  labels.splice(0,1);
  for (let i=dayCaseArray.length; i<5; i++){
      dayCaseArray[i]=undefined;
    //   console.log(i);
  }
//   console.log(dayCaseArray[1]);
//   console.log(dayCaseArray[1]===undefined);

  const completedData= {
    labels,
    options:{ title:{display:true,text:'xxxx'}},
    datasets:[
      {
        label: `${searchNations[0]}*${1/normalize[0]}`,
        borderColor: 'blue',
        fill: false,
        data: dayCaseArray[0].map(a=>a.confirmed),

      },
      {
        label: dayCaseArray[1]===undefined? 'N/A':`${searchNations[1]}*${1/normalize[1]}`,
        borderColor: 'gray',
        fill: false,
        data: dayCaseArray[1]===undefined? null:dayCaseArray[1].map(a=>a.confirmed),
      },
      {
        label: dayCaseArray[2]===undefined? 'N/A':`${searchNations[2]}*${1/normalize[2]}`,
        borderColor: '#036384',
        fill: false,
        data: dayCaseArray[2]===undefined? null:dayCaseArray[2].map(a=>a.confirmed),
      },
      {
        label: dayCaseArray[3]===undefined? 'N/A':`${searchNations[3]}*${1/normalize[3]}`,
        borderColor: 'green',
        fill: false,
        data: dayCaseArray[3]===undefined? null:dayCaseArray[3].map(a=>a.confirmed),
      },
      {
        label: dayCaseArray[4]===undefined? 'N/A':`${searchNations[4]}*${1/normalize[4]}`,
        borderColor: 'black',
        fill: false,
        data: dayCaseArray[4]===undefined? null:dayCaseArray[4].map(a=>a.confirmed),
      },
    ]
  };

  return completedData;
}

export default makeDayData
