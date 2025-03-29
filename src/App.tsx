import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Analysis from './pages/analysis';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from the root to /welcome */}
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/analysis' element={<Analysis />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
