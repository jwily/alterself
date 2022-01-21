const SET_CHARS = 'characters/SET_CHARS'

const setChars = (chars) => ({
    type: SET_CHARS,
    payload: chars
})

const initialState = { characters: { entities: null } };

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

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CHARS:
            return { entities: action.payload }
        default:
            return state;
    }
}
