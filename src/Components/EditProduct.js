import React, { useEffect, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux';
import { editProductAction } from '../actions/productActions';

const EditProduct = ({ history }) => {
    
    const [product, setProduct] = useState({
        name: '',
        price: 0
    });

    const dispatch = useDispatch();
    const productEdit = useSelector(state => state.products.productEdit);
    
    useEffect(() =>{
        setProduct(productEdit)
    }, [productEdit])

    if(!product) {
        history.push('/');
        return null;
    }
    const { name, price } = product

    const handlerChange = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const handlerSubmit = e => {
        e.preventDefault();

        dispatch( editProductAction(product) );
        history.push('/');
    }
     
    return(
        <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4 font-weight-bold">
                        Edit Product
                    </h2>

                        <form
                            onSubmit={handlerSubmit}
                        >
                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Product Name"
                                    name="name"
                                    value={name}
                                    onChange={handlerChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Product Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Product Price"
                                    name="price"
                                    value={price}
                                    onChange={handlerChange}
                                />
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default EditProduct;