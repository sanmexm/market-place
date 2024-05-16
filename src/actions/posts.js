import * as api from '../api'
import { startLoading, endLoading, setPosts, setPostsByOwner, setSinglePost, setPostsSearch, setUpdatePost, setDeletePost, setFilteredPosts, setFilteredRelatedPosts, setFilteredMoreSupplierPosts, setPostsByStoreId } from '../reducers/postsSlice'
//action creators
// redux thunk allows additional arrow function to a function

export const actionCreatePost = (newPost) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.createPost(newPost)
        dispatch({
            type: setPosts.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log("create post error:", error);
        if (error.response) {
            console.log("Error message:", error.response.data.message);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionFetchPosts = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPosts(page)
        dispatch({
            type: setPosts.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
        if (error.response) {
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionFetchFilteredRelatedPosts = (postId, postType, category, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchFilteredRelatedPosts(postId, postType, category, page)
        dispatch({
            type: setFilteredRelatedPosts.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
        if (error.response) {
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionFetchFilteredMoreSupplierPosts = (userId, postId, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchFilteredMoreSupplierPosts(userId, postId, page)
        dispatch({
            type: setFilteredMoreSupplierPosts.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
        if (error.response) {
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionFetchFilteredPosts = (postType, category, tag, sort, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchFilteredPosts(postType, category, tag, sort, page)
        dispatch({
            type: setFilteredPosts.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        if (error.response) {
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionFetchPostsByStoreId = (storeId, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPostsByStoreId(storeId, page)
        dispatch({
            type: setPostsByStoreId.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}

export const actionFetchPostsByUser = (user, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPostsByUser(user, page)
        dispatch({
            type: setPostsByOwner.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}

export const actionFetchPostsBySearch = (searchQuery, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        // dispatch(fetchPostsBySearch({ search: searchQuery, tags: 'your_tags_value' }, page));
        const { data } = await api.fetchPostsBySearch(searchQuery, page)
        dispatch({
            type: setPostsSearch.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log("Axios error:", error);
        if (error.response) {
            console.log("Error status:", error.response.status);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionFetchPost = (id) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPost(id)
        dispatch({
            type: setSinglePost.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
        if (error.response) {
            console.log("Error status:", error.response.status);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionUpdatePost = (id, updatedPost) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.updatePost(id, updatedPost)
        dispatch({
            type: setUpdatePost.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
        if (error.response) {
            console.log("Error status:", error.response.status);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionDeletePost = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deletePost(id)
        dispatch({
            type: setDeletePost.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}