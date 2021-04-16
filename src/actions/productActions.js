import { 
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    START_PRODUCT_DOWNLOAD,
    DOWNLOAD_SUCCESSFUL_PRODUCT,
    DOWNLOAD_PRODUCT_ERROR
    
} from '../types';
import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

export function createNewProductAction(product){
    return  async (dispatch) =>{
        
        dispatch( addProduct() );

        try{
          await  clientAxios.post('/productos', product);

            dispatch( addProductSuccess(product) );

            Swal.fire(
                'Correct',
                'The product was added successfully',
                'success'
            )

        } catch( error ){
            console.log(error)
            dispatch( addProductError(true) );

            Swal.fire({
                icon: 'error',
                title: 'Could not add',
                text: 'There was a problem, try again'
            })
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
});

const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
});

const addProductError = state => ({
    type: ADD_PRODUCT_ERROR,
    payload: state
})

// Function to show all products in the database
export function getProductAction(){
    return async (dispatch) => {
        dispatch( downloadProducts() );

        try {
            
            const response = await clientAxios.get('/productos');
            dispatch( successfulProductDownload(response.data) );
        } catch (error) {
            console.log(error);
            dispatch( downloadProductError() );
        }
    }
}

const downloadProducts = () => ({
    type: START_PRODUCT_DOWNLOAD,
    payload: true
});

const successfulProductDownload =  products => ({
    type: DOWNLOAD_SUCCESSFUL_PRODUCT,
    payload: products
});

const downloadProductError = () => ({
    type: DOWNLOAD_PRODUCT_ERROR,
    payload: true
});