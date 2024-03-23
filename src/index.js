import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import ScrollTop from './utils/scrollTop';
import store from './reducers/store';
import { persistStore } from "redux-persist"
import { PersistGate } from 'redux-persist/integration/react'; 
import App from './App';
import './index.css'

//the persist gate will be used to save the store state, if a user closes the tab or browser and reopens, the state will still be there.
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
            <HelmetProvider>
                <BrowserRouter>
                    <ScrollTop />
                    <App />
                </BrowserRouter>
            </HelmetProvider>
        </PersistGate>
    </Provider>
);