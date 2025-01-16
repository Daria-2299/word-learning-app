import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import './assets/styles/style.scss';
import { Provider } from 'mobx-react';
import { wordsStore } from './stores/WordsStore';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider wordsStore={wordsStore}>
      <App />
    </Provider>
  </StrictMode>,
)