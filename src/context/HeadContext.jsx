import { createContext, useContext } from 'react';

/**
 * Only populated during the build-time SSR pass (see entry-server.jsx).
 * PageHead writes into it synchronously during render so the prerender
 * script can read the collected title/meta/JSON-LD after renderToString.
 */
export const HeadContext = createContext(null);

export const useHeadContext = () => useContext(HeadContext);
