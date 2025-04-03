import './App.css';
import Portfolio from './components/Portfolio';
import ReactGA from 'react-ga4';



const TRACKING_ID = "G-TY3WKYGXCV"; 
ReactGA.initialize(TRACKING_ID);

function App() {

  ReactGA.send("pageview");
  
  return (
    <div className="App">
      <Portfolio />
    </div>
  );
}

export default App;
