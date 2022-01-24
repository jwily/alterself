const SET_ITEMS = 'items/SET_ITEMS'

const setItems = (items) => ({
    type: SET_ITEMS,
    payload: items
})

const initialState = { entities: null };

export const getItems = (charId) => async (dispatch) => {
    const response = await fetch(`/api/characters/${charId}/items`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setItems(data));
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_ITEMS:
            return action.payload
        default:
            return state;
    }
}
