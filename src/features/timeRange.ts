export function findTimeFrame(someData:any){
  
    let timeList:any =[];
    
    

    someData.forEach((data: any) => {
        timeList.push(data.date);

      });
     
      
      

      const timeRange = timeList.filter((date:any , i:number , arr:any) => {
        return arr.indexOf(arr.find((t:any) => (t.year === date.year) && (t.month === date.month) && 
        (t.day === date.day) && (t.hours === date.hours) && (t.minutes === date.minutes) && (t.seconds === date.seconds))) === i
        })

      return timeRange

    }

      


      
  //     const timeListArray= timeList.filter(
  //       (n: any, i: any) => timeList.indexOf(n) === i
  //     );
  //     console.log(timeListArray);
  //   let allTimeObj:any=[];
  //   timeListArray.map((time: any) => {
  //     // {mac1Value:mac1,objArray:list.filter((obj: any) => obj.MAC_1 === mac1)}
  //   const tempObj = {objArray:someData.filter((obj: any) => obj.date === time , console.log(time)
  //   )}

        
    
  //    allTimeObj.push(tempObj)
   
  //   });

  //   console.log(allTimeObj);
  // return allTimeObj;



// export const handleByTime = (someData:any) => {

//   let tempHours=someData[0].date.hours;
//   let tempMins=someData[0].date.minutes;
//   let tempSecs=someData[0].date.seconds;
//   let tempDay = someData[0].date.day
// let tempYear = someData[0].date.year  

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
