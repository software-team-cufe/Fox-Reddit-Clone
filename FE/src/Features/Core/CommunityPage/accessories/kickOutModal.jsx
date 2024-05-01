import { useState } from 'react';
import { X, Globe, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import React from 'react';
import { Switch } from '@headlessui/react'
import {userAxios} from '@/Utils/UserAxios';
import { Link } from 'react-router-dom';

/**
 * Component for creating a community.
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - The function to be called when the component is closed.
 * @returns {JSX.Element} The CreateCommunity component.
 */
export default function KickOutModal({ onClose = () => { } }) {

    const validText = <div className={` text-green-500 text-xs mt-1 ml-5`}>Choose wisely. Once you pick a name, it can't be changed.</div>;
    const invalidText = <div className={` text-red-600 text-xs mt-1 ml-5`}>Please fill out this field.</div>;

    const handleClose = () => {
        onClose();
    };

    const [inputValue, setInputValue] = useState('');  //input of the name field
    const [isValid, setIsValid] = useState(false);  //for valid or invalid name input
    const [commType, setCommType] = useState('');   //to select community type
    const [NSFW, setEnabled] = useState(false)      //to enable or disable NSFW

    const handleChange = (event) => {    //to handle and validate the input of the name field
        const value = event.target.value;
        setInputValue(value);

        if (value.length < 3 || value.length > 21) { //validation of name length
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    };

    const handleRadioChange = (event) => {   //to handle change in selecting community type
        setCommType(event.target.value);
    };

    const submitRequest = () => {   //to submit the request of creating a community
        if (commType == '') {
            toast.error('Please select a community type');
        }
        else {
            userAxios.post('/create_subreddit', {
                name: inputValue,
                type: commType.replace('comm-',''),
                over18: NSFW
            })
            .then(() => {
                    toast.success('Community created successfully');
                    handleClose();
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    toast.error('A community with this name already exists');
                } else {
                    console.error('Error:', error);
                }
            });
        }
    }

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
                                    <X id="createCommX" role="exitButton" onClick={() => toast.error("nah")} className="p-2 absolute top-5 right-5 h-8 w-8 bg-gray-200 hover:bg-slate-300 rounded-full cursor-pointer text-gray-500 active:bg-gray-500" />
                                        <p className='mx-auto mt-10 mb-7 text-gray-800 font-bold text-md w-full text-center'>you are not a member in this community you need to join before you can view it</p>
                                        <img src={'/snooFight.png'}/>
                                        <Link to='/' >
                                            <button className='mx-32 mt-20 w-44 px-3 py-2 bg-orange-600 hover:bg-orange-500 text-center rounded-full text-white'>
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