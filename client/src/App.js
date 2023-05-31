import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import Home from "./pages/Home";
import DataForm from "./pages/api_form/DataForm";
import Collection from "./pages/list/Collection";
//Components
import NavBar from "./components/navigation/NavBar";
import Type from "./pages/list/Type";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dataform" element={<DataForm />} />
          <Route path="/types/:typeID" element={<Type />} />
          <Route path="/collections/:collectionId" element={<Collection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
