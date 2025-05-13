import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Mail, MessageCircle, Lock, LoaderIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from "react-router"
import { login } from '../lib/api'

const LoginPage = () => {

  const [loginData,setLoginData] = useState({
    email: "",
    password: ""
  })

  const queryClient = useQueryClient();

  const {mutate:loginMutation, isPending, error} = useMutation({
    mutationFn: login,
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey : ["authUser"] })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }

  const handleChange = (e) => {
    const {name,value}=e.target;
    setLoginData({
      ...loginData,
      [name]:value,
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
          <h2></h2>
          <p className="text-sm text-gray-400 mb-6">
            Sign in to your account to continue your language learning journey
          </p>

          {/* ERROR MSG IF ANY*/}
          {error && (
            <div className='alert alert-error mb-4'>
              {error.response.data.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2">
              <Mail size={18} className="text-accent" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleChange}
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
                value={loginData.password}
                onChange={handleChange}
                className="grow"
                required
              />
            </label>
            

            <button type="submit" className="btn btn-primary w-full gap-2">
              {isPending ? (
                <>
                  <LoaderIcon className='animate-spin w-4 h-4'/> Signing In..
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-sm text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="link link-accent">Create One</Link>
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
  )
}

export default LoginPage