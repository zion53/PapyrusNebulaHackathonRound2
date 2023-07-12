import React, { useState } from 'react';
import TemplatePage from './pages/templateSelectionPage.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormPage from './pages/formsPage.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TemplatePage/>} />
        <Route path='/create-cv' element={<FormPage/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;