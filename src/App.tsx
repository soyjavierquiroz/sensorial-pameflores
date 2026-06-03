import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { resolveDnaDocumentTheme, resolveDnaForPath, resolveFunnelVersionFromPath } from './dna.config';
import analytics from './core/services/analytics';
import { ExpertTheme } from './components/themes/expert/ExpertTheme';
import { Success } from './pages/Success';

function RoutedApp() {
  const location = useLocation();
  const isSuccessRoute = location.pathname === '/confirmacion';
  const activeDna = resolveDnaForPath(location.pathname);
  const activeVersion = resolveFunnelVersionFromPath(location.pathname);

  useEffect(() => {
    const documentTheme = resolveDnaDocumentTheme(activeDna.theme);
    const nextTitle = isSuccessRoute
      ? `${activeDna.copy.productName} - Confirmacion`
      : `${activeDna.copy.productName} - Registro`;

    document.documentElement.setAttribute('data-theme', documentTheme);
    document.title = nextTitle;

    void analytics.trackEvent('PageView', {
      source: 'AppLoad',
      theme: activeDna.theme,
      funnel_version: activeVersion,
    });
  }, [activeDna, activeVersion, isSuccessRoute, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<ExpertTheme version="v2" />} />
      <Route path="/libro" element={<ExpertTheme version="v2" />} />
      <Route path="/v1" element={<ExpertTheme version="v1" />} />
      <Route path="/libro-v1" element={<ExpertTheme version="v1" />} />
      <Route path="/confirmacion" element={<Success />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return <RoutedApp />;
}

export default App;
