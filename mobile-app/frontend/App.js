import * as React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppNavigation from './navigation/AppNavigation';




const App = () => {

  return (
    <AuthProvider>
      <AppNavigation/>
    </AuthProvider>
    
  );
};

export default App;


