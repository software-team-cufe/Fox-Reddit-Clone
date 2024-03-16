import { useState } from 'react';
import { X, Globe, Lock, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import React from 'react';
import communityCreate from '/communityCreate.png';

export default function CreateCommunity({ onClose = () => { } }) {

    const validText = <div className={` text-green-500 text-xs mt-1 ml-5`}>Choose wisely. Once you pick a name, it can't be changed.</div>;
    const invalidText = <div className={` text-red-600 text-xs mt-1 ml-5`}>Please fill out this field.</div>;

    const handleClose = () => {
        onClose();
    };

    const [inputValue, setInputValue] = useState('');  //input of the name field
    const [isValid, setIsValid] = useState(false);  //for valid or invalid name input
    const [commType, setCommType] = useState('');   //to select community type


    const handleChange = (event) => {    //to handle and validate the input of the name field
        const value = event.target.value;
        setInputValue(value);

        if (value.length < 3 || value.length > 21) {
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
            toast.success('Community created successfully');
            handleClose();
        }
    }

    return (
        <>
            {(
                <div className="relative" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div role="createForm" className="relative transform overflow-hidden rounded-xl w-80 h-[600px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">

                                    {/* Create a community heading */}
                                    <div className='flex gap-2'>
                                        <img src={communityCreate} className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10" />
                                        <h3 className="mt-2 text-2xl font-semibold leading-6 text-gray-900" id="modal-title">Create a community</h3>
                                    </div>
                                    {/* exit button top right */}
                                    <X role="exitButton" onClick={handleClose} className="p-2 absolute top-4 right-5 h-8 w-8 bg-gray-200 hover:bg-slate-300 rounded-full cursor-pointer text-gray-500 active:bg-gray-500" />

                                    {/* Description of creating a community */}
                                    <div className=" text-sm text-gray-500 my-2">
                                        Build and grow a community about something you care about. We'll help you set things up.
                                    </div>

                                    {/* Name input field with validation */}
                                    <input role="nameInput" type="text" value={inputValue} maxLength={21} onChange={handleChange} placeholder="Name" className={`bg-gray-200 self-center h-14 w-full mt-2 border-2 border-gray-200 rounded-2xl p-2 focus:outline-none focus:ring-2 focus:ring-slate-300
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
                                            <input role="optionPublic" type="radio" id="comm-public" name="comm" value="comm-public" className="hidden peer" onClick={handleRadioChange} required />
                                            <label htmlFor="comm-public" className="inline-flex items-center w-full p-3 rounded-xl cursor-pointer peer-checked:bg-gray-200 hover:bg-gray-100 active:bg-gray-300">
                                                <Globe className="w-6 h-6 mr-6" />
                                                <div className="block">
                                                    <div className="text-sm font-semibold">Public</div>
                                                    <div className="w-full text-xs">Anyone can view, post, and comment to this community</div>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            {/* Restricted community option */}
                                            <input role="optionRestricted" type="radio" id="comm-restricted" name="comm" value="comm-restricted" className="hidden peer" onClick={handleRadioChange} />
                                            <label htmlFor="comm-restricted" className="inline-flex items-center w-full p-3 rounded-xl cursor-pointer peer-checked:bg-gray-200 hover:bg-gray-100 active:bg-gray-300">
                                                <Eye className="w-6 h-6 mr-6" />
                                                <div className="block">
                                                    <div className="text-sm font-semibold">Restricted</div>
                                                    <div className="w-full text-xs">Anyone can view, but only approved users can contribute</div>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                            {/* Private community option */}
                                            <input role="optionPrivate" type="radio" id="comm-private" name="comm" value="comm-private" className="hidden peer" onClick={handleRadioChange} />
                                            <label htmlFor="comm-private" className="inline-flex items-center w-full p-3 rounded-xl cursor-pointer peer-checked:bg-gray-200 hover:bg-gray-100 active:bg-gray-300">
                                                <Lock className="w-6 h-6 mr-6" />
                                                <div className="block">
                                                    <div className="text-sm font-semibold">Private</div>
                                                    <div className="w-full text-xs">Only approved users can view and submit to this community</div>
                                                </div>
                                            </label>
                                        </li>
                                    </ul>
                                    <hr className='m-4 text-gray-500' />
                                    <div className='flex justify-end'>
                                        {/* Cancel and submit buttons */}
                                        <button role="cancelButton" onClick={handleClose} className="bg-gray-100 py-2 h-12 px-4 rounded-full text-sm font-semibold text-gray-500 hover:bg-gray-200 active:bg-gray-300">Cancel</button>
                                        <button role="submitButton" onClick={submitRequest} disabled={!isValid} className="bg-slate-300 h-12 py-2 px-4 rounded-full text-sm font-semibold text-white ml-4 hover:bg-slate-400 enabled:hover:bg-blue-900 enabled:bg-blue-800">Create r/{inputValue}</button>
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