import {html} from 'htm/preact';
import {useState, useEffect} from 'preact/compat';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function UserProfile({name}) {

    const [user, setUser] = useState(null);
    const [selectedOption, setSelectedOption] = useState("workout");
    const [workoutData, setWorkoutData] = useState([]);
    const [recipeData, setRecipeData] = useState([]);
    const [activeView, setActiveView] = useState([]);

    const handleLogOut = () => {
        localStorage.removeItem('username');
        window.location.href = 'http://localhost:1234/'
    }

    useEffect(async () => {

        const data = await (await fetch(`http://localhost:1458/api/user/${name}`)).json();
        setUser(data);

    }, [])

    useEffect(async () => {

        const data = await (await fetch(`http://localhost:1458/api/${selectedOption}s/${name}`)).json();
        
        if(selectedOption === 'workout') {
            for(const d of data) {
                for(const l of d.workoutSteps) {
                    l.viewing = false;
                }
            }
            setWorkoutData(data);
        } else {
            for(const d of data) {
                for(const l of d.recipeSteps) {
                    l.viewing = false;
                }
            }

            setRecipeData(data);
        }

    }, [selectedOption])

    return html`
        <div class="user-profile mt-4">
        ${
            user === null ? html`<div>Loading</div>` :
            html`
            <div class="d-flex justify-content-end label mx-4" onclick=${handleLogOut}><span class="material-symbols-outlined ms-3">logout</span></div>
            <div class="username">${user.username}</div>
            <div class="date-joined">Joined ${new Date(user.date_joined).toDateString()}</div>
            <div class="streak-wrapper w-50 ms-auto me-auto mt-2">
                <div class="streak text-center d-flex align-items-center justify-content-center">
                    <div class="streak-icon material-symbols-outlined" style="font-size: 2rem;">local_fire_department</div>
                    <div class="streak-count">${user.streak}</div>
                </div>
            </div>
            
            <hr class="mx-4" />

            <div class="user-options d-flex align-items-center mx-4">
                <div onclick=${() => setSelectedOption('workout')} class="workout-option ${selectedOption === 'workout' ? 'active-option' : ''} d-flex align-items-center justify-content-center flex-grow-1 text-center p-2 me-1">
                    <div class="material-symbols-outlined">fitness_center</div>
                    <div>Workouts</div>
                </div>

                <div onclick=${() => setSelectedOption('recipe')} class="recipe-option ${selectedOption === 'recipe' ? 'active-option' : ''} d-flex align-items-center justify-content-center flex-grow-1 text-center p-2 ms-1">
                    <div class="material-symbols-outlined">restaurant</div>
                    <div>Recipes</div>
                </div>
            </div>

            <div class="selected-data mx-4 mt-2">
                <div class="${selectedOption === 'workout' ? '' : 'd-none'}">
                    ${
                        workoutData.length > 0 ?
                        workoutData.map(d => (
                            html`
                                <div class="workout mb-2">
                                    <div class="p-1">
                                        <div class="workout-name">${d.name}</div>
                                        <div class="workout-info d-flex align-items-center justify-content-start mt-1">
                                            <div class="pill me-1 px-2 py-1">${capitalizeFirstLetter(d.type)}</div>
                                            <div class="pill px-2 py-1">${d.workoutSteps.length} Steps</div>
                                        </div>
                                    </div>
                                </div>
                            `
                        )) : 

                        html`

                        <div class="d-flex align-items-center justify-content-center mt-4" style="color: rgb(65, 65, 65);">
                            Couldn't find any workouts <span class="material-symbols-outlined ms-2">sentiment_dissatisfied</span>
                        </div>
                        `
                    }

                    <div class="new-item d-flex justify-content-center align-items-center mt-4 p-1">
                        <div class="material-symbols-outlined">add_circle</div>
                        <div>New Workout</div>
                    </div>

                </div>


                <div class="${selectedOption === 'recipe' ? '' : 'd-none'}">
                    ${
                        recipeData.length > 0 ?
                        recipeData.map(d => (
                            html`
                                <div class="workout mb-2">
                                    <div class="p-1">
                                        <div class="workout-name">${d.name}</div>
                                        <div class="workout-info d-flex align-items-center justify-content-start mt-1">
                                            <div class="pill me-1 px-2 py-1">${d.calories} Calories</div>
                                            <div class="pill px-2 py-1">${d.recipeSteps.length} Steps</div>
                                        </div>
                                    </div>
                                </div>
                            `
                        )) : 

                        html`
                        <div class="d-flex align-items-center justify-content-center mt-4" style="color: rgb(65, 65, 65);">
                            Couldn't find any recipes <span class="material-symbols-outlined ms-2">sentiment_dissatisfied</span>
                        </div>
                        `
                    }

                <div class="new-item d-flex justify-content-center align-items-center mt-4 p-1">
                    <div class="material-symbols-outlined">add_circle</div>
                    <div>New Recipe</div>
                </div>

                </div>

            </div>
            `
        }
        </div>
    `

}

export default UserProfile;