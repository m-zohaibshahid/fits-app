/* eslint-disable react/react-in-jsx-scope */
// store.js
import {Provider} from 'react-redux';
import Main from './Main';
import {store} from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
