import { useState } from 'react';

import { Shop } from '../components/shop';

import { CartProvider } from '../contexts/cart.context';
import { ShopProvider } from '../contexts/shop.context';
import { SpeechProvider } from '../contexts/speech.context';

import { useAuth } from '../hooks/useAuth';
import { Login } from '../components/account/login';
import { Admin } from '../components/account/admin';

function App() {
  const { user, login, logout } = useAuth();
  const [selectedUser, setSelectedUser] = useState<string>();

  return (
    <>
      {!user && (
        <Login onLogin={login} />
      )}

      {user?.admin && !selectedUser && (
        <Admin onSelectUser={setSelectedUser} onLogout={logout} />
      )}

      {user && (!user.admin || selectedUser) && (
        <SpeechProvider>
          <CartProvider>
            <ShopProvider onLogout={logout} user={selectedUser || user._id!}>
              <Shop admin={user.admin} onClearSelectedUser={user.admin ? (() => setSelectedUser(undefined)) : undefined} onLogout={logout} />
            </ShopProvider>
          </CartProvider>
        </SpeechProvider>
      )}
    </>
  );
}

export default App;
