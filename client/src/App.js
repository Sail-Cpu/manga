import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import Home from "./pages/Home";
import DataForm from "./pages/api_form/DataForm";
import Collection from "./pages/list/Collection";
import Category from "./pages/list/Category";
import Manga from "./pages/product/Manga";
import SignIn from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import Type from "./pages/list/Type";
import User from "./pages/user/User";
import AllMangas from "./pages/list/AllMangas";
//Components
import NavBar from "./components/navigation/NavBar";
import { UserContext } from "./context/UserContext";
import AllCollections from "./pages/list/AllCollections";

function App() {
  const [activeNav, setActiveNav] = useState(false);

  const { getToken } = useContext(UserContext);

  return (
    <div className="App">
      <Router>
        <NavBar activeNav={activeNav} setActiveNav={setActiveNav} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dataform" element={<DataForm />} />
          <Route path="/types/:typeID" element={<Type />} />
          <Route path="/collections/:collectionId" element={<Collection />} />
          <Route path="/allmangas/:allMangaPage" element={<AllMangas />} />
          <Route
            path="/allCollections/:allCollectionPage"
            element={<AllCollections />}
          />
          <Route path="/mangas/:mangaId" element={<Manga />} />
          <Route path="/category/:categoryID" element={<Category />} />
          <Route path="/sign/signin" element={<SignIn />} />
          <Route path="/sign/signup" element={<SignUp />} />
          {getToken() && <Route path="/user" element={<User />}></Route>}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
