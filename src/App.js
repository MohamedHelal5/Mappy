import './App.css';
import { Sidebar } from './Components/Sidebar';
import { Navbar } from './Components/Navbar';
import { Closedsource } from './Components/Closedsource';

function App() {

  return (
    <>
      <div className='row'>
        <Navbar />
        <div className='col-3 side'>
          <Sidebar />
        </div>
        <div className='col-9'>
          <Closedsource />
        </div>
      </div>
    </>
  );
}

export default App;