import './App.css';
import { layout, widgets } from './components';

function App() {
  return (
    <div className='App-container'>
        <layout.Header />
        <layout.Banner />
        <layout.About />
        <layout.Contact />
        <layout.Footer />
    </div>

  );
}

export default App;
