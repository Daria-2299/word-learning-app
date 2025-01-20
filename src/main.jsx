import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'mobx-react';
import { wordsStore } from './stores/WordsStore';
import App from './app/App';
import './assets/styles/style.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider wordsStore={wordsStore}>
      <App />
    </Provider>
  </StrictMode>,
)