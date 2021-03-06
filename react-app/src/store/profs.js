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
        return data;
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
        return data;
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
        return data;
    } else {
        return ['An error occurred. Please try again.']
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_PROFS:
            newState = action.payload;
            return newState;
        case ADD_PROF:
            newState[action.payload.id] = action.payload;
            return newState
        case REMOVE_PROF:
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}
