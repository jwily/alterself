const SET_CHARS = 'characters/SET_CHARS'
const ADD_CHAR = 'characters/ADD_CHAR'

const setChars = (chars) => ({
    type: SET_CHARS,
    payload: chars
})

const addChar = (char) => ({
    type: ADD_CHAR,
    payload: char
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

export const createChar = ({ name, race, charClass, backgroun }) => {

}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CHARS:
            return { entities: action.payload }
        default:
            return state;
    }
}
