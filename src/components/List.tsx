import {useEffect,useState} from 'react'
import {filterByMac1} from '../features/filter'

interface ListProps{
    bleData:any 
    wifiData:any 
    wifiBLE:any
}


function List(props:ListProps) {

    const [list,setList] = useState<any>()

    const {bleData, wifiData ,wifiBLE} = props;

    useEffect(()=>{

        const mac1list = filterByMac1(bleData);
        console.log(mac1list);
        setList(mac1list)

    },[])
    console.log(list);
    
  return (

    <div className='main_list'>
        {list.map((obj:any) => {
            return (
                <div>{obj.mac1Value}</div>
            )
        })}
    </div>
  )
}

export default List