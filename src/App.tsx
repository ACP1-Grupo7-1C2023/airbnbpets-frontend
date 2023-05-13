import { AppRouter } from './routes/router';
import { Provider } from 'react-redux';
import { persistor, store } from './state';
import { PersistGate } from 'redux-persist/integration/react';
import './styles/Globals.scss';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div>
      <ChakraProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
      </ChakraProvider>
    </div>
  );
}

export default App;
