import React, { useEffect } from 'react';
import axios from './axios' 
import cors from 'cors' 
import express, { response } from 'express'; 




// app.get('/', (request, response) => {
//     response.send('Everything has been received');
// })


function App() {

  // useEffect(() => {
  //   axios.get('/');
  //   }, []) 

    const app = express() 


    app.use(express.json())

    const handleExampleToBackendButton = (event) => {
      event.preventDefault(); 
      axios.get('http://localhost:5000').then(response => {
        console.log('backend works', response)
      }); 
      
    }


  return (
    <div>
        <h1>Client Frontend Part</h1> 
        {/* To Check frontend -> backend: */} 

        <div>
          <input type='submit' value={'To Backend'} onClick={handleExampleToBackendButton}></input>
        </div>
        
        
        
       
        
        
    </div>
  );
}

export default App;
