import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './AppRoutes';
import ScrollToTop from './components/ScrollToTop';
import LeadPopup from './components/LeadPopup';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
        <LeadPopup />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
