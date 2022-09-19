 import randomColor from 'node-random-color'
 export const getColors =  async (data:any) => {
    
    let backGroundColor:any = []
    for(let i = 0; i < data.length; i++) {

      const color = randomColor({
          difference: data.length,
          considerations: data.length,
          brightness:false
      });
      backGroundColor.push(color)
  
      console.log(color);
      
  }
  return backGroundColor
      
}





