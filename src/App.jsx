import { Routes, Route } from "react-router-dom";
import Navbar from "./components/nav";
import "./App.css";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Articles from "./components/Article";
import ArticleDetail from "./components/ArticleDetails";
import Appointment from "./components/Appointement";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/articles" element={<Articles />}></Route>
          <Route path="/articles/:id" element={<ArticleDetail />}></Route>
          <Route path="/appointement" element={<Appointment />}></Route>
        </Routes>
      </HelmetProvider>
    </>
  );
}

export default App;
