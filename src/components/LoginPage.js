import {html} from 'htm/preact';
import {useState, useEffect} from 'preact/compat';

function LoginPage() {

    const [username, setUsername] = useState("");

    const checkLoginStatus = () => {

        const _username = localStorage.getItem("username");

        if(_username === null) return;

        handleSignIn(_username);
        
    }

    const handleSignIn = async (u) => {

        if(u.length < 5 || u.length > 50) {
            return false;
        }

        const userData = await (await fetch(`http://localhost:1458/api/user/${u}`)).json()

        localStorage.setItem('username', userData.username);

        window.location.href = `http://localhost:1234/profile/${userData.username}`;
        return true;
    }

    useEffect(async () => { 
        checkLoginStatus();
    }, []);

    return html`
        <div class="login-page">
            <div class="sign-in">
        
                <div class="title mb-4 text-center">Log In</div>

                <input class="input mb-2" onchange=${(e) => setUsername(e.target.value)} value=${username} placeholder="Username..." />
                <button class="button-primary" onclick=${() => handleSignIn(username)}>Sign In</button>
            </div>
        </div>
    `
}

export default LoginPage;