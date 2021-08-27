
import './App.css';
import GenerateText from './Components/GenerateText';
import Navbar from './Components/Navbar';
import { COUNT } from './Components/Constants.js'
let App = () => {
  return (
    <>
    <Navbar/>
    <GenerateText/>
    </>
  );
}

export default App;
