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


    async function changeChartData(ev:any){
        ev.preventDefault()


        const min = ev.target.elements.min.value
        const max = ev.target.elements.max.value
        const tempData = dataSaved.filter((obj:any) => obj.Year >= min && obj.Year <= max)
       
        
        let backgroundcolor:any = []
        // console.log(tempData);
        setfilteredData(tempData)
        getColors(tempData).then((result) => {
          const colors = result          
          colors.map((color:any) => {
            backgroundcolor.push(color)
          })
           
           
         })
        
        const tempChartData = {
          labels : tempData.map((obj:any) => obj.Year),
          datasets: [
            {
              label: "lalala",
              data: tempData.map((data: any) => `${data.MAM}`),
              backgroundColor: backgroundcolor,
            }]
        };
            
        await setYears(tempChartData)
        await setChoseYears(true)
        // if(ev.target.input.value !== "submit"){
        //   ev.target.input.value = ""
        // }
         
    }

    
  return (
    <form className='formChooseData' onSubmit={changeChartData}>
        <label htmlFor="selectData">select data:</label>
      <select className="formChooseData_selectData" name="changeLabels">
        <option  value="BLE">BLE</option>
        <option value="WIFI">WIFI</option>
        
      </select>
      
        <label htmlFor="selectdataSet">select data:</label>
      <select className="formChooseData_selectDataset" name="selectdataSet">
        <option  value="mac1">MAC 1</option>
        <option  value="mac2">MAC 2</option>
      </select>
      <button type='submit'>submit</button>
    </form>
  )
 
}

export default Form