const SET_PROFS = 'proficiencies/SET_PROFS'
const ADD_PROF = 'proficiencies/ADD_PROF'
const REMOVE_PROF = 'proficiencies/REMOVE_PROF'

export const setProfs = (profs) => ({
    type: SET_PROFS,
    payload: profs
})

const addProf = (prof) => ({
    type: ADD_PROF,
    payload: prof
})

const delProf = (id) => ({
    type: REMOVE_PROF,
    payload: id
})

const initialState = { entities: {}, ids: [] };

export const createProf = (formData) => async (dispatch) => {
    const response = await fetch(`/api/characters/${formData.charId}/profs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addProf(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editProf = (formData) => async (dispatch) => {
    const response = await fetch(`/api/profs/${formData.profId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addProf(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteProf = (profId) => async (dispatch) => {
    const response = await fetch(`/api/profs/${profId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(delProf(data.profId));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data.error;
    } else {
        return ['An error occurred. Please try again.']
    }
}

export default function reducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case SET_PROFS:
            newState.entities = action.payload;
            newState.ids = Object.keys(action.payload);
            return newState;
        case ADD_PROF:
            newState.entities[action.payload.id] = action.payload;
            newState.ids = Object.keys(newState.entities);
            return newState
        case REMOVE_PROF:
            delete newState.entities[action.payload];
            newState.ids = Object.keys(newState.entities);
            return newState;
        default:
            return state;
    }
}
