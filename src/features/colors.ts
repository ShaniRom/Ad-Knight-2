
//  import randomColor from 'node-random-color'
//  export const getColors =  async (data:any) => {

//     let backGroundColor:any = []
//     for(let i = 0; i < data.length; i++) {

//   //     const color = randomColor({
//   //         difference: data.length,
//   //         considerations: data.length,
//   //         brightness:true
//   //     });
//   //     backGroundColor.push(color)
  
//   //     console.log(color);
      
//   }


 export const getColors = (data:any) => {

  const backGroundColor = data.map((obj:any) => {
    const color = "#" + (Math.random().toString(16).substr(-6));
    
    
    return color
  })
  
  

  return backGroundColor
}
  
    

  
  // return backGroundColor
  //   let backGroundColor:any = []
  // //   for(let i = 0; i < data.length; i++) {

  // //     const color = randomColor({
  // //         difference: data.length,
  // //         considerations: data.length,
  // //         brightness:true
  // //     });
  // //     backGroundColor.push(color)
  
  // //     console.log(color);
      
  // // }
  // 
      






