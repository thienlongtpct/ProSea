import React from 'react';
import {Provider} from "react-redux";
import {ConfigureStore} from './Redux/ConfigureStore';

import Main from './View/MainComponent';

import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import {BrowserRouter} from "react-router-dom";

const store = ConfigureStore();

function App() {
  return (
    <div>
        <Provider store={store}>
            <BrowserRouter>
                <Main/>
            </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
