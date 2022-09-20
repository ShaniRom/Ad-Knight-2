



 export const getColors = (data:any) => {

  const backGroundColor = data.map((obj:any) => {
    const color = "#" + (Math.random().toString(16).substr(-6));
    
    
    return color
  })
  
  

  return backGroundColor
}
  
    

      






