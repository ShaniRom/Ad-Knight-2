import React,{useEffect} from 'react'
import '../style/style.scss';
import {getColors} from '../features/colors'

interface FormProps{
  setYears:Function;
    dataSaved:Array<any>
    userData:any;
    setChoseYears:Function;
    setfilteredData:Function
}


function Form(props:FormProps) {

const {setYears,dataSaved,userData,setChoseYears,setfilteredData} = props;


    async function chooseChartData(ev:any){
        ev.preventDefault()

         
    }

    
  return (

    <form className='formChooseData' onSubmit={chooseChartData}>
      <label htmlFor="selectData">select Data:</label>
      <select className="Data" name="selectData">
        <option  value="WIFI">WIFI</option>
        <option value="BLE">BLE</option>
      </select>
      <label htmlFor="selectDataSet">select data set:</label>
      <select className="dataset" name="selectDataset">
        <option  value="mac1">mac 1</option>
        <option value="mac2">mac 2</option>
      </select>
      <button type="submit">submit</button>
      </form>
  )
 
}

export default Form