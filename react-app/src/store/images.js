const SET_IMAGES = 'features/SET_IMAGES'

export const setImages = (images) => ({
    type: SET_IMAGES,
    payload: images
})

const initialState = { entities: {}, ids: [] };

const sortByCreated = (obj, arr) => {
    arr.sort((a, b) => {
        return new Date(obj[b].createdAt) - new Date(obj[a].createdAt)
    })
}

export default function reducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case SET_IMAGES:
            newState.entities = action.payload;
            newState.ids = Object.keys(action.payload);
            sortByCreated(newState.entities, newState.ids);
            return newState;
        default:
            return state;
    }
}
