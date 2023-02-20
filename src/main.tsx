import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import './components/darkMood.scss'
import './responsive.scss'
import { ErrorContextProvider, ModalContextProvider, UserContextProvider, FeedBackContextProvider, AppContextProvider, PracticeContextProvider, DayViewContextProvider } from './context/contextProvider';

import '@splidejs/react-splide/css';
import './components/loader.scss';
import './components/chart.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ModalContextProvider>
      <UserContextProvider>
        <AppContextProvider>
          <ErrorContextProvider>
            <FeedBackContextProvider>
              <PracticeContextProvider>
                <DayViewContextProvider>
                  <App />
                </DayViewContextProvider>
              </PracticeContextProvider>
            </FeedBackContextProvider>
          </ErrorContextProvider>
        </AppContextProvider>
      </UserContextProvider>
    </ModalContextProvider>
  </React.StrictMode>,
)
