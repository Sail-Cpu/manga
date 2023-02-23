import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//Pages
import Home from './pages/Home';
import DataForm from './pages/api_form/DataForm';
//Components
import NavBar from './components/navigation/NavBar';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dataform' element={<DataForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
