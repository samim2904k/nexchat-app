import React, { useState } from 'react'
import { User, Mail, Lock, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { signup } from '../lib/api.js';

const SignUpPage = () => {

    const [signupData , setSignupData] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    const queryClient = useQueryClient();

    const {mutate:signupMutation, isPending, error} = useMutation({
        mutationFn: signup,
        onSuccess:() => queryClient.invalidateQueries({queryKey: ["authUser"]})
    });

    const handleSignUp = (e) => {
        e.preventDefault();
        signupMutation(signupData);
    }

    const handleInputChange = (e) => {
        const {name,value}=e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-base-200" >
          <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-base-100 rounded-xl shadow-2xl overflow-hidden border border-primary/30">
            {/* LEFT FORM */}
            <div className="w-full lg:w-1/2 p-8">
              <h1 className="flex items-center space-x-2 text-4xl font-bold text-primary mb-4">
                <MessageCircle className="size-6 text-accent animate-bounce" /> 
                <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                  Nexchat
                </span>
              </h1>
              <p className="text-sm text-gray-400 mb-6">
                Join Nexchat and start your language learning journey
              </p>

              {/* ERROR MSG IF ANY*/}
              {error && (
                <div className='alert alert-error mb-4'>
                  {error.response.data.message}
                </div>
              )}
    
              <form onSubmit={handleSignUp} className="space-y-4">
                {/* Name */}
                <label className="input input-bordered flex items-center gap-2">
                  <User size={18} className="text-accent" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={signupData.fullName}
                    onChange={handleInputChange}
                    className="grow"
                    required
                  />
                </label>
    
                {/* Email */}
                <label className="input input-bordered flex items-center gap-2">
                  <Mail size={18} className="text-accent" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={handleInputChange}
                    className="grow"
                    required
                  />
                </label>
    
                {/* Password */}
                <label className="input input-bordered flex items-center gap-2">
                  <Lock size={18} className="text-accent" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={handleInputChange}
                    className="grow"
                    required
                  />
                </label>
                <p className="text-xs text-gray-400">Password must be at least 6 characters long</p>
    
                <div className="flex items-start space-x-2">
                  <input type="checkbox" className="checkbox checkbox-primary" required />
                  <span className="text-xs">
                    I agree to the{' '}
                    <a href="#" className="link link-primary">terms of service</a> and{' '}
                    <a href="#" className="link link-primary">privacy policy</a>
                  </span>
                </div>
    
                <button type="submit" className="btn btn-primary w-full gap-2">
                    {isPending ? (<> <span className='loading loading-spinner loading-xs'></span> Signing Up... </>) : ( <> Create Account {<ArrowRight size={18} />} </> )}
                  
                </button>
    
                <p className="text-sm text-center">
                  Already have an account?{' '}
                  <Link to="/login" className="link link-accent">Sign in</Link>
                </p>
              </form>
            </div>
    
            {/* RIGHT SECTION */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-primary bg-opacity-50 text-primary-content w-full lg:w-1/2 p-10 space-y-6">
            <img src="/i.png" alt="Language Visual" className="w-80 h-auto" />
            <div className="text-center">
                <h2 className="text-2xl text-gray-100 font-bold">Connect. Converse. Grow.</h2>
                <p className="text-sm mt-2 text-green-100 max-w-xs mx-auto">
                Find real conversation partners across the globe, improve your skills in real-time, and never stop learning.
                </p>
            </div>
            </div>
          </div>
        </div>
      );
    };

export default SignUpPage