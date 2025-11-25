import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib/apolloClient";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

const AppContent = () => {
  const { employee, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-blue-400" />
      </div>
    );
  }

  return employee ? <DashboardPage /> : <LoginPage />;
};

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
