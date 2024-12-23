import CryptoList from './pages/CryptoList';
import CryptoDetail from './pages/CryptoDetail';
import { ROUTE_PATHS } from './util/constants/routes';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/global.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATHS.HOME} element={<MainLayout/>}>
        <Route index element={<CryptoList/>}/>
        <Route path={`${ROUTE_PATHS.CRYPTO_DETAIL}/:id`} element={<CryptoDetail/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;