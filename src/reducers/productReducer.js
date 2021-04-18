import { 
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    START_PRODUCT_DOWNLOAD,
    DOWNLOAD_SUCCESSFUL_PRODUCT,
    DOWNLOAD_PRODUCT_ERROR,
    GET_PRODUCT_DELETE,
    PRODUCT_DELETED_SUCCESSFUL,
    PRODUCT_DELETED_ERROR,
    GET_PRODUCT_EDITED,
    START_EDITING_PRODUCT,
    PRODUCT_EDITED_SUCCESSFULLY,
    PRODUCT_EDITED_ERROR
    
} from '../types';

const initialState = {
    products: [],
    error: null,
    loading: false,
    productDelete: null,
    productEdit: null
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
        case PRODUCT_DELETED_ERROR: 
        case DOWNLOAD_PRODUCT_ERROR: 
        case ADD_PRODUCT_ERROR: 
        case PRODUCT_EDITED_ERROR:
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
        case GET_PRODUCT_DELETE: 
            return {
                ...state,
                productDelete: action.payload
            }
        case PRODUCT_DELETED_SUCCESSFUL:
            return {
                ...state,
                products: state.products.filter( item => item.id !== state.productDelete),
                productDelete: null
            }
        case GET_PRODUCT_EDITED:
            return {
                ...state,
                productEdit: action.payload
            }
        case START_EDITING_PRODUCT:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_EDITED_SUCCESSFULLY:
            return {
                ...state,
                loading: false,
                productEdit: null,
                products: state.products.map( product => 
                    product.id === action.payload.id 
                    ? product = action.payload : product
                )
            }
        default:
            return state;
    }
}
