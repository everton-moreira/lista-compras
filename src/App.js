import React from 'react';
import Routes from './routes'
import {Provider} from 'react-redux'
import {Store} from './redux/store'
import { ToastContainer } from 'react-toastify';

import {LoadingIndicator} from './pages/templates/loader';
import './App.css';

const App = () => <><ToastContainer /><Provider store={Store}><Routes /></Provider><LoadingIndicator /></>;
export default App;
