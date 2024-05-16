import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })

//This is going to be a function that's going to happen on each one of our request
API.interceptors.request.use((req) => {
    if(localStorage.getItem('authData')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('authData')).token}`
    }
    return req
})

const advertBanners    = '/advert-banners'
const advertPosts      = '/advert-posts'
const delivery         = '/delivery'
const orders           = '/orders'
const orderTrackings   = '/order-trackings'
const payments         = '/payments'
const postLikes        = '/post-likes'
const postRatings      = '/post-ratings'
const postReviews      = '/post-reviews'
const posts            = '/posts'
const profiles         = '/profiles'
const stores           = '/stores'
const subscribers      = '/subscribers'
const users            = '/users'
const wishlists        = '/wishlists'
const contactUs        = '/contact-us'

//advert-banners
export const fetchAdvertBanners           = (page) => API.get(`${advertBanners}?page=${page}`)
export const fetchAdvertBanner            = (id) => API.get(`${advertBanners}/banner/${id}`)
export const createAdvertBanners          = (newData) => API.post(`${advertBanners}/create`, newData)
// export const updateAdvertBanner           = (id, updatedData) => API.patch(`${advertBanners}/${id}`, updatedData)
export const fetchAdvertBannersBySearch   = (searchQuery, page) => API.get(`${advertBanners}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deleteAdvertBanner           = (id) => API.delete(`${advertBanners}/delete/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

//advert-post
export const fetchAdvertPosts           = (page) => API.get(`${advertPosts}?page=${page}`)
export const fetchAdvertPost            = (id) => API.get(`${advertPosts}/advert/${id}`)
export const createAdvertPosts          = (newData) => API.post(`${advertPosts}/create`, newData)
// export const updateAdvertPost           = (id, updatedData) => API.patch(`${advertPosts}/${id}`, updatedData)
export const fetchAdvertPostsBySearch   = (searchQuery, page) => API.get(`${advertPosts}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deleteAdvertPost           = (id) => API.delete(`${advertPosts}/delete/${id}`)
//------------------------------------------------------------------------------------------------------------------------------

//delivery
export const fetchDeliveryS           = (page) => API.get(`${delivery}?page=${page}`)
export const fetchDelivery            = (id) => API.get(`${delivery}/delivery/${id}`)
export const createDeliveryS          = (newData) => API.post(`${delivery}/create`, newData)
export const updateDelivery           = (id, updatedData) => API.patch(`${delivery}/update/${id}`, updatedData)
export const fetchDeliverySBySearch   = (searchQuery, page) => API.get(`${delivery}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deleteDelivery           = (id) => API.delete(`${delivery}/delete/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

//orders
export const fetchOrders           = (page) => API.get(`${orders}?page=${page}`)
export const fetchOrder            = (id) => API.get(`${orders}/order/${id}`)
export const createOrder           = (shippingInfo, cartItems, cartTotal) => API.post(`${orders}/create`, {shippingInfo, cartItems, cartTotal})
export const updatePaymentOrder    = (id, result) => API.patch(`${orders}/updatePaymentOrder/${id}`, {result})
export const updateOrder           = (id, updatedData) => API.patch(`${orders}/update/${id}`, updatedData)
export const fetchOrdersBySearch   = (searchQuery, page) => API.get(`${orders}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deleteOrder           = (id) => API.delete(`${orders}/delete/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

//order trackings
export const fetchOrderTrackings         = (page) => API.get(`${orderTrackings}?page=${page}`)
export const fetchOrderTracking          = (id) => API.get(`${orderTrackings}/tracking/${id}`)
export const createOrderTrackings        = (newData) => API.post(`${orderTrackings}/create`, newData)
export const updateOrderTracking         = (id, updatedData) => API.patch(`${orderTrackings}/update/${id}`, updatedData)
export const fetchOrderTrackingsBySearch = (searchQuery, page) => API.get(`${orderTrackings}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deleteOrderTracking         = (id) => API.delete(`${orderTrackings}/delete/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

//payments
export const fetchPayments           = (page) => API.get(`${payments}?page=${page}`)
export const fetchPayment            = (id) => API.get(`${payments}/payment/${id}`)
export const createOrderPayment      = (result) => API.post(`${payments}/createPayment`, {result})
export const firstPaySession         = (referenceId) => API.post(`${payments}/firstPaySession/${referenceId}`)
export const successPaySession       = (id) => API.get(`${payments}/successPaySession/${id}`)
export const updatePaymentSession    = (id, result) => API.patch(`${payments}/updatePaymentSession/${id}`, {result})
export const updatePayment           = (id, updatedData) => API.patch(`${payments}/update/${id}`, updatedData)
export const fetchPaymentsBySearch   = (searchQuery, page) => API.get(`${payments}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deletePayment           = (id) => API.delete(`${payments}/delete/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

//postLikes
export const fetchPostLikes           = (page) => API.get(`${postLikes}?page=${page}`)
export const fetchPostLike            = (id) => API.get(`${postLikes}/${id}`)
// export const createPostLikes          = (newData) => API.post(`${postLikes}/create`, newData)
export const updatePostLike           = (id, updatedData) => API.patch(`${postLikes}/post-like/${id}`, updatedData)
export const deletePostLike           = (id) => API.delete(`${postLikes}/delete/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

//postRatings
export const fetchPostRatings           = (page) => API.get(`${postRatings}?page=${page}`)
export const fetchUserPostRatings       = (postId, page) => API.get(`${postRatings}/${postId}/usersRatings?page=${page}`)
export const fetchPostRating            = (postId) => API.get(`${postRatings}/${postId}/viewPostRatings`)
// export const createPostRatings       = (newData) => API.post(`${postRatings}/create`, newData)
export const updatePostRating           = (id, userId, updatedData) => API.put(`${postRatings}/${id}/${userId}/userRating`, updatedData)
export const deletePostRating           = (id) => API.delete(`${postRatings}/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

//postReviews
export const fetchPostReviews           = (page) => API.get(`${postReviews}?page=${page}`)
export const fetchPostReview            = (id) => API.get(`${postReviews}/${id}`)
export const fetchSinglePostReviews     = (postId, page) => API.get(`${postReviews}/${postId}?page=${page}`)
export const createPostReview           = (postId, userId, value) => API.post(`${postReviews}/${postId}/${userId}/reviewPost`, { value })
// export const createPostReviews          = (newData) => API.post(`${postReviews}/create`, newData)
export const updatePostReview           = (id, userId, updatedData) => API.patch(`${postReviews}/${id}/${userId}/reviewPost`, updatedData)
// export const fetchPostReviewsBySearch   = (searchQuery, page) => API.get(`${postReviews}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deletePostReview           = (id) => API.delete(`${postReviews}/delete/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

//posts
export const fetchPosts            = (page) => API.get(`${posts}?page=${page}`)
export const fetchFilteredPosts    = (postType, category, tag, sort, page) => API.get(`${posts}/filtered?postType=${postType}&category=${category}&tag=${tag}&sort=${sort}&page=${page}`)
export const fetchFilteredRelatedPosts      = (postId, postType, category, page) => API.get(`${posts}/filtered-related?postId=${postId}&postType=${postType}&category=${category}&page=${page}`)
export const fetchFilteredMoreSupplierPosts = (userId, postId, page) => API.get(`${posts}/filtered-more-from-user?userId=${userId}&postId=${postId}&page=${page}`)
// replacing the 'none' with means the search will display all results if nothing is sent
export const fetchPostsBySearch    = (searchQuery, page) => API.get(`${posts}/search?searchQuery=${searchQuery || ''}&page=${page}`)
// export const fetchPostsBySearch    = (searchQuery, page) => API.get(`${posts}/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}&page=${page}`)
export const fetchSimilarPosts     = (searchQuery) => API.get(`${posts}/similarSearch?searchQuery=${searchQuery.search || 'none'}`)
export const fetchPost             = (id) => API.get(`${posts}/post/${id}`)
export const fetchPostsByUser      = (userId, page) => API.get(`${posts}/userPosts/${userId}?page=${page}`)
export const fetchPostsByStoreId   = (storeId, page) => API.get(`${posts}/storePosts/${storeId}?page=${page}`)
export const searchUserPosts       = (searchQuery, userId, page) => API.get(`${posts}/${userId}/search?searchQuery=${searchQuery} || 'none'}$page=${page}`)
export const createPost            = (newPost) => API.post(`${posts}/create`, newPost)
export const updatePost            = (id, updatedPost) => API.patch(`${posts}/update/${id}`, updatedPost)
// export const likePost           = (id) => API.patch(`${posts}/${id}/likePost`)
// export const commentPost        = (value, id) => API.post(`${posts}/${id}/commentPost`, { value })
// export const reviewPost         = (id, userId, value) => API.post(`${posts}/${id}/${userId}/reviewPost`, { value })
// export const ratePost           = (id, userId, star) => API.put(`${posts}/${id}/${userId}/userRating`, star)
export const deletePost            = (id) => API.delete(`${posts}/delete/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

//profiles
export const fetchProfiles            = (page) => API.get(`${profiles}?page=${page}`)
export const fetchProfile             = (id) => API.get(`${profiles}/${id}`)
export const fetchUserProfile         = (userId) => API.get(`${profiles}/user/${userId}`)
export const createProfile            = (newData) => API.post(`${profiles}/create`, newData)
export const updateProfile            = (id, updatedData) => API.patch(`${profiles}/update/${id}`, updatedData)
export const fetchProfilesBySearch    = (searchQuery, page) => API.get(`${profiles}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deleteProfile            = (id) => API.delete(`${profiles}/delete/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

//stores
export const fetchStores            = (page) => API.get(`${stores}?page=${page}`)
export const fetchStore             = (id) => API.get(`${stores}/${id}`)
export const fetchUserStore         = (userId) => API.get(`${stores}/store/${userId}`)
export const fetchUserStoreItems    = (id) => API.get(`${stores}/store/items/${id}`)
// export const fetchUserStoreItems    = (id, page) => API.get(`${stores}/store/items/${id}?page=${page}`) visiting a user store
export const createStore            = (newData) => API.post(`${stores}/create`, newData)
export const updateStore            = (id, updatedData) => API.patch(`${stores}/update/${id}`, updatedData)
export const fetchStoresByUser      = (userId, page) => API.get(`${stores}/userStore/${userId}?page=${page}`)
export const fetchStoresBySearch    = (searchQuery, page) => API.get(`${stores}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deleteStore            = (id) => API.delete(`${stores}/delete/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

//subscribers
export const fetchSubscribers            = (page) => API.get(`${subscribers}?page=${page}`)
export const fetchSubscriber             = (id) => API.get(`${subscribers}/${id}`)
// export const createSubscriber            = (newData) => API.post(`${subscribers}/create`, newData)
export const updateSubscriber            = (id, updatedData) => API.patch(`${subscribers}/${id}`, updatedData)
// export const fetchSubscribersBySearch    = (searchQuery, page) => API.get(`${subscribers}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deleteSubscriber            = (id) => API.delete(`${subscribers}/delete/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

// users
export const fetchUsers            = (page) => API.get(`${users}?page=${page}`)
export const fetchUser             = (id) => API.get(`${users}/user/${id}`)
export const createUser            = (newData) => API.post(`${users}/signup`, newData)
export const updateUser            = (id, updatedData) => API.patch(`${users}/${id}`, updatedData)
export const updateUserEmailProfile = (id, email) => API.patch(`${users}/update-email-from-profile/${id}`, email)
export const fetchUsersBySearch    = (searchQuery, page) => API.get(`${users}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deleteUser            = (id) => API.delete(`${users}/${id}`)
export const verifyUserRegEmail    = (id, emailToken) => API.get(`${users}/user/${id}/verify/${emailToken}`)
export const resendVerification    = (emailAddress) => API.post(`${users}/resend-verification/${emailAddress}`)
export const verifyEmailPassword   = (emailAddress) => API.post(`${users}/verify-email-password/${emailAddress}`)
export const passwordReset         = (id, updatedPassword) => API.put(`${users}/reset/${id}`, updatedPassword)
export const signInUser            = (formData) => API.post(`${users}/signin`, formData)
//-------------------------------------------------------------------------------------------------------------------------------

//wishlists
export const fetchWishlists            = (page) => API.get(`${wishlists}?page=${page}`)
export const fetchWishlist             = (id) => API.get(`${wishlists}/${id}`)
// export const createWishlist            = (newData) => API.post(`${wishlists}/create`, newData)
export const updateWishlist            = (id, updatedData) => API.patch(`${wishlists}/wishlist/${id}`, updatedData)
// export const fetchWishlistsBySearch    = (searchQuery, page) => API.get(`${wishlists}/search?searchQuery=${searchQuery.search || 'none'}&page=${page}`)
export const deleteWishlist            = (id) => API.delete(`${wishlists}/delete/${id}`)
//-------------------------------------------------------------------------------------------------------------------------------

//contact us
export const createContactUsMessage = (formData) => API.post(`${contactUs}/create`, formData);
export const fetchContactMessage    = (id) => API.get(`${contactUs}/message/${id}`);
export const fetchContactMessages   = (page) => API.get(`${contactUs}?page=${page}`);
export const deleteContactUsMessage = (id) => API.delete(`${contactUs}/delete/${id}`);
//-------------------------------------------------------------------------------------------------------------------------------



// const API = axios.create({ baseURL: 'http://localhost:5000' })
// const url = 'http://localhost:5000/patients';

// export const fetchPatients = () => axios.get(url)

// export const createPatient = (newPatient) => axios.post(url, newPatient)
