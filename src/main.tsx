import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '../src/shared/styles/components.css';
import '../src/shared/styles/global.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorType } from './shared/types/errorType.ts';
import { handleQueryError } from './shared/utils/handleQueryError.ts';

library.add(fas);

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error: unknown) => {
        // mutation의 onError는 onError의 타입이 unknown인 걸 기대하고 있으므로 
        // 일단 unknown으로 받은 뒤 안에서 ErrorType으로 타입캐스팅 해줘야 함
        const err = error as ErrorType
        handleQueryError(err);
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
