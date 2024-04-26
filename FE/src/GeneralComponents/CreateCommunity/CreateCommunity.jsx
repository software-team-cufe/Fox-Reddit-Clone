import { useState } from 'react';
import { X, Globe, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import React from 'react';
import { Switch } from '@headlessui/react'
import {userAxios} from '@/Utils/UserAxios';

/**
 * Component for creating a community.
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - The function to be called when the component is closed.
 * @returns {JSX.Element} The CreateCommunity component.
 */
export default function CreateCommunity({ onClose = () => { } }) {

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
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0 ">
                            <div role="createForm" className="relative transform  rounded-xl w-80 h-3/4 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded-full">

                                    {/* Create a community heading */}
                                    <div className='flex gap-2'>
                                        <img src={`/communityCreate.png`} className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10" />
                                        <h3 className="mt-2 text-2xl font-semibold leading-6 text-gray-900" id="modal-title">Create a community</h3>
                                    </div>
                                    {/* exit button top right */}
                                    <X id="createCommX" role="exitButton" onClick={handleClose} className="p-2 absolute top-4 right-5 h-8 w-8 bg-gray-200 hover:bg-slate-300 rounded-full cursor-pointer text-gray-500 active:bg-gray-500" />

                                    {/* Description of creating a community */}
                                    <div className=" text-sm text-gray-500 my-2">
                                        Build and grow a community about something you care about. We'll help you set things up.
                                    </div>

                                    {/* Name input field with validation */}
                                    <input id="commNameInput" role="nameInput" type="text" value={inputValue} maxLength={21} onChange={handleChange} placeholder="Name" className={`bg-gray-200 self-center h-14 w-full mt-2 border-2 border-gray-200 rounded-2xl p-2 focus:outline-none focus:ring-2 focus:ring-slate-300
                                        text-sm ${isValid ? 'border-green-400' : 'border-red-700'}`} />

                                    {/* Validation text and input length display */}
                                    <div className='flex justify-between'>
                                        {isValid ? validText : invalidText}
                                        <span role="wordCounter" className='text-sm mr-4 mt-1'>{inputValue.length}</span>
                                    </div>

                                    <div className='mt-5 mb-3 font-semibold text-sm'>Type</div>

                                    {/* List of community types */}
                                    <ul role="typeOptions" className="grid w-full gap-6 md:grid-rows-2">
                                        <li>
                                            {/* Public community option */}
                                            <input id="comm-public" role="optionPublic" type="radio" name="comm" value="comm-Public" className="hidden peer" onClick={handleRadioChange} required />
                                            <label htmlFor="comm-public" className="inline-flex items-center w-full p-3 rounded-xl cursor-pointer peer-checked:bg-gray-200 hover:bg-gray-100 active:bg-gray-300">
                                                <Globe className="w-6 h-6 mr-6" />
                                                <div className="block">
                                                    <div className="text-xs font-semibold">Public</div>
                                                    <div className="w-full text-xs">Anyone can view, post, and comment to this community</div>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            {/* Private community option */}
                                            <input id="comm-private" role="optionPrivate" type="radio" name="comm" value="comm-Private" className="hidden peer" onClick={handleRadioChange} />
                                            <label htmlFor="comm-private" className="inline-flex items-center w-full p-3 rounded-xl cursor-pointer peer-checked:bg-gray-200 hover:bg-gray-100 active:bg-gray-300">
                                                <Lock className="w-6 h-6 mr-6" />
                                                <div className="block">
                                                    <div className="text-xs font-semibold">Private</div>
                                                    <div className="w-full text-xs">Only approved users can view and submit to this community</div>
                                                </div>
                                            </label>
                                        </li>
                                    </ul>
                                    <hr className='m-4 text-gray-500' />

                                    {/* NSFW area */}
                                    <div className='w-full my-3 mx-2 p-2 rounded-xl hover:bg-gray-100 flex justify-between'>
                                        <div className='flex gap-2'>

                                        {/* NSFW icon*/}
                                        <svg className="w-6 h-6" fill="currentColor" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m4.47 7.123 2.653-1.26h.47V14.5H6.15V7.668l-1.68.8V7.123Zm9.9 3.69a2.288 2.288 0 0 1-.02 2.54 2.7 2.7 0 0 1-1.085.91 3.699 3.699 0 0 1-3.068 0A2.774 2.774 0 0 1 9.1 13.35a2.253 2.253 0 0 1-.019-2.532c.257-.383.61-.69 1.025-.893A2.372 2.372 0 0 1 9.4 9.11a2.21 2.21 0 0 1-.257-1.048 2.1 2.1 0 0 1 .342-1.175c.233-.353.557-.637.938-.82.409-.202.86-.305 1.315-.3.451-.005.897.098 1.3.3.377.185.697.468.926.82.227.352.345.762.34 1.18a2.2 2.2 0 0 1-.255 1.05 2.3 2.3 0 0 1-.706.8c.415.202.77.512 1.026.896ZM12.54 13.2c.235-.11.437-.28.583-.495.142-.207.216-.454.214-.705a1.267 1.267 0 0 0-.205-.7 1.468 1.468 0 0 0-.57-.51 1.776 1.776 0 0 0-.83-.19c-.29-.004-.577.061-.836.19a1.5 1.5 0 0 0-.583.513 1.262 1.262 0 0 0 .003 1.4c.147.216.348.388.583.5.256.124.537.186.821.182a1.86 1.86 0 0 0 .82-.185Zm-1.474-6.083a1.194 1.194 0 0 0-.468.422 1.11 1.11 0 0 0-.173.615c-.002.224.058.444.173.636.113.192.275.35.468.46.201.114.429.173.66.17.23.002.456-.055.656-.167a1.233 1.233 0 0 0 .638-1.099 1.132 1.132 0 0 0-.635-1.037 1.507 1.507 0 0 0-1.319 0ZM10 19.988a4.616 4.616 0 0 1-3.27-1.352l-5.366-5.365a4.627 4.627 0 0 1 0-6.542L6.73 1.364a4.634 4.634 0 0 1 6.542 0l5.366 5.365a4.634 4.634 0 0 1 0 6.542l-5.366 5.365a4.615 4.615 0 0 1-3.27 1.352Zm0-18.726a3.362 3.362 0 0 0-2.386.987L2.25 7.614a3.374 3.374 0 0 0 0 4.772l5.366 5.365a3.38 3.38 0 0 0 4.773 0l5.365-5.365a3.375 3.375 0 0 0 0-4.772L12.387 2.25A3.364 3.364 0 0 0 10 1.262Z"></path>
                                        </svg>

                                        {/* NSFW text */}
                                        <div className='text-gray-800 grid grid-rows-2 text-xs'>
                                            <span className='font-bold'>Mature (18+)</span>
                                            <span>Must be over 18 to view and contribute</span>
                                            </div>
                                        </div>
                                        <div>

                                        {/* NSFW switch */}
                                        <div className="mr-3">
                                            <Switch id="NSFWtoggle" 
                                                checked={NSFW}
                                                onChange={setEnabled}
                                                className={`${NSFW ? 'bg-blue-900' : 'bg-gray-300'}
                                                    relative inline-flex h-8 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
                                                <span
                                                    aria-hidden="true"
                                                    className={`${NSFW ? 'translate-x-4' : 'translate-x-0'}
                                                        pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}/>
                                            </Switch>
                                        </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-end'>
                                        
                                        {/* Cancel and submit buttons */}
                                        <button id="cancelCreateComm" role="cancelButton" onClick={handleClose} className="bg-gray-100 py-2 h-12 px-4 rounded-full text-sm font-semibold text-gray-500 hover:bg-gray-200 active:bg-gray-300">Cancel</button>
                                        <button id="submitCreateComm" role="submitButton" onClick={submitRequest} disabled={!isValid} className="bg-slate-300 h-12 py-2 px-4 rounded-full text-sm font-semibold text-white ml-4 hover:bg-slate-400 enabled:hover:bg-blue-900 enabled:bg-blue-800">Create r/{inputValue}</button>
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