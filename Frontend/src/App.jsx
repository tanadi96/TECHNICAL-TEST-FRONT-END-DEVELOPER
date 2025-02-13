


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'

import FuelTransaction from './pages/FuelTransaction'
import PageNotFound from './pages/PageNotFound'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="reports/fuel-transaction-histories" element={<FuelTransaction />} />
        <Route path="page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>


    </BrowserRouter>
  )
}

export default App
