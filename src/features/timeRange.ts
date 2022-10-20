  // -----Filtering by the time frame the user chose  --------
export function findTimeFrame(someData: any) {
  
  let timeList: any = [];
  
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
  
  return timeRange;
}
