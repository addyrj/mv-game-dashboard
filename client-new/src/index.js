import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from './App/Store/store';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { socket, SocketContext } from './Context/SocketIoContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const darkTheme = createTheme({
   palette: {
      mode: 'dark',
   },
});

root.render(
   <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
         <SocketContext.Provider value={socket}>
            <BrowserRouter>
               {/* <React.StrictMode> */}
               <GoogleOAuthProvider
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
               >
                  <App />
                  <Toaster position="top-right" />
               </GoogleOAuthProvider>
               {/* </React.StrictMode> */}
            </BrowserRouter>
         </SocketContext.Provider>
      </Provider>
   </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
