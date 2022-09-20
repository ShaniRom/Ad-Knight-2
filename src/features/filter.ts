import getDate from "./getDate";


export function filterData(dataSaved: any, keysBLE: any, keysWIFI: any) {

  const filteredBLE = dataSaved.filter((objBLE: any) => {
    return objBLE[0] === "BLE";
  });

  const filteredWIFI = dataSaved.filter((objWIFI: any) => {
    return objWIFI[0] === "WIFI";
  });

  const result = filterWithKeys(filteredBLE, filteredWIFI, keysBLE, keysWIFI);

  return result;
}

function filterWithKeys(
  filteredBLE: any,
  filteredWIFI: any,
  keysBLE: any,
  keysWIFI: any
) {
  // keysBLE ,keysWIFI
  let wifiData: any = [];
  let BLEData: any = [];

  // getting the keys and values together in BLE ----------------------------------------

  for (let i = 0; i < filteredBLE.length; i++) {
    let tempObj: any = {};
    for (let x = 0; x < filteredBLE[i].length; x++) {
      const tempKey = keysBLE[x];
      const tempValue = filteredBLE[i][x];
      tempObj[`${tempKey}`] = tempValue;
    }
    tempObj.ts = parseFloat(tempObj.ts);
    const dateFound = getDate(tempObj.ts);
    tempObj.date = dateFound;
    BLEData = [...BLEData, tempObj];
  }

  // getting the keys and values together in WIFI ------------------------------

  for (let i = 0; i < filteredWIFI.length; i++) {
    let tempObj: any = {};
    for (let x = 0; x < filteredWIFI[i].length; x++) {
      const tempKey = keysWIFI[x];
      const tempValue = filteredWIFI[i][x];
      tempObj[`${tempKey}`] = tempValue;
    }

    tempObj.ts = parseFloat(tempObj.ts);
    const dateFound = getDate(tempObj.ts);
    tempObj.date = dateFound;
    wifiData = [...wifiData, tempObj];
  }
  return { wifiData, BLEData };
}

// -------------------------------------------------------

// export const filterByMac1 = (list: any) => {
//   let mac1List: any = [];
//   let tempMac1 = list[0].MAC_1;

//   list.forEach((data: any) => {
//     mac1List.push(data.MAC_1);
//   });

//   const mac1ListArray = mac1List.filter(
//     (n: any, i: any) => mac1List.indexOf(n) === i
//   )
//    let allMacObj:any=[];
//     mac1ListArray.map((mac1: any) => {
//     const tempObj = {mac1Value:mac1,objArray:list.filter((obj: any) => obj.MAC_1 === mac1)};
//     allMacObj.push(tempObj)

//   });

//   return allMacObj
// }

// export const filterByMac1 = (list: Array<any>) => {
//   const mac1List = list.map((data: any) => data.MAC_1);

//   // const mac1ListArray = mac1List.filter(
//   //   //     (n: any, i: any) => mac1List.indexOf(n) === i
//   //   //   ).filter(
//   //   (n: any, i: any) => mac1List.indexOf(n) === i
//   // );
//   let mac1ListArray = new Set();
//   mac1List.forEach((mac1) => mac1ListArray.add(mac1));

//   // const mac1ListArray2 = Array.from(mac1ListArray);
// let result:any[] = [];
//   const allMacObj = mac1ListArray.forEach((mac1: any) => {
//     result = [...result,  {
//       mac1Value: mac1,
//       objArray: list.filter((obj: any) => obj.MAC_1 === mac1),
//     }];
//   });

//   return result;
// };

export const filterByMac1 = (list:Array<any> , dataset:string) => {

  let datasetList: any = []; 
  

  list.forEach((data: any) => {
    datasetList.push(data[`${dataset}`]);
  });
  
  const datasetListArray = datasetList.filter(
    (n: any, i: any) => datasetList.indexOf(n) === i
  )
  
   let allMacObj:any=[];
    datasetListArray.map((mac1: any) => {
    const tempObj = {chosendataSet:mac1,objArray:list.filter((obj: any) => obj.MAC_1 === mac1)};
    allMacObj = [...allMacObj,tempObj]
  });
  
  console.log(allMacObj);
  
  return allMacObj
}

