import React, { useState } from 'react'
import { Shuffle, Globe, CameraIcon, MapPinIcon, LoaderIcon } from "lucide-react";
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { completeOnboarding } from '../lib/api';
import { LANGUAGES } from '../constants';

const OnboardingPage = () => {

  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  
  const [formState , setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || ""
  });

  const {mutate: onboardingMutation, isPending} = useMutation({
    mutationFn: completeOnboarding,
    onSuccess : () => {
      toast.success('Profile onboarded successfully.');
      queryClient.invalidateQueries({ queryKey : ["authUser"]});
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  }

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setFormState({
      ...formState,
      [name]:value,
    })
  }

  const handleRandomAvatar = (e) => {
    e.preventDefault();
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState , profilePic : randomAvatar});
    toast.success("Random avatar generated!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200" >
      <div className="w-full max-w-xl p-6 rounded-2xl shadow-xl bg-base-100 border border-primary/30 space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            {
              formState.profilePic ? (
                <img src={formState.profilePic} alt="Avatar" className="object-cover w-full h-full" />
              ) : (
                <div className='flex items-center justify-center h-full'>
                  <CameraIcon className='size-12 text-base-content opacity-40'/>
                </div>
              )
            }
          </div>
          <button type='button' className="btn btn-accent gap-2" onClick={handleRandomAvatar}>
            <Shuffle className="w-4 h-4" /> Generate Random Avatar
          </button>
        </div>

        <div className="space-y-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              placeholder="Full Name"
              value={formState.fullName}
              className="grow"
              name='fullName'
              onChange={handleInputChange}
            />
          </label>

          <div className="form-control">
            <textarea
              placeholder="Tell others about yourself and your language learning goals"
              className="textarea textarea-bordered w-full h-24 resize-none"
              name='bio'
              value={formState.bio}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="flex gap-4">
            <select className="select select-bordered w-full" name='nativeLanguage' value={formState.nativeLanguage} onChange={handleInputChange}>
              <option>Select your native language</option>
              {LANGUAGES.map((lang) => (
                <option key={`native-${lang}`} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>

            <select className="select select-bordered w-full" name='learningLanguage' value={formState.learningLanguage} onChange={handleInputChange}>
              <option>Select language you're learning</option>
              {LANGUAGES.map((lang) => (
                <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className='relative'>
            <MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70'/>
            <label className="input input-bordered flex items-center gap-2 pl-10">
            
              <input
                type="text"
                placeholder="City, Country"
                className="grow"
                name='location'
                value={formState.location}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <button type='submit' className="btn btn-primary w-full gap-2" disabled={isPending}>
            {!isPending ? (
              <>
                <Globe className="w-4 h-4" /> Complete Onboarding
              </>
            ) : (
              <>
                <LoaderIcon className="animate-spin w-4 h-4" /> Onboarding...
              </>
            )}
          </button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default OnboardingPage