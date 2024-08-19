import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import '@splidejs/react-splide/css';
import './index.scss';
import './components/darkMood.scss';
import './responsive.scss';
import './components/loader.scss';
import './components/chart.scss';
import App from './App';
import {
  ErrorContextProvider,
  ModalContextProvider,
  UserContextProvider,
  FeedBackContextProvider,
  AppContextProvider,
  PracticeContextProvider,
  DayViewContextProvider
} from './context/contextProvider';

const ErrorFallback = ({ error }: { error: Error }): ReactElement => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>
);

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Failed to find the root element');
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
    </ErrorBoundary>
  </React.StrictMode>
);
