const SET_ITEMS = 'items/SET_ITEMS'
const ADD_ITEM = 'items/ADD_ITEM'
const REMOVE_ITEM = 'items/REMOVE_ITEM'

const setItems = (items) => ({
    type: SET_ITEMS,
    payload: items
})

const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
})

const delItem = (id) => ({
    type: REMOVE_ITEM,
    payload: id
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

export const createItem = (formData) => async (dispatch) => {
    const response = await fetch(`/api/characters/${formData.charId}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addItem(data))
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
    let newState;
    switch (action.type) {
        case SET_ITEMS:
            return action.payload
        case ADD_ITEM:
            newState = { ...state };
            newState.entities[action.payload.id] = action.payload;
            return newState
        case REMOVE_ITEM:
            newState = { ...state };
            delete newState.entities[action.payload];
            return newState;
        default:
            return state;
    }
}
