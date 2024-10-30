export const getData = async(url) =>{

    if(!url){
        return;
    }
    try {
        const response = await fetch(url, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            
          },
         
        });
    
        if (!response.ok) {
          const errorText = await response.json();
         return errorText
        }
    
        const responseData = await response.json();
        console.log('Success:', responseData);
        return responseData
    
      } catch (error) {
        console.error('Error:', error);
        return error;
      }
    
    } 