import { useState } from 'react';

import { Shop } from '../components/shop';

import { CartProvider } from '../contexts/cart.context';
import { ShopProvider } from '../contexts/shop.context';
import { SpeechProvider } from '../contexts/speech.context';

import { useAuth } from '../hooks/useAuth';
import { Login } from '../components/account/login';
import { Admin } from '../components/account/admin';
import { NotificationProvider } from 'contexts/notification/notification.provider';
import { useRouteMatch } from 'react-router-dom';
import { Registry } from 'components/registry';
import { registrySchema } from 'constants/product/schema';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#019393'
    }
  },

  overrides: {
    MuiButton: {
      text: {
        letterSpacing: "1.35px",
        fontSize: "0.9375rem",
        lineHeight: "1.5rem",
      },

      contained: {
        boxShadow: "none !important"
      },
    },

    MuiTooltip: {
      tooltip: {
        fontSize: "0.875rem",
        backgroundColor: "rgba(0, 0, 0, 0.87)"
      }
    },

    MuiFormHelperText: {
      root: {
        marginBottom: "-1.25rem",
      }
    },

    // Style sheet name ⚛️
    MuiInputBase: {
      inputMultiline: {
        minHeight: "4rem"
      },
    },

    MuiOutlinedInput: {
      input: {
        padding: "14.5px 14px",

        '&.Mui-disabled.readOnly': {
          color: 'rgba(0, 0, 0, 1) !important',
        }
      }
    },

    MuiInputLabel: {
      outlined: {
        transform: "translate(14px, 16px) scale(1)",
        color: "rgba(0, 0, 0, 0.54) !important",
      }
    },

    MuiFormControlLabel: {
      label: {
        color: "rgba(0, 0, 0, 0.54) !important",
      },
    },

    MuiInputAdornment: {
      positionEnd: {
        transform: "translateX(1rem)",
      }
    }
  },

  props: {
    MuiTextField: {
      variant: "outlined",
    },
  }
});

function App() {
  const { user, login, logout } = useAuth();
  const [selectedUser, setSelectedUser] = useState<string>();

  const route = useRouteMatch<{ page: string }>('/:page');

  return (
    <ThemeProvider theme={theme}>
      {!user && (
        <Login onLogin={login} />
      )}

      {user?.admin && !selectedUser && (
        <Admin onSelectUser={setSelectedUser} onLogout={logout} />
      )}

      {user && (!user.admin || selectedUser) && (
        <SpeechProvider>
          <NotificationProvider>
            <CartProvider>
              <ShopProvider onLogout={logout} user={selectedUser || user._id!}>
                {route?.params.page === 'admin' && (
                  <Registry
                    route="admin"
                    schema={registrySchema}
                    icon={<ShoppingCartOutlined />}
                  />
                )}

                {route?.params.page !== 'admin' && (
                  <Shop admin={user.admin} onClearSelectedUser={user.admin ? (() => setSelectedUser(undefined)) : undefined} onLogout={logout} />
                )}
              </ShopProvider>
            </CartProvider>
          </NotificationProvider>
        </SpeechProvider>
      )}
    </ThemeProvider>
  );
}

export default App;
