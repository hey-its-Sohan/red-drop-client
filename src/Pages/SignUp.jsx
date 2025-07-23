import React, { use, useState } from 'react';
import loginImg from '../assets/mainLogo.png'
import { toast } from 'react-toastify';
import { AuthContext } from '../Contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router';

const SignUp = () => {

  const { setUser, updateUser, createUser } = use(AuthContext)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();
  const location = useLocation()

  const handleSignUp = e => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const { name, photoURL, email, password } = Object.fromEntries(formData.entries())
    setErrorMessage('')

    // password validation
    const passwordValidation = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (passwordValidation.test(password) === false) {
      setErrorMessage('Password must contain at least one uppercase, one lowercase letter and be at least 6 characters long.')
      return;
    }

    createUser(email, password)
      .then((result) => {
        // Signed up 
        const user = result.user;

        updateUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL })
          }).then(() => {
            toast.success('Account Created Successfully');
            navigate(location?.state || '/');
          }).catch(() => {
            setErrorMessage('Profile update failed.');
          });

        // ...
      })
      .catch((error) => {
        console.log("Error signing up:", error.code, error.message);
        setErrorMessage(error.message);
        // ..
      });
  }


  return (
    <div className="min-h-screen flex">
      {/* Left side with image */}
      <div className="hidden md:flex w-1/2">
        <img
          src={loginImg}
          alt="Login Banner"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side with form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-base-100 px-6 py-12">
        <div className="w-full bg-white p-5 shadow-md rounded-lg max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">Create an Account</h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="label font-medium">Name</label>
              <input type="text" name='name' className="input input-bordered w-full" placeholder="Your full name" />
            </div>
            <div>
              <label className="label font-medium">Email</label>
              <input type="email" name='email' className="input input-bordered w-full" placeholder="you@example.com" />
            </div>
            <div>
              <label className="label font-medium">Photo URL</label>
              <input type="url" name='photoURL' className="input input-bordered w-full" placeholder="https://example.com/photo.jpg" />
            </div>
            <div>
              <label className="label font-medium">Password</label>
              <input type="password" name='password' className="input input-bordered w-full" placeholder="Your secure password" />
            </div>
            {errorMessage && <p className='text-primary'>{errorMessage}</p>}
            <button className="btn btn-primary text-white w-full mt-2">Sign Up</button>
            <p className="text-center text-sm mt-2">Already have an account?
              <a href="/login" className="link link-primary ml-1">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;