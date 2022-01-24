const SET_CHARS = 'characters/SET_CHARS'
const ADD_CHAR = 'characters/ADD_CHAR'
const REMOVE_CHAR = 'characters/REMOVE_CHAR'

const setChars = (chars) => ({
    type: SET_CHARS,
    payload: chars
})

const addChar = (char) => ({
    type: ADD_CHAR,
    payload: char
})

const delChar = (id) => ({
    type: REMOVE_CHAR,
    payload: id
})


const initialState = { entities: null };

export const getChars = () => async (dispatch) => {
    const response = await fetch(`/api/characters/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setChars(data));
    }
}

export const getChar = (charId) => async (dispatch) => {
    const response = await fetch(`/api/characters/${charId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setChars(data));
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
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const data = await response.json();
        return data;
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CHARS:
            return { entities: action.payload }
        case ADD_CHAR:
            const newState = { ...state }
            newState.entities[action.payload.id] = action.payload;
            return newState
        default:
            return state;
    }
}
