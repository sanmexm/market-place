import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from 'redux-persist/lib/storage';
import { authReducer, modeReducer, advertBannerReducer, advertPostReducer, cartReducer, contactUsReducer, deliveryReducer, orderReducer, orderTrackingReducer, paymentReducer, postLikeReducer, postRatingReducer, postReviewReducer, postsReducer, profileReducer, storeReducer, subscriberReducer, userReducer, wishlistReducer } from './';
import { persistReducer } from "redux-persist"

const persistConfig    = { key: "root", storage, version: 1 }

const persistedReducer = persistReducer(persistConfig, combineReducers({
    authList:          authReducer,
    modeList:          modeReducer,
    postList:         postsReducer,
    cartList:          cartReducer,
    advertBannerList:  advertBannerReducer,
    advertPostList:    advertPostReducer,
    contactUsLists:    contactUsReducer,
    deliveryList:      deliveryReducer,
    orderList:         orderReducer,
    orderTrackingList: orderTrackingReducer,
    paymentList:       paymentReducer,
    postLikeList:      postLikeReducer,
    postRatingList:    postRatingReducer,
    postReviewList:    postReviewReducer,
    profileList:       profileReducer,
    storeList:         storeReducer,
    subscriberList:    subscriberReducer,
    userList:          userReducer,
    wishlistList:      wishlistReducer,
}));

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export default store;