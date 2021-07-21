import {combineReducers} from 'redux';
import WalletReducer from './walletSlice';

const rootReducer = combineReducers({
  wallet: WalletReducer,
});

export default rootReducer;
