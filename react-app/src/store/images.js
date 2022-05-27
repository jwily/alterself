const SET_IMAGES = 'images/SET_IMAGES';
const ADD_IMAGE = 'images/ADD_IMAGE';
const REMOVE_IMAGE = 'images/REMOVE_IMAGE';

export const setImages = (images) => ({
    type: SET_IMAGES,
    payload: images
})

export const addImage = (image) => ({
    type: ADD_IMAGE,
    payload: image
})

const delImage = (id) => ({
    type: REMOVE_IMAGE,
    payload: id
})

const sortByCreated = (obj, arr) => {
    arr.sort((a, b) => {
        return new Date(obj[b].createdAt) - new Date(obj[a].createdAt)
    })
}

export const createImage = (formData) => async (dispatch) => {
    const response = await fetch(`/api/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addImage(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data;
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteImage = (imageId) => async (dispatch) => {
    const response = await fetch(`/api/images/${imageId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(delImage(data.imageId));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        return data;
    } else {
        return ['An error occurred. Please try again.']
    }
}

const initialState = { entities: {}, ids: [] };

export default function reducer(state = initialState, action) {
    const newState = { entities: { ...state.entities }, ids: [...state.ids] };
    switch (action.type) {
        case SET_IMAGES:
            newState.entities = action.payload;
            newState.ids = Object.keys(action.payload);
            sortByCreated(newState.entities, newState.ids);
            return newState;
        case ADD_IMAGE:
            newState.entities[action.payload.id] = action.payload;
            newState.ids = Object.keys(newState.entities);
            sortByCreated(newState.entities, newState.ids);
            return newState;
        case REMOVE_IMAGE:
            delete newState.entities[action.payload];
            newState.ids = Object.keys(newState.entities);
            sortByCreated(newState.entities, newState.ids);
            return newState;
        default:
            return state;
    }
}
