import './App.css';
import { layout, widgets } from './components';

function App() {
  return (
    <div className='App-container'>
        <layout.Header />
        <div className='App-content'>
          <layout.Banner />
          <layout.About />
          <layout.Contact />
        </div>
        <layout.Footer />
    </div>

  );
}

export default App;
