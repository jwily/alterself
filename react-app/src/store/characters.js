const SET_CHARS = 'characters/SET_CHARS';
// const SET_CHAR = 'characters/SET_CHAR';
const ADD_CHAR = 'characters/ADD_CHAR';
const REMOVE_CHAR = 'characters/REMOVE_CHAR';
const MOUNT_CHAR = 'characters/MOUNT_CHAR';
const UNMOUNT_CHARS = 'characters/UNMOUNT_CHARS'
const SORT_CHARS = 'characters/SORT_CHARS'
const CLEAR_CHARS = 'characters/CLEAR_CHARS'

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

export const mountChar = (id) => ({
    type: MOUNT_CHAR,
    payload: id
})

export const unmountAll = () => ({
    type: UNMOUNT_CHARS
})

export const sortAll = () => ({
    type: SORT_CHARS
})

const initialState = { entities: null, ids: [] };

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

// export const getChar = (charId) => async (dispatch) => {
//     const response = await fetch(`/api/characters/${charId}`);
//     if (response.ok) {
//         const data = await response.json();
//         if (data.error) {
//             return false;
//         }

//         dispatch(setChar(data));
//         return true
//     }
// }

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

export default function reducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case MOUNT_CHAR:
            newState.entities[action.payload].mounted = true;
            return newState;
        case UNMOUNT_CHARS:
            for (const id in newState.entities) {
                newState.entities[id].mounted = false;
            }
            return newState;
        case CLEAR_CHARS:
            return { entities: null, ids: [] }
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
            delete newState.entities[action.payload];
            newState.ids = Object.keys(newState.entities)
            sortByUpdate(newState.entities, newState.ids);
            return newState;
        default:
            return state;
    }
}
