import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@/App.css'
import { DependencyProvider } from './base/adapters/ui/context/dependency-provider';
import { chooseDefaultApi } from './base/utils/base-utils';
import UserListPage from './base/adapters/ui/pages/user-list-page';
import UserDetailPage from './base/adapters/ui/pages/user-detail-page';
import CreateUserPage from './base/adapters/ui/pages/create-user-page';

const queryClient = new QueryClient();
console.log("query client changed");

const App: React.FC = () => {

  const {userPort, taskPort, name, displayName} = chooseDefaultApi();

  return (
    <QueryClientProvider client={queryClient}>
      <DependencyProvider
        apiName={name}
        apiDisplayName={displayName}
        defaultUserPort={userPort}
        defaultTaskPort={taskPort}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/new" element={<CreateUserPage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />

            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </DependencyProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
