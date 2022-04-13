import { TOGGLE_UPLOAD, TOGGLE_CREATE_DIRECTORY, TOGGLE_DELETE_ELEMENT, TOGGLE_RENAME_ELEMENT, TOGGLE_DRAG_ENTER, UPLOAD_PERCENTAGE, UPLOAD_COMPLETE } from '../actionTypes/cloudTypes'

export const initialState = {
    uploading: false, 
    uploadComplete: false,
    uploadPercent: 0,
    createDirectory: false,
    deleteElement: false, 
    renameElement: false, 
    dragEnter: false,
}

export const cloudReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case TOGGLE_UPLOAD: 
            return {
                ...state, 
                dragEnter: false,
                uploadComplete: false,
                uploading: !state.uploading,
            }
        case TOGGLE_CREATE_DIRECTORY:
            return {
                ...state, 
                createDirectory: !state.createDirectory, 
            }
        case TOGGLE_DELETE_ELEMENT: 
            return {
                ...state, 
                deleteElement: !state.deleteElement,
            }
        case TOGGLE_RENAME_ELEMENT: 
            return {
                ...state, 
                renameElement: !state.renameElement,
            }
        case TOGGLE_DRAG_ENTER:
            return {
                ...state, 
                dragEnter: !state.dragEnter,
            }
        case UPLOAD_PERCENTAGE: 
            return {
                ...state, 
                uploadPercent: action.payload,
            }
        case UPLOAD_COMPLETE:
            return {
                ...state, 
                uploadPercent: 0,
                uploadComplete: true,
            }
        default:
            return { ...state }
    }
}

// action { type, payload}