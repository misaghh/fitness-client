import {html} from 'htm/preact';
import {useState, useEffect} from 'preact/compat';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function SearchPage({type}) {

    const [user, setUser] = useState(null);
    const [searchData, setSearchData] = useState([]);

    const handleProfile = () => {
        const name = localStorage.getItem('username');

        if(name === null) {
            window.location.href = "http://localhost:1234"
            return;
        }

        window.location.href = `http://localhost:1234/profile/${name}`;
    }

    useEffect(async () => {
        const name = localStorage.getItem('username');

        console.log(name);

        if(name === null) {
            window.location.href = "http://localhost:1234"
            return;
        }

        const data = await (await fetch(`http://localhost:1458/api/user/${name}`)).json();
        setUser(data);

        const search = await (await fetch(`http://localhost:1458/api/all-workouts/${type}`)).json();
        setSearchData(search);

    }, [])

    

    return html`
        <div class="user-profile mt-4 mx-4">
            <div class="search-info d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <span class="material-symbols-outlined">search</span>
                    <span>${type}</span>
                </div>
                <div class="material-symbols-outlined" onclick=${handleProfile}>account_circle</div>
            </div>    

            <hr />

            <div class="selected-data">
                ${
                    searchData.map(d => (
                        html`
                            <div class="workout mb-2">
                                <div class="p-1">
                                    <div class="workout-name d-flex align-items-center justify-content-between">${d.name}</div>
                                    <div class="workout-info d-flex align-items-center justify-content-start mt-1">
                                        <div class="pill me-1 px-2 py-1">${capitalizeFirstLetter(d.type)}</div>
                                        <div class="pill px-2 py-1">${d.workoutSteps.length} Steps</div>
                                        <div class="material-symbols-outlined ms-auto">favorite</div>
                                    </div>
                                </div>
                            </div>
                        `
                    ))
                }
            </div>

        </div>
    `

}

export default SearchPage;