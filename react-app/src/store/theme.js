const SET_THEME = 'help/SET_ERRORS'

export const setTheme = (string) => ({
    type: SET_THEME,
    payload: string
})
const initialState = { selection: 'default' };

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case SET_THEME:
            newState.selection = action.payload;
            return newState;
        default:
            return state;
    }
}
