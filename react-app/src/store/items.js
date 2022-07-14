const SET_ITEMS = 'items/SET_ITEMS'
const ADD_ITEM = 'items/ADD_ITEM'
const REMOVE_ITEM = 'items/REMOVE_ITEM'

export const setItems = (items) => ({
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
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data;
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editItem = (formData) => async (dispatch) => {
    const response = await fetch(`/api/items/${formData.itemId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addItem(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data;
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editQuantity = (formData) => async (dispatch) => {
    const response = await fetch(`/api/items/${formData.itemId}/quantity`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addItem(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data;
    } else {
        return ['An error occurred. Please try again.']
    }
}


export const deleteItem = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(delItem(data.itemId));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data
    } else {
        return ['An error occurred. Please try again.']
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_ITEMS:
            newState = action.payload;
            return newState;
        case ADD_ITEM:
            newState[action.payload.id] = action.payload;
            return newState
        case REMOVE_ITEM:
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}
