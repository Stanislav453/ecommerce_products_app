import { QueryClient } from '@tanstack/react-query';

/**
 * ✅ FIXED: Centralized QueryClient configuration
 * 
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original file had: export const queryClient = new QueryClient();
 * But main.tsx created its own QueryClient with custom options, making this file unused.
 * 
 * PROBLEMS:
 * 1. Duplication: Two QueryClient instances (one unused, one in main.tsx)
 * 2. Confusion: Developers might not know which one to use
 * 3. Maintenance: Changes to query config require updating main.tsx instead of a centralized file
 * 4. Testing: Harder to test when QueryClient is created inline
 * 
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Single source of truth for QueryClient configuration
 * - All query options centralized in one place
 * - Easier to maintain and test
 * - Can be imported and reused across the app
 * - Better separation of concerns
 * 
 * CONFIGURATION EXPLANATION:
 * - refetchOnWindowFocus: false - Prevents refetching when user switches browser tabs
 * - refetchOnReconnect: false - Prevents refetching when internet reconnects
 * - retry: 1 - Retry failed queries once before giving up
 * - staleTime: 10 minutes - Data is considered fresh for 10 minutes
 * 
 * LEARN MORE:
 * - React Query configuration: https://tanstack.com/query/latest/docs/react/reference/QueryClient
 * - Query options: https://tanstack.com/query/latest/docs/react/reference/useQuery
 * - Best practices: https://tanstack.com/query/latest/docs/react/guides/important-defaults
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});
