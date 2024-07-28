import logo from './logo.svg';
import './App.css';
import './tailwind.css'; 
import GamePage from './components/GamePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello from vignesh
        </p>
        <GamePage />
      </header>
    </div>
  );
}

export default App;
