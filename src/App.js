import React, {   createContext, useState } from "react"; 
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles"; 
import NavBar from "./component/Navbar"; 
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; 
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import { navBarData } from "./features/navbarSlice";
 
 
const themeLight = createTheme({
  palette: {
    background: {
      main: "#e4f0e2"
    },
    text: {
      primary: "#222222",
      secondary:'rgba(0, 0, 0, 0.6)'
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      main: "#222222"
    },
    text: {
      primary: "#ffffff",
      secondary:'rgba(255, 255, 255, 0.7)'
    }
  }
}); 
export const SearchContext = createContext();

function App() {
  const navState = useSelector(navBarData); 
  
  const [isSearch,setIsSearch] = useState(''); 
  return ( 
    <ThemeProvider theme={navState.isLight ? themeLight : themeDark}>  
      <SearchContext.Provider value={{isSearch,setIsSearch}}>
      <CssBaseline/>
      <BrowserRouter>
        <NavBar/>  
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/Notes-app" element={<Home/>}/> 
          <Route path="/search" element={<Search/>}/> 
        </Routes> 
      </BrowserRouter>
      </SearchContext.Provider>
    </ThemeProvider> 
  );
}
 

export default App;
