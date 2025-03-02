
import { useLocation } from 'react-router-dom';


const Map = () =>{
    const location = useLocation();
    const { result } = location.state || {};

    
    
  return(
    <div>
      {console.log(result)}
    <p> {result} </p>
    
    </div>
  )
}

export default Map; 