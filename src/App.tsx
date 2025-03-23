import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import ErrorBoundary from './components/shared/error-boundary';
import './index.scss';
import HomePage from './pages/home-page';
import NotFound from './pages/not-found-page';
import { ThemeProvider } from './context/themeProvider';

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <ThemeProvider>
          <div className="app">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home/*" element={<HomePage />}></Route>
              <Route path="/not-found" element={<NotFound />} />
            </Routes>
          </div>
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
