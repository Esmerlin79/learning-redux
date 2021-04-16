import { 
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    START_PRODUCT_DOWNLOAD,
    DOWNLOAD_SUCCESSFUL_PRODUCT,
    DOWNLOAD_PRODUCT_ERROR
    
} from '../types';

const initialState = {
    products: [],
    error: null,
    loading: false
}

// eslint-disable-next-line
export default function(state = initialState, action){
    switch(action.type){
        case START_PRODUCT_DOWNLOAD:
        case ADD_PRODUCT: 
            return {
                ...state,
                loading: action.payload
            }
        case ADD_PRODUCT_SUCCESS: 
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }
        case DOWNLOAD_PRODUCT_ERROR: 
        case ADD_PRODUCT_ERROR: 
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case DOWNLOAD_SUCCESSFUL_PRODUCT:
            return {
                ...state,
                loading: false,
                error: null,
                products:  action.payload
            }
        default:
            return state;
    }
}
