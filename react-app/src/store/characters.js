const SET_CHARS = 'characters/SET_CHARS';
const SET_CHAR = 'characters/SET_CHAR';
const ADD_CHAR = 'characters/ADD_CHAR';
const REMOVE_CHAR = 'characters/REMOVE_CHAR';

const setChars = (chars) => ({
    type: SET_CHARS,
    payload: chars
})

const setChar = (char) => ({
    type: SET_CHAR,
    payload: char
})

const addChar = (char) => ({
    type: ADD_CHAR,
    payload: char
})

const delChar = (id) => ({
    type: REMOVE_CHAR,
    payload: id
})


const initialState = { entities: { characters: null, character: null } };

export const getChars = () => async (dispatch) => {
    const response = await fetch(`/api/characters/`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setChars(data));
    }
}

export const getChar = (charId) => async (dispatch) => {
    const response = await fetch(`/api/characters/${charId}`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setChar(data));
    }
}

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
        dispatch(setChar(data))
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

export default function reducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case SET_CHARS:
            newState.entities.characters = action.payload;
            newState.entities.ids = Object.keys(action.payload);
            return newState;
        case SET_CHAR:
            newState.entities.character = action.payload.character;
            return newState;
        case ADD_CHAR:
            newState.entities.characters[action.payload.id] = action.payload;
            return newState;
        case REMOVE_CHAR:
            delete newState.entities.characters[action.payload];
            return newState;
        default:
            return state;
    }
}
