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


    async function setyears(ev:any){
        ev.preventDefault()


        const min = ev.target.elements.min.value
        const max = ev.target.elements.max.value
        const tempData = dataSaved.filter((obj:any) => obj.Year >= min && obj.Year <= max)
       
        
        let backgroundcolor:any = []
        console.log(tempData);
        setfilteredData(tempData)
        getColors(tempData).then((result) => {
          const colors = result.backGroundColor          
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
    <form className='formYears' onSubmit={setyears}>
        <label htmlFor="min">Search from year-</label>
        <input min={1800} max={2022} name='min' type="number" required/> <br />
        <label htmlFor="max">Till year-</label>
        <input min={1800} max={2022} name='max' type="number" required/><br />
        <input name='submit' type="submit" value="submit"/>
    </form>
  )
 
}

export default Form