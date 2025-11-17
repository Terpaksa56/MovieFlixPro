// Implementasi Praktis Performance Monitoring

import { performanceMonitor } from '@/utils/performance';
import { useEffect } from 'react';

/**
 * CONTOH 1: Monitor Page Load di Home.jsx
 */
export const ExampleHomeMonitoring = () => {
  useEffect(() => {
    // Log semua metrics saat page load
    const metrics = performanceMonitor.logPageMetrics();
    
    // Expected output:
    // DNS Lookup: ~50ms
    // TCP Connection: ~100ms
    // Request Time: ~150ms
    // Response Time: ~200ms
    // DOM Parsing: ~500ms
    // Resource Loading: ~200ms
    // Total Load Time: ~1500ms ✅
  }, []);
};

/**
 * CONTOH 2: Monitor API Calls
 */
export const ExampleApiMonitoring = async () => {
  const tmdbApi = await import('@/services/tmdb').then(m => m.tmdbApi);
  
  // Track individual API call
  const trending = await performanceMonitor.trackApiCall(
    'fetchTrending',
    tmdbApi.getTrending()
  );
  // Console output: ✅ fetchTrending: 1234.56ms
  
  const popular = await performanceMonitor.trackApiCall(
    'fetchPopular',
    tmdbApi.getPopular()
  );
  // Console output: ✅ fetchPopular: 1289.32ms
};

/**
 * CONTOH 3: Monitor React Component Render
 */
export const ExampleComponentMonitoring = () => {
  const renderStart = performance.now();
  
  // Component logic...
  
  const renderEnd = performance.now();
  performanceMonitor.trackRender('MovieCard', renderStart);
  // Console output: ⚡ Rendered MovieCard in 12.34ms
};

/**
 * CONTOH 4: Check Cache Effectiveness
 */
export const ExampleCacheMonitoring = () => {
  const tmdbApi = require('@/services/tmdb').tmdbApi;
  
  // First call - from API
  console.time('First Call');
  const movies1 = await tmdbApi.getTrending();
  console.timeEnd('First Call');
  // First Call: ~1500ms (from API)
  
  // Second call - from cache
  console.time('Second Call');
  const movies2 = await tmdbApi.getTrending();
  console.timeEnd('Second Call');
  // Second Call: ~1ms (from cache) ⚡
  
  // Cache stats
  performanceMonitor.cacheStats(movieCache);
};

/**
 * CONTOH 5: Full Page Load Analysis
 */
export const FullPageLoadAnalysis = () => {
  useEffect(() => {
    // Hook ke semua critical metrics
    
    // 1. Initial page load
    const navMetrics = performanceMonitor.logPageMetrics();
    
    // 2. API calls
    performanceMonitor.trackApiCall('Initial Data', loadInitialData());
    
    // 3. Monitor resource loading
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log(`Resource: ${entry.name}, Duration: ${entry.duration.toFixed(2)}ms`);
      }
    });
    
    observer.observe({ entryTypes: ['resource'] });
    
    return () => observer.disconnect();
  }, []);
};

/**
 * CONTOH 6: Real-time Performance Dashboard
 */
