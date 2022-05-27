const SET_FEATS = 'features/SET_FEATS'
const ADD_FEAT = 'features/ADD_FEAT'
const REMOVE_FEAT = 'features/REMOVE_FEAT'

export const setFeats = (feats) => ({
    type: SET_FEATS,
    payload: feats
})

const addFeat = (feat) => ({
    type: ADD_FEAT,
    payload: feat
})

const delFeat = (id) => ({
    type: REMOVE_FEAT,
    payload: id
})

export const createFeat = (formData) => async (dispatch) => {
    const response = await fetch(`/api/characters/${formData.charId}/features`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addFeat(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data;
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editFeat = (formData) => async (dispatch) => {
    const response = await fetch(`/api/features/${formData.featId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addFeat(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data;
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteFeat = (featId) => async (dispatch) => {
    const response = await fetch(`/api/features/${featId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(delFeat(data.featId));
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
        case SET_FEATS:
            newState = action.payload;
            return newState;
        case ADD_FEAT:
            newState[action.payload.id] = action.payload;
            return newState
        case REMOVE_FEAT:
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}
