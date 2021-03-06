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

//Select and delete the product
export function deleteProductAction(id){
    return async (dispatch) => {
        dispatch( getProductDelete(id) );
        
        try{
           await clientAxios.delete(`/productos/${id}`);
           dispatch( productDeletedSuccessful() );
           Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
        );

        }catch(error){
            console.log(error);
            dispatch( productDeletedError() );
        }
    }
}

const getProductDelete = id => ({
    type: GET_PRODUCT_DELETE,
    payload: id 
})

const productDeletedSuccessful = () => ({
     type: PRODUCT_DELETED_SUCCESSFUL
})

const productDeletedError = () =>({
    type: PRODUCT_DELETED_ERROR,
    payload: true
})

//Product in edition
export function getProductEditAction(product){
    return (dispatch) => {
        dispatch( getProductEdit(product) )
    }
}

const getProductEdit = product => ({
    type: GET_PRODUCT_EDITED,
    payload: product
})

//Edit record in the api
export function editProductAction(product){
    return async (dispatch) => {
        dispatch( editProduct() );

        try {
           await clientAxios.put(`/productos/${product.id}`,product);
            dispatch( productEditedSuccesfully(product) )
        } catch (error) {
            console.log(error);
            dispatch( productEditedError() )
        }
    }
}

const editProduct = () => ({
    type: START_EDITING_PRODUCT
})

const productEditedSuccesfully = product => ({
    type: PRODUCT_EDITED_SUCCESSFULLY,
    payload: product
})

const productEditedError = () => ({
    type: PRODUCT_EDITED_ERROR,
    payload: true
})