export const PerformanceDashboard = () => {
  const [metrics, setMetrics] = React.useState({});
  
  useEffect(() => {
    const interval = setInterval(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      
      if (perfData) {
        setMetrics({
          dns: (perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2),
          tcp: (perfData.connectEnd - perfData.connectStart).toFixed(2),
          request: (perfData.responseStart - perfData.requestStart).toFixed(2),
          response: (perfData.responseEnd - perfData.responseStart).toFixed(2),
          domParse: (perfData.domInteractive - perfData.domLoading).toFixed(2),
          resource: (perfData.loadEventStart - perfData.domContentLoadedEventEnd).toFixed(2),
          total: (perfData.loadEventEnd - perfData.fetchStart).toFixed(2),
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="performance-dashboard">
      <h2>Performance Metrics (ms)</h2>
      <table>
        <tbody>
          {Object.entries(metrics).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * CONTOH 7: Performance Alerts
 */
export const PerformanceAlerts = () => {
  useEffect(() => {
    const perfData = performance.getEntriesByType('navigation')[0];
    
    if (!perfData) return;
    
    const totalTime = perfData.loadEventEnd - perfData.fetchStart;
    const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime;
    const lcp = performance.getEntriesByName('largest-contentful-paint').pop()?.startTime;
    
    // Alerts
    if (totalTime > 3000) {
      console.warn(`⚠️ Total load time too high: ${totalTime}ms`);
    }
    if (fcp > 1800) {
      console.warn(`⚠️ First Contentful Paint too high: ${fcp}ms`);
    }
    if (lcp > 2500) {
      console.warn(`⚠️ Largest Contentful Paint too high: ${lcp}ms`);
    }
  }, []);
};

/**
 * CONTOH 8: API Request Pattern Analysis
 */
export const AnalyzeApiPattern = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      // Group by URL
      const byUrl = {};
      entries.forEach(entry => {
        if (entry.name.includes('omdbapi.com')) {
          byUrl[entry.name] = (byUrl[entry.name] || 0) + 1;
        }
      });
      
      console.log('API Request Pattern:', byUrl);
      
      // Analyze if concurrent
      const times = entries.map(e => ({ start: e.fetchStart, end: e.responseEnd }));
      const concurrent = times.filter((t, i) => 
        times.some((t2, j) => i !== j && t.start < t2.end && t.end > t2.start)
      ).length;
      
      console.log(`Concurrent requests detected: ${concurrent}`);
    });
    
    observer.observe({ entryTypes: ['resource'] });
    return () => observer.disconnect();
  }, []);
};

/**
 * CONTOH 9: Memory Usage Monitoring
 */
export const MonitorMemoryUsage = () => {
  useEffect(() => {
    if (!performance.memory) {
      console.log('Memory API not available in this browser');
      return;
    }
    
    const interval = setInterval(() => {
      const memory = performance.memory;
      const usedPercent = ((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(2);
      
      console.log(`
        Memory Usage:
        - Used: ${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB
        - Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)}MB
        - Used: ${usedPercent}%
      `);
      
      if (usedPercent > 80) {
        console.warn('⚠️ High memory usage!');
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
};

/**
 * CONTOH 10: Complete Performance Report
 */
export const GeneratePerformanceReport = () => {
  return {
    timestamp: new Date().toISOString(),
    pageMetrics: performanceMonitor.logPageMetrics(),
    userAgent: navigator.userAgent,
    connection: {
      effectiveType: navigator.connection?.effectiveType,
      downlink: navigator.connection?.downlink,
      rtt: navigator.connection?.rtt,
      saveData: navigator.connection?.saveData,
    },
    memory: performance.memory ? {
      used: performance.memory.usedJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit,
    } : null,
  };
};

// =======================================================================
// CARA MENGGUNAKAN DI APLIKASI
// =======================================================================

/*
1. Di Home.jsx:
   useEffect(() => {
     const report = GeneratePerformanceReport();
     console.log('Performance Report:', report);
   }, []);

2. Di API calls:
   const data = await performanceMonitor.trackApiCall(
     'fetchData',
     tmdbApi.getTrending()
   );

3. Di Component render:
   performanceMonitor.trackRender('HomeComponent', renderStart);

4. Monitoring:
   - Open Console (F12)
   - Look for ✅ (success) or ⚠️ (warning) messages
   - Check total load time

5. Production Setup:
   - Send metrics ke analytics service
   - Setup alerts untuk slow pages
   - Monitor user experience

*/

export default {
  performanceMonitor,
  ExampleHomeMonitoring,
  ExampleApiMonitoring,
  PerformanceDashboard,
  GeneratePerformanceReport,
};
