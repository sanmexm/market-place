import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
// import { About, Contact, Faq, ForgotPassword, Posts, EditPost, Profile, Home, CreatePost, Login, ResendVerification, PageNotFound, Privacy, Services, Terms, ResetPassword, Dashboard, Register } from './pages';
import { About, Cart, Checkout, Contact, CreatePost, CreateProfile, CreateStore, Dashboard, EditUserStoreImageCover, Faq, ForgotPassword, Home, Login, PageNotFound, Post, PostItems, Posts, Privacy, PublicStore, Ratings, Register, ResendVerification, ResetPassword, Reviews, SearchPosts, SuccessPayment, Terms, UserProfile, UserStore, VerifyEmail, ViewUserPost, ViewUserSingleStore, ViewUserStore, Wishlist } from './pages';
import { Footer, Navbar } from './components';

const App = () => {
  const authData           = JSON.parse(localStorage.getItem('authData'))
  const { modeValue }      = useSelector((state) => state.modeList);
  const [theme, setTheme]  = useState(modeValue);

  const toggleTheme = () => {
    setTheme(modeValue === "light" ? "dark" : "light");
  };
  
  useEffect(() => {
    setTheme(modeValue);
  }, [modeValue]);

  return (
    <div className='main-container' id={theme}>
        <Toaster position='top-center' reverseOrder="false" gutter={8} toastOptions={{ className: 'toast-option' }} containerStyle={{top: '15%', }}></Toaster>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={!authData ? (<Login />) : (<Navigate to="/posts" replace />) } />
          <Route path="/register" exact element={!authData ? (<Register />) : (<Navigate to="/posts" replace />) } />
          <Route path='/users/create-profile' exact element={authData ? (<CreateProfile />) : (<Navigate to='/login' replace />)} />
          <Route path='/users/user-profile' exact element={authData ? (<UserProfile />) : (<Navigate to='/login' replace />)} />
          <Route path='/stores/create-store' exact element={authData ? (<CreateStore />) : (<Navigate to='/login' replace />)} />
          <Route path='/stores/user-store' exact element={authData ? (<UserStore />) : (<Navigate to='/login' replace />)} />
          <Route path='/stores/view-user-store/:id' exact element={authData ? (<ViewUserStore />) : (<Navigate to='/login' replace />)} />
          <Route path='/stores/edit-store-image-cover/:id' exact element={authData ? (<EditUserStoreImageCover />) : (<Navigate to='/login' replace />)} />
          <Route path='/stores/edit-store/:id' exact element={authData ? (<ViewUserSingleStore />) : (<Navigate to='/login' replace />)} />
          <Route path="/posts/my-posts" exact element={authData ? (<Dashboard />) : (<Navigate to='/login' replace />)} />
          <Route path='/posts/view-user-post/:id' exact element={authData ? (<ViewUserPost />) : (<Navigate to='/login' replace />)} />
          {/* <Route path='/users/user-profile/:id' exact element={authData ? (<PublicProfile auth={authData} />) : (<Navigate to='/login' replace />)} /> 
          */}
          <Route path='/stores/user-store/:id' exact element={<PublicStore />} /> 
          <Route path='/search' exact element={<SearchPosts />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/ratings/post-ratings/:id" element={<Ratings />} />
          <Route path="/reviews/post-reviews/:id" element={<Reviews />} />
          <Route path="/post-items/:title/filtered" element={<PostItems />} />
          <Route path='/posts/create-post' exact element={authData ? (<CreatePost />) : (<Navigate to='/login' replace />)} />
          <Route path="/posts/post/:id" element={<Post />} />
          <Route path="/men" element={<Posts category="men" />} />
          <Route path="/women" element={<Posts category="women" />} />
          <Route path="/kids" element={<Posts category="kids" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path='/checkout' exact element={authData ? (<Checkout />) : (<Navigate to='/login' replace />)} />
          <Route path='/success/payment' exact element={authData ? (<SuccessPayment />) : (<Navigate to='/login' replace />)} />
          <Route path='/user/:id/verify/:emailToken' exact element={!authData ? (<VerifyEmail /> ) : (<Navigate to="/" replace />)} />
          <Route path='/forgot-password' exact element={!authData ? (<ForgotPassword />) : (<Navigate to="/" replace />)} />
          <Route path='/resend-verification' exact element={!authData ? (<ResendVerification />) : (<Navigate to="/" replace />)} />
          <Route path='/users/:id/reset-password/:emailAddress/token/:resetPasswordToken' exact element={!authData ? (<ResetPassword /> ) : (<Navigate to="/" replace />)} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/frequently-asked-questions" element={<Faq />} />
          <Route path='/page-not-found' exact element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/page-not-found" replace />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App