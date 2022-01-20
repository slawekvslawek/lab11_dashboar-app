//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from "./components/NavBar";
import {Dashboard} from "./components/Dashboard";

const styles = {
   display: 'flex',
   justifyContent: 'space-between'
};

function App() {
   return (
       <div className="App">
           <NavBar/>
           <Dashboard/>
       </div>
   );
}

export default App;
