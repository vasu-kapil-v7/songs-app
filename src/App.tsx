import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AppRoutes from './routes';





function App() {
  return (
    <BrowserRouter>
     <RecoilRoot>
        <AppRoutes />
      </RecoilRoot>
  </BrowserRouter>
  );
}

export default App;
