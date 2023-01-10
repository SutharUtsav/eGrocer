import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import MainContainer from "./components/MainContainer";
import { AnimatePresence } from "framer-motion";
import { Footer } from "./components/footer/Footer";

function App() {
  
  return (
    <AnimatePresence>
      <div className="w-100 h-auto flex flex-col ">
        <Header/>
        <main className="main-app">
          <Routes>
            <Route path="/*" element={<MainContainer/>}></Route>
          </Routes>
        </main>
        <Footer/>
      </div>
    </AnimatePresence>
  );
}

export default App;
