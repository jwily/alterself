const SET_SKILLS = 'skills/SET_SKILLS'

const setSkills = (skills) => ({
    type: SET_SKILLS,
    payload: skills
})

const initialState = { entities: null };

export const getSkills = (charId) => async (dispatch) => {
    const response = await fetch(`/api/characters/${charId}/skills`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setSkills(data));
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_SKILLS:
            return action.payload
        default:
            return state;
    }
}
