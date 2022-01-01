
function makeMonthData(searchNations,normalize,dataArray) {
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
    const labels=monthData[0].map(a=>`${String(a.year).substr(2,2)}/ ${a.month+1}`);
    for (let i=monthData.length; i<5; i++){
        monthData[i]=undefined;
      //   console.log(i);
    }
    const completedAccMonth={
      labels,
      datasets:[
        {
          label: `${searchNations[0]}*${1/normalize[0]}`,
          backgroundColor:'blue',
          borderColor: 'blue',
          fill: false,
          data: monthData[0].map(a=>a.confirmed*normalize[0]),
        },
        {
          label: monthData[1]===undefined? 'N/A':`${searchNations[1]}*${1/normalize[1]}`,
          backgroundColor:'gray',
          borderColor: 'gray',
          fill: false,
          data: monthData[1]===undefined? null:monthData[1].map(a=>a.confirmed*normalize[1]),
        },
        {
          label: monthData[2]===undefined? 'N/A':`${searchNations[2]}*${1/normalize[2]}`,
          backgroundColor:'#036384',
          borderColor: '#036384',
          fill: false,
          data: monthData[2]===undefined? null:monthData[2].map(a=>a.confirmed*normalize[2]),
        },
        {
          label: monthData[3]===undefined? 'N/A':`${searchNations[3]}*${1/normalize[3]}`,
          backgroundColor:'green',
          borderColor: 'green',
          fill: false,
          data: monthData[3]===undefined? null:monthData[3].map(a=>a.confirmed*normalize[3]),
        },
        {
          label: monthData[4]===undefined? 'N/A':`${searchNations[4]}*${1/normalize[4]}`,
          backgroundColor:'black',
          borderColor: 'black',
          fill: false,
          data: monthData[4]===undefined? null:monthData[4].map(a=>a.confirmed*normalize[4]),
        },
        {
          label: monthData[5]===undefined? 'N/A':`${searchNations[5]}*${1/normalize[5]}`,
          backgroundColor:'red',
          borderColor: 'red',
          fill: false,
          data: monthData[5]===undefined? null:monthData[5].map(a=>a.confirmed*normalize[5]),
        },
      ]
    };
    const completedMonth = {
      labels,
      datasets:[
        {
          label: `${searchNations[0]}*${normalize[0]}`,
          borderColor: 'blue',
          fill: false,
          data: monthData[0].map((a,i,arr)=>{
            if(i===0){return 0;}
            return (a.confirmed-arr[i-1].confirmed)*normalize[0];}),
        },
        {
          label: monthData[1]===undefined? 'N/A':`${searchNations[1]}*${1/normalize[1]}`,
          borderColor: 'gray',
          fill: false,
          data: monthData[1]===undefined? null:monthData[1].map((a,i,arr)=>{
            if(i===0){return 0;}
            return (a.confirmed-arr[i-1].confirmed)*normalize[1];}),
        },
        {
          label: monthData[2]===undefined? 'N/A':`${searchNations[2]}*${1/normalize[2]}`,
          borderColor: '#036384',
          fill: false,
          data: monthData[2]===undefined? null:monthData[2].map((a,i,arr)=>{
            if(i===0){return 0;}
            return (a.confirmed-arr[i-1].confirmed)*normalize[2];}),
        },
        {
          label: monthData[3]===undefined? 'N/A':`${searchNations[3]}*${1/normalize[3]}`,
          borderColor: 'green',
          fill: false,
          data: monthData[3]===undefined? null:monthData[3].map((a,i,arr)=>{
            if(i===0){return 0;}
            return (a.confirmed-arr[i-1].confirmed)*normalize[3];}),
        },
        {
          label: monthData[4]===undefined? 'N/A':`${searchNations[4]}*${1/normalize[4]}`,
          borderColor: 'black',
          fill: false,
          data: monthData[4]===undefined? null:monthData[4].map((a,i,arr)=>{
            if(i===0){return 0;}
            return (a.confirmed-arr[i-1].confirmed)*normalize[4];}),
        },
        {
          label: monthData[5]===undefined? 'N/A':`${searchNations[5]}*${1/normalize[5]}`,
          borderColor: 'red',
          fill: false,
          data: monthData[5]===undefined? null:monthData[5].map((a,i,arr)=>{
            if(i===0){return 0;}
            return (a.confirmed-arr[i-1].confirmed)*normalize[5];}),
        },
      ]
    };

  return {completedMonth, completedAccMonth}
}

export default makeMonthData
