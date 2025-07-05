import { FC, ReactNode } from 'react'
import Layout from './Layout'
import { AuthProvider } from '../contexts/AuthProvider'

// Wrap the application with AuthProvider
const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <Layout>
        {children}
      </Layout>
    </AuthProvider>
  );
};

export default AppProvider;
