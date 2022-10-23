import {render} from 'preact';
import {html} from 'htm/preact';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core';
import './style.scss';

render(html`<${App} />`, document.getElementById('root'));