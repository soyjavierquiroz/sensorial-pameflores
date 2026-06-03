import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { DNA, resolveDnaDocumentTheme } from './dna.config';
import analytics from './core/services/analytics';
import { ExpertTheme } from './components/themes/expert/ExpertTheme';
import { Success } from './pages/Success';

function RoutedApp() {
  const location = useLocation();
  const isSuccessRoute = location.pathname === '/confirmacion';

  useEffect(() => {
    const documentTheme = resolveDnaDocumentTheme();
    const nextTitle = isSuccessRoute
      ? `${DNA.copy.productName} - Confirmacion`
      : `${DNA.copy.productName} - Registro`;

    document.documentElement.setAttribute('data-theme', documentTheme);
    document.title = nextTitle;

    void analytics.trackEvent('PageView', {
      source: 'AppLoad',
      theme: DNA.theme,
    });
  }, [isSuccessRoute, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<ExpertTheme />} />
      <Route path="/libro" element={<ExpertTheme />} />
      <Route path="/confirmacion" element={<Success />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return <RoutedApp />;
}

export default App;
