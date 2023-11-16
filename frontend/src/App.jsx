import React from 'react'
import HomePage from './components/HomePage'
import { Route, Routes } from 'react-router-dom';
import SelectLanguage from './components/SelectLanguage';
import Python from './game/languages/Python'
import Java from './game/languages/Java'
import C from './game/languages/C'
import Js from './game/languages/Js';

const App = () => {
  return (
    
      <Routes>
        <Route path = "/" element={<HomePage/>}/>
        <Route path = "/selectedlanguage" element={<SelectLanguage/>}/>
        <Route path = "/python" element={<Python/>}/>
        <Route path = "/java" element={<Java/>}/>
        <Route path = "/c" element={<C/>}/>
        <Route path = "/js" element={<Js/>}/>
      </Routes>
  )
}

export default App
