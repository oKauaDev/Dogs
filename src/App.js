import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "./components/errors/Error";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Auths from "./components/login/Auths";
import PhotosViews from "./components/photosViews/PhotosViews";
import Profile from "./components/profile/Profile";
import Visit from "./components/profile/visit/Visit";
import { Storage } from "./Context";

function App() {
  return (
    <Storage>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PhotosViews />} />
          <Route path="/login/*" element={<Auths />} />
          <Route path="/conta/*" element={<Profile />} />
          <Route path="/perfil/:id" element={<Visit />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Storage>
  );
}

export default App;
