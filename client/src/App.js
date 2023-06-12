import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//Pages
import Home from "./pages/Home";
import DataForm from "./pages/api_form/DataForm";
import Collection from "./pages/list/Collection";
import Manga from "./pages/product/Manga";
import SignIn from "./pages/sign/SignIn";
//Components
import NavBar from "./components/navigation/NavBar";
import Type from "./pages/list/Type";
import SignUp from "./pages/sign/SignUp";


function App() {
    return (
        <div className="App">
            <NavBar/>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/dataform" element={<DataForm/>}/>
                    <Route path="/types/:typeID" element={<Type/>}/>
                    <Route path="/collections/:collectionId" element={<Collection/>}/>
                    <Route path="/mangas/:mangaId" element={<Manga/>}/>
                    <Route path="/sign/signin" element={<SignIn/>}/>
                    <Route path="/sign/signup" element={<SignUp/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
