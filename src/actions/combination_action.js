export const ADD_ACTIVE_INDEX = 'ADD_ACTIVE_INDEX'

export function addActiveIndex (obj) {
    return {
        type: ADD_ACTIVE_INDEX,
        obj
    }
}