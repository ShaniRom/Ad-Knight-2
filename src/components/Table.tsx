
import React, { useEffect ,useState} from 'react'
import '../style/style.scss'


interface TableProps {
    chartData:any;
    chartClicked:boolean;
    keysOfObj:Array<any>
}
function Table(props:TableProps) {

    const {chartData,chartClicked,keysOfObj} = props;

    const [monthsList , setMonthsList] = useState<any>(["Jan" , "Feb" ,"Mar" , "Apr" ,"May" , "Jun" ,
    "Jul" , "Aug" ,"Sep" , "Oct" ,"Nov" , "Dec"])
    const [monthsData , setMonthsData] = useState<any>([])

    


if(chartClicked){
    return (
        <div>
            <h1>Global Temperature Time Series - monthly</h1>
            <table className='table tableElms'>
                <thead className='table-thead tableElms'>
                    <tr className='table-tr tableElms'> 
                        <th className='table-th tableElms'>Year</th>
                        
                        {monthsList.map((month:any,i:any) => {
                            return (
                                <th key={i} className='table-th tableElms'>{month}</th>
                            )
                        })}
                        
    
                    </tr>
                </thead>
                <tbody className='table-tBody tableElms'>
                    <tr className='table-tr tableElms'>
                        {chartClicked?<td className='table-td tableElms'>{chartData["Year"]}</td>:
                        <td className='table-td tableElms'>year..</td>}
                        {monthsList.map((month:any,i:any) => {
                                return (
                                    <td key={i} className='table-td tableElms'>{chartData[month]}</td>
                                )
                                })}
                    </tr>
                </tbody>
            </table>
        </div>
      )
    
}else {
    return (
        <div>
            <h1>Global Temperature Time Series - monthly</h1>
            <table className='table tableElms'>
                <thead className='table-thead tableElms'>
                    <tr className='table-tr tableElms'> 
                        <th className='table-th tableElms'>Year</th>
                        {monthsList.map((month:any,i:any) => {
                            return (
                                <th key={i} className='table-th tableElms'>{month}</th>
                            )
                        })}
                        
                    </tr>
                </thead>
                <tbody className='table-tBody tableElms'>
                    <tr className='table-tr tableElms'>
                        <td className='table-td tableElms'>year..</td>
                        <td className='table-td tableElms'>months..</td>
                    </tr>
                </tbody>
            </table>
        </div>
      )
}
 
}

export default Table