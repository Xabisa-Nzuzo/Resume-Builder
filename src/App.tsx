import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';

import Home from './pages/Home';
import TemplateSelection from './pages/TemplateSelection';
import ATSOptimize from './pages/ATSOptimize';
import Export from './pages/Export';

function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<TemplateSelection />} />
          <Route path="/optimize" element={<ATSOptimize />} />
          <Route path="/export" element={<Export />} />
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  );
}

export default App;