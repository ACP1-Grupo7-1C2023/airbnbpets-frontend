import { AppRouter } from './routes/router';
import { Provider } from 'react-redux';
import { store } from './state';

function App() {
  return (
    <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
