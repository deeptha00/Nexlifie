import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { HeadContext } from './context/HeadContext';
import AppRoutes from './AppRoutes';
import servicesData from './data/servicesData';

export const serviceSlugs = servicesData.map((s) => s.slug);

export function render(url) {
  const head = {
    title: '',
    description: '',
    canonical: '',
    ogImage: '',
    ogType: 'website',
    structuredData: [],
  };

  const html = renderToString(
    <HeadContext.Provider value={head}>
      <ThemeProvider>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </ThemeProvider>
    </HeadContext.Provider>
  );

  return { html, head };
}
