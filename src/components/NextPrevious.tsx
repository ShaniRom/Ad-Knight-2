

interface NextPreviousProps{
    count:number
  setCount:Function
}


function NextPrevious(props:NextPreviousProps) {

    const {count,setCount} = props;

    function scrollNextPrevious(ev:any){
        const clicked = ev.target.name
        if(clicked === "next"){
            const temp = count + 1
            setCount(temp)
        }else if(clicked === "previous"){
            const temp = count - 1
            setCount(temp)
        }
    }


  return (
    <div  className='buttons'>
        <button  className="buttons_previous" name="previous" type="button" onClick={scrollNextPrevious}>Previous</button>
      <button className="buttons_next" name="next" type="button" onClick={scrollNextPrevious}>Next</button>
    </div>
  )
}

export default NextPrevious