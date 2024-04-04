import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function LoginFirtstModal({ onClose = () => { } }) {

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            {(
                <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                            <div role="createForm" className="relative transform overflow-hidden rounded-xl w-80 h-[430px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg px-[50px] py-12">
                                <X role="exitButton" onClick={handleClose} className="p-2 absolute top-4 right-5 h-8 w-8 bg-gray-200 hover:bg-slate-300 rounded-full cursor-pointer text-gray-500 active:bg-gray-500" />
                                <div className='mt-3 mb-8'>
                                    <div className='font-semibold text-3xl mb-1'>Sign up</div>
                                    <div className='text-gray-900 text-xs'>You need to be logged in in order to join and interact with communities, please if you have an account
                                        <Link to='/login' className='text-blue-700 font-bold hover:text-red-500'> login </Link>
                                        or <Link to='/register' className='text-blue-700 font-bold hover:text-red-500'>create a new account</Link>!</div>
                                </div>
                                
                                <div className='flex gap-5'>
                                    <div>
                                        <div className='font-bold text-lg mb-3 ml-2'>Log in from here!</div>
                                        <div ><Link to='/login' className='bg-orange-600 text-white font-semibold text-lg py-2 px-4 rounded-full hover:bg-orange-500 w-full'>Login to account</Link></div>
                                        <div className='font-bold text-lg ml-10 mt-5 mb-3' >OR</div>
                                        <div className='font-bold text-lg mb-3 ml-2'>Sign up for free!</div>
                                        <div ><Link to='/register' className='-ml-1 bg-orange-600 text-white font-semibold text-lg py-2 px-4 rounded-full hover:bg-orange-500 w-full'>Create an account</Link></div>
                                    </div>
                                    <img src='/snooHat.png' alt="" className='h-40 w-40 mt-6 mx-auto' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}