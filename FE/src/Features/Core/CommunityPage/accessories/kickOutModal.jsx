import { useState } from 'react';
import { X, Globe, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import React from 'react';
import { Switch } from '@headlessui/react'
import { userAxios } from '@/Utils/UserAxios';
import { Link } from 'react-router-dom';

/**
 * Component for creating a community.
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - The function to be called when the component is closed.
 * @returns {JSX.Element} The CreateCommunity component.
 */
export default function KickOutModal() {

    return (
        <>
            {(
                <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-2 text-center sm:items-center sm:p-0 ">
                            <div role="createForm" className="relative transform  rounded-xl w-80 h-3/4 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white h-[600px] rounded-full p-3">
                                    <div className="p-5 w-full h-full rounded-xl border-2 border-double border-black">
                                        <p className='mx-auto mt-10 mb-7 text-gray-800 font-bold text-md w-full text-center'>you are not a member in this community you need to join before you can view it</p>
                                        <img src={'/snooFight.png'} />
                                        <Link to='/' >
                                            <button id="kickOutToHome" role="kickOutToHome" className='mx-32 mt-20 w-44 px-3 py-2 bg-orange-600 hover:bg-orange-500 text-center rounded-full text-white'>
                                                back to homepage</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}