interface NextPreviousProps {
  count: number;
  setCount: Function;
  dataAmount: number;
}

function NextPrevious(props: NextPreviousProps) {
  const { count, setCount, dataAmount } = props;

  function scrollNextPreviousByAmount(ev: any) {
    const clicked = ev.target.name;
   
  

    if(clicked === "previous" && count<=0 && dataAmount*count<=0 ) {
      alert("no more to scroll back to ");
    } else if (clicked === "previous") {
      const temp = count - 1;
      setCount(temp);
    }else if(clicked === "next") {
      const temp = count + 1;
      setCount(temp);
    }
  }

  return (
    <div className="buttons">
      <button
        className="buttons_previous"
        name="previous"
        type="button"
        onClick={scrollNextPreviousByAmount}
      >
        Previous
      </button>

      <button
        className="buttons_next"
        name="next"
        type="button"
        onClick={scrollNextPreviousByAmount}
      >
        Next
      </button>
    </div>
  );
}

export default NextPrevious;
