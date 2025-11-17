// Performance Monitoring Utility
// Add ini ke main.jsx atau App.jsx untuk track performance

export const performanceMonitor = {
  // Track page load metrics
  logPageMetrics: () => {
    if (typeof window.performance === 'undefined') return;

    const perfData = performance.getEntriesByType('navigation')[0];
    if (!perfData) return;

    const metrics = {
      'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
      'TCP Connection': perfData.connectEnd - perfData.connectStart,
      'Request Time': perfData.responseStart - perfData.requestStart,
      'Response Time': perfData.responseEnd - perfData.responseStart,
      'DOM Parsing': perfData.domInteractive - perfData.domLoading,
      'Resource Loading': perfData.loadEventStart - perfData.domContentLoadedEventEnd,
      'Total Load Time': perfData.loadEventEnd - perfData.fetchStart,
    };

    console.table(metrics);
    return metrics;
  },

  // Track API call timing
  trackApiCall: async (name, promise) => {
    const start = performance.now();
    try {
      const result = await promise;
      const end = performance.now();
      const duration = end - start;
      console.log(`✅ ${name}: ${duration.toFixed(2)}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(`❌ ${name}: ${(end - start).toFixed(2)}ms - ${error.message}`);
      throw error;
    }
  },

  // Track React component render time
  trackRender: (componentName, startTime) => {
    const duration = performance.now() - startTime;
    console.log(`⚡ Rendered ${componentName} in ${duration.toFixed(2)}ms`);
  },

  // Analyze bundle size
  reportBundleMetrics: () => {
    // Use in build process
    console.log(`
    📦 Bundle Analysis:
    - Run: npm run build
    - Check dist/ folder size
    - Target: < 300KB (gzipped: < 100KB)
    `);
  },

  // Check cache effectiveness
  cacheStats: (cacheManager) => {
    console.log(`
    💾 Cache Statistics:
    - Cache size: ${cacheManager.cache.size} entries
    - Active timers: ${cacheManager.timers.size}
    `);
  },
};

// Usage in React Component:
/*
import { useEffect } from 'react';
import { performanceMonitor } from '@/utils/performance';

export default function Home() {
  useEffect(() => {
    const startTime = performance.now();
    
    // ... component logic ...
    
    performanceMonitor.trackRender('Home', startTime);
    performanceMonitor.logPageMetrics();
  }, []);

  return (...);
}
*/

// Usage in API call:
/*
import { tmdbApi } from '@/services/tmdb';
import { performanceMonitor } from '@/utils/performance';

const trending = await performanceMonitor.trackApiCall(
  'fetchTrending',
  tmdbApi.getTrending()
);
*/
