export function findTimeFrame(someData:any){
    let timeList:any =[];

    someData.forEach((data: any) => {
        timeList.push(data.date);
      });
      console.log(timeList);
    
      const timeListArray= timeList.filter(
        (n: any, i: any) => timeList.indexOf(n) === i
      );
      console.log(timeListArray);
   let allTimeObj:any=[];
    timeListArray.map((time: any) => {
        console.log(time)
    const tempObj = {objArray:someData.filter((obj: any) => {obj['date']['seconds'] ===time.seconds})}

        
    console.log(tempObj)
     allTimeObj.push(tempObj)
   
    });

  return allTimeObj
}


// export const handleByTime = (someData:any) => {

//   let tempHours=someData[0].date.hours;
//   let tempMins=someData[0].date.minutes;
//   let tempSecs=someData[0].date.seconds;
//   let count=0;
//   let time=[];

//   for (let field of someData){
//     if (tempSecs!==field.date.seconds){
//       tempSecs=field.date.seconds
//       time.push(field.date)
//       count++
//     }
//     if (tempMins!==field.date.minutes){
//       tempMins=field.date.minutes
//       time.push(field.date)
//       count++
//     }

//     if (tempHours!==field.date.hours){
//       tempHours=field.date.hours
//        time.push(field.date)
//       count++

//     }

//   }
//  console.log(time)
//   console.log(count)
//   console.log(tempHours,tempMins,tempSecs)
//   const data = {
//       labels: time,
//       datasets: [
//         {
//           label: "1",
//           data: time.map((data: any) => data["rssi_0"] * -1),
//           backgroundColor: (["green" , "blue"]),
//         },
//         {
//           label: "2",
//           data: someData.map((data: any) => data["rssi_0"] * -1),
//           backgroundColor: (["green" , "blue"]),
//         },
//         {
//           label: "3",
//           data: someData.map((data: any) => data["rssi_0"] * -1),
//           backgroundColor: (["green" , "blue"]),
//         },

//       ]
//         // time.map(timeStamp=>{
//         //     console.log(timeStamp)
//         //   return (
//         //   {
//         //     label:timeStamp,
//         //     data: someData.map((data: any) => data["rssi_0"] * -1),
//         //     backgroundColor: (["green" , "blue"])
//         //   }
//         //   )
//         // })

//     }

//     return data
// }
