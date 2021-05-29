import { Shop } from '../components/shop';

import { CartProvider } from '../contexts/cart.context';
import { ShopProvider } from '../contexts/shop.context';
import { SpeechProvider } from '../contexts/speech.context';

import { useAuth } from '../hooks/useAuth';
import { Login } from '../components/account/login';
import { Admin } from '../components/account/admin';
import { useState } from 'react';

function App() {
  const { user, login, logout } = useAuth();
  const [ selectedUser, setSelectedUser ] = useState<string>();

  if (!user) {
    return (
      <Login onLogin={login} />
    )
  }

  if (user.admin && !selectedUser) {
    return <Admin onSelectUser={setSelectedUser} onLogout={logout} />
  }

  return (
    <SpeechProvider>
      <CartProvider>
        <ShopProvider user={selectedUser || user._id!}>
          <Shop admin={user.admin} onClearSelectedUser={() => setSelectedUser(undefined)} onLogout={logout} />
        </ShopProvider>
      </CartProvider>
    </SpeechProvider>
  );
}

export default App;
