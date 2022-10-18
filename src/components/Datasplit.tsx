

interface DatasplitProps{
    setDataAmount:Function;
}

function Datasplit(props:DatasplitProps) {

    const { setDataAmount} = props;

    function setdataAmount(ev:any){
        ev.preventDefault()
        const amount = ev.target.elements.setAmount.value;
        setDataAmount(amount)
        
        
    }
  return (
    <>
    <form onSubmit={setdataAmount}>
    <label htmlFor="setAmount">set Amount of data :
        <input name='setAmount' type="number" min={10} max={20000} required/>
            </label>
            <button type='submit'>submit</button>
            </form>
    </>
  )
}

export default Datasplit