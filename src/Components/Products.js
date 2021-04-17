import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductAction } from '../actions/productActions';
import Product from './Product';

const Products = () => {
    
    const productList = useSelector(state => state.products.products)
    const error = useSelector(state => state.products.error);
    const charging = useSelector(state => state.products.loading);

    const dispatch = useDispatch();
    useEffect( ()=> {
        const loadProducts = () => dispatch( getProductAction() );
        loadProducts()
    }, []);

    return ( 
        <Fragment>
            <h2 className="text-center my-5">List of Products</h2>
             { error ? <p className="font-weight-bold alert-danger text-center mt-4">
                There was a problem
             </p>: null}
            <table className="table table-striped">
                    <thead className="bg-primary table-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                <tbody>
                   { charging ? <p className="text-center">Charging....</p> : 
                    productList.length === 0 ? 'There are no products' : (
                        productList.map(item => (
                            <Product 
                                key={item.id}
                                product={item}    
                            />
                        ))
                    ) 
                   }

                   
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default Products;