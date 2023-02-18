import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//Components
import NavBar from './components/navigation/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

export default App;
