import {html} from 'htm/preact';
import {useState, useEffect} from 'preact/compat';
import Router from 'preact-router';

import LoginPage from './LoginPage';
import UserProfile from './UserProfile';

function App() {

    const [user, setUser] = useState(null);

    return html`
        <div>
            <${Router}>
                <${LoginPage} path="/" />
                <${UserProfile} path="/profile/:name" />
            </${Router}>         
        </div>
    `
}

export default App;