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

library.add(fas);

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      // useMutation마다 default onError를 달아줌 -> tanstack-query의 모든 mutation의 실패 시 이 onError를 자동 호출
      // 따라서 각 useMutation은 더이상 onError들 달아줄 필요 없음(추가하면 해당 local onError가 실행됨)
      onError: (error: unknown) => {
        // 'error'는 response interceptor에서 전달됨
        // mutation의 onError는 onError의 타입이 unknown인 걸 기대하고 있으므로 
        // 일단 unknown으로 받은 뒤 안에서 ErrorType으로 타입캐스팅 해줘야 함

        if (axios.isAxiosError(error)) {
          // 별도의 에러 핸들링(HTTP status code가 4xx, 5xx이어서 발생한 오류)
        } else {
          // HTTP status code는 200, 자체 에러 핸들링
          const err = error as ErrorType
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
