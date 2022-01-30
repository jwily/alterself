const SET_ERRORS = 'help/SET_ERRORS'
const SET_SHOW = 'help/SET_SHOW'
const SET_HIDE = 'help/SET_HIDE'

export const setErrors = (errors) => ({
    type: SET_ERRORS,
    payload: errors
})

export const setShow = () => ({
    type: SET_SHOW
})

export const setHide = () => ({
    type: SET_HIDE
})

const initialState = { errors: [], show: false };

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case SET_ERRORS:
            newState.errors = action.payload;
            newState.show = true;
            return newState;
        case SET_SHOW:
            newState.show = true;
            return newState;
        case SET_HIDE:
            newState.show = false;
            return newState;
        default:
            return state;
    }
}
