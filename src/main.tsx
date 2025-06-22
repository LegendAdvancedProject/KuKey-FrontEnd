import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '../src/shared/styles/components.css';
import '../src/shared/styles/global.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorType } from './shared/types/errorType.ts';
import { handleQueryError } from './shared/utils/handleQueryError.ts';
import axios from 'axios';
import ReactModal from 'react-modal';

library.add(fas);
ReactModal.setAppElement('#root');

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error: unknown) => {
        if (axios.isAxiosError(error)) {
          // HTTP 통신 문제, 별도 처리 로직 구현 필요
        } else {
          // HTTP status code는 200, 자체 에러 핸들링
          const err = error as ErrorType;
          handleQueryError(err);
        }
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
