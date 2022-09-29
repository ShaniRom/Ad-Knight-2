
export function findTimeFrame(someData: any) {
  let timeList: any = [];
  console.log(someData)

  someData.forEach((data: any) => {
    timeList.push(data.date);
  });

  const timeRange = timeList.filter((date: any, i: number, arr: any) => {
    return (
      arr.indexOf(
        arr.find(
          (t: any) =>
            t.year === date.year &&
            t.month === date.month &&
            t.day === date.day &&
            t.hours === date.hours &&
            t.minutes === date.minutes &&
            t.seconds === date.seconds
        )
      ) === i
    );
  });
  console.log(timeRange);
  
  return timeRange;
}
