const SET_ERRORS = 'help/SET_ERRORS'
const SET_SHOW = 'help/SET_SHOW'
const SET_HIDE = 'help/SET_HIDE'
const SET_HOVER = 'help/SET_HOVER'

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

export const setHover = (target) => ({
    type: SET_HOVER,
    payload: target
})

const initialState = { errors: [], show: false, hover: '' };

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case SET_HOVER:
            newState.hover = action.payload;
            return newState;
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
