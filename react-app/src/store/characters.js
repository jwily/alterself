const SET_CHARS = 'characters/SET_CHARS';
const ADD_CHAR = 'characters/ADD_CHAR';
const REMOVE_CHAR = 'characters/REMOVE_CHAR';
const CLEAR_CHARS = 'characters/CLEAR_CHARS';

const UPDATE_CHAR = 'characters/UPDATE_CHAR';

const SET_RESOURCE = 'characters/SET_RESOURCE';
const DEL_RESOURCE = 'characters/DELETE_CHAR_ITEM';

export const setChars = (chars) => ({
    type: SET_CHARS,
    payload: chars
})

export const clearChars = () => ({
    type: CLEAR_CHARS
})

const addChar = (char) => ({
    type: ADD_CHAR,
    payload: char
})

const delChar = (id) => ({
    type: REMOVE_CHAR,
    payload: id
})

export const setResource = (data) => ({
    type: SET_RESOURCE,
    payload: data
})

export const delResource = (data) => ({
    type: DEL_RESOURCE,
    payload: data
})

export const updateChar = (time) => ({
    type: UPDATE_CHAR,
    payload: time
})

export const createChar = (formData) => async (dispatch) => {
    const response = await fetch('/api/characters/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addChar(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteChar = (charId) => async (dispatch) => {
    const response = await fetch(`/api/characters/${charId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(delChar(data.charId));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data.error;
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editAbilities = (formData) => async (dispatch) => {
    const response = await fetch(`/api/characters/${formData.charId}/abilities`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addChar(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return ["Oops, I can't work with ability scores lower than 0 or higher than 99."];
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editVitals = (formData) => async (dispatch) => {
    const response = await fetch(`/api/characters/${formData.charId}/vitals`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addChar(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return ["Hit point values don't usually go below zero. Unless... woah! Are you one of the undead?"];
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editCore = (formData) => async (dispatch) => {
    const response = await fetch(`/api/characters/${formData.charId}/core`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addChar(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data;
    } else {
        return ['An error occurred. Please try again.']
    }
}

const sortByUpdate = (obj, arr) => {
    arr.sort((a, b) => {
        return new Date(obj[b].updatedAt) - new Date(obj[a].updatedAt)
    })
}

const initialState = { entities: {}, ids: [] };

export default function reducer(state = initialState, action) {
    const newState = { entities: { ...state.entities }, ids: [...state.ids] };
    switch (action.type) {
        case CLEAR_CHARS:
            return {
                entities: {}, ids: []
            }
        case SET_CHARS:
            newState.entities = action.payload;
            newState.ids = Object.keys(action.payload);
            sortByUpdate(newState.entities, newState.ids);
            return newState;
        case ADD_CHAR:
            newState.entities[action.payload.id] = action.payload;
            newState.ids = Object.keys(newState.entities)
            sortByUpdate(newState.entities, newState.ids);
            return newState;
        case REMOVE_CHAR:
            // const newEntities = { ...newState.entities };
            delete newState.entities[action.payload];
            // This is just mutating "entities", which is not "new"
            newState.ids = Object.keys(newState.entities);
            sortByUpdate(newState.entities, newState.ids);
            return newState;
        case SET_RESOURCE:
            const newItems = [...newState.entities[action.payload.charId][action.payload.arrName]];
            newItems.push(action.payload.id);
            newState.entities[action.payload.charId][action.payload.arrName] = newItems;
            newState.entities[action.payload.charId].updatedAt = action.payload.updatedAt;
            sortByUpdate(newState.entities, newState.ids);
            return newState;
        case UPDATE_CHAR:
            newState.entities[action.payload.charId].updatedAt = action.payload.updatedAt;
            sortByUpdate(newState.entities, newState.ids);
            return newState;
        case DEL_RESOURCE:
            newState.entities[action.payload.charId][action.payload.arrName] = action.payload.newArray;
            newState.entities[action.payload.charId].updatedAt = action.payload.updatedAt;
            sortByUpdate(newState.entities, newState.ids);
            return newState;
        default:
            return state;
    }
}
