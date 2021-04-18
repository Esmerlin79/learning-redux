import { combineReducers } from 'redux';
import productReducer from './productReducer';
import alertReducer from './alertReducer';

export default combineReducers({
    products: productReducer,
    alert: alertReducer
});