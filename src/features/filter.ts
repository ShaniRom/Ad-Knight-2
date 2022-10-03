import { parse } from "papaparse";
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
  // filteredBLE.forEach((ble:Array<string>,i:number)=>{
  //   let tempObj: any = {};
  //  keysBLE.forEach((key:string,i:number)=>{
  //   tempObj[`${key[i]}`] = ble[i];

  //  })

  //   tempObj.ts = parseFloat(tempObj.ts);
  //   const dateFound = getDate(tempObj.ts);
  //   tempObj.date = dateFound;
  //   BLEData = [...BLEData, tempObj];
  // })
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

export const filterDataSet = (list: Array<any>, dataset: string) => {

  let datasetList: any = [];

  list.forEach((data: any) => {
    datasetList.push(data[`${dataset}`]);
  });

  const datasetListArray = datasetList.filter(
    (n: any, i: any) => datasetList.indexOf(n) === i
  );
  
  let alldatasetObj: any = [];
  datasetListArray.map((line: any) => {
    const tempObj = {
      chosendataSet: line,
      objArray: list.filter((obj: any) => obj[`${dataset}`] === line),
    };
    alldatasetObj = [...alldatasetObj, tempObj];
  });

  return alldatasetObj;
};

export const filterDataToSelect = (list: Array<any>) => {

  const numbersCheck = new RegExp(/^[(-9)-9.,]+$/);
  const lettersCheck = new RegExp(/^[a-zA-Z\s.,]+$/);
  const bothCheck = new RegExp(/^[A-Za-z0-9]*$/);
  const speaceCheck = new RegExp(/^\s*$/);
  const specialCharsCheck = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const dataList = list;

  let listKeys: Array<string> = [];
  let numbers: Array<string> = [];
  let letters: Array<string> = [];
  let numbersAndLetters: Array<string> = [];

  // dataList.length = 300;

  Object.keys(list[0]).map((elm: any) => {
    listKeys = [...listKeys, elm];
  });

  listKeys.map((key: string, i: number) => {
    dataList.forEach((obj: any, i: number) => {
      const tempValue = obj[`${key}`];

      if (speaceCheck.test(tempValue)) return;
      if (numbersCheck.test(tempValue)) {
        const exist = numbers.indexOf(`${key}`);

        if (exist === -1) {
          if (
            tempValue.length > 5 &&
            specialCharsCheck.test(tempValue) === false
          ) {
            const exist = numbersAndLetters.indexOf(`${key}`);
            if (exist === -1) {
              numbersAndLetters = [...numbersAndLetters, key];
            } else return;
          } else {
            numbers = [...numbers, key];
          }
        } else return;
      } else if (lettersCheck.test(tempValue)) {
        const exist = letters.indexOf(`${key}`);
        if (exist === -1) {
          letters = [...letters, key];
        } else return;
      } else if (bothCheck.test(tempValue)) {
        const exist = numbersAndLetters.indexOf(`${key}`);
        if (exist === -1) {
          numbersAndLetters = [...numbersAndLetters, key];
        } else return;
      }
    });
  });

  let newLetters = letters.map((key: string) => {
    const tempkeyArray = dataList.map((obj: any) => {
      return obj[`${key}`];
    });
    const sameValues = tempkeyArray.every((val, i, arr) => val === arr[0]);

    if (!sameValues) {
      return key;
    } else {
      return "empty";
    }
  });
  let newNumbers = numbers.map((key: string) => {
    const tempkeyArray = dataList.map((obj: any) => {
      return obj[`${key}`];
    });

    const sameValues = tempkeyArray.every((val, i, arr) => val === arr[0]);

    if (!sameValues) {
      return key;
    } else {
      return "empty";
    }
  });

  newNumbers = newNumbers.filter((key: string) => key !== "empty");
  newLetters = newLetters.filter((key: string) => key !== "empty");

  // console.log("numbers", newNumbers);
  // console.log("both", numbersAndLetters);
  // console.log("letters", newLetters);

  return { newNumbers, newLetters, numbersAndLetters };
};


