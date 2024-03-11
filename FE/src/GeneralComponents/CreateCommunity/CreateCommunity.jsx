import { useState } from 'react';
import { X, Globe,Lock,Eye } from 'lucide-react';

export default function CreateCommunity() {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value == "") {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-xl w-80 h-[600px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className='flex gap-2'>
                                        <img src={'communityCreate.png'} className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10" />
                                        <h3 className="mt-2 text-2xl font-semibold leading-6 text-gray-900" id="modal-title">Create a community</h3>
                                    </div>
                                    <X onClick={handleClose} className="p-2 absolute top-4 right-5 h-8 w-8 bg-gray-200 hover:bg-slate-300 rounded-full cursor-pointer text-gray-500 active:bg-gray-500" />
                                    <div className=" text-sm text-gray-500 my-2">Build and grow a community about something you care about. We'll help you set things up.</div>
                                    <input type="text" value={inputValue} maxLength={21} onChange={handleChange} placeholder="Name" className={`bg-gray-200 self-center h-14 w-full mt-2 border-2 border-gray-200 rounded-2xl p-2 focus:outline-none focus:ring-2 focus:ring-slate-300
                                            text-sm ${isValid ? '' : 'border-red-700'}`} />
                                    <div className='flex justify-between'>
                                    <div className={`${isValid ? 'hidden' : 'visible'} text-red-600 text-xs mt-1 ml-5`}>Please fill out this field.</div>
                                    <div className={`${isValid ? 'visible' : 'hidden'} text-green-500 text-xs mt-1 ml-5`}>Choose wisely. Once you pick a name, it can't be changed.</div>
                                    <span className='text-sm mr-4 mt-1'>{inputValue.length}</span>
                                    </div>
                                    <div className='mt-5 mb-3 font-semibold text-sm'>Type</div>

                                    <ul className="grid w-full gap-6 md:grid-rows-2">
                                        <li>
                                            <input type="radio" id="comm-public" name="comm" value="comm-public" className="hidden peer" required />
                                            <label htmlFor="comm-public" className="inline-flex items-center w-full p-3 rounded-xl cursor-pointer peer-checked:bg-gray-200 hover:bg-gray-100 active:bg-gray-300">
                                                <Globe className="w-6 h-6 mr-6" />
                                                <div className="block">
                                                    <div className="text-sm font-semibold">Public</div>
                                                    <div className="w-full text-xs">Anyone can view, post, and comment to this community</div>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                        <input type="radio" id="comm-restricted" name="comm" value="comm-restricted" className="hidden peer" />
                                            <label htmlFor="comm-restricted" className="inline-flex items-center w-full p-3 rounded-xl cursor-pointer peer-checked:bg-gray-200 hover:bg-gray-100 active:bg-gray-300">
                                                <Eye className="w-6 h-6 mr-6" />
                                                <div className="block">
                                                    <div className="text-sm font-semibold">Restricted</div>
                                                    <div className="w-full text-xs">Anyone can view, but only approved users can contribute</div>
                                                </div>
                                            </label>
                                        </li>
                                        <li>
                                        <input type="radio" id="comm-private" name="comm" value="comm-private" className="hidden peer" />
                                            <label htmlFor="comm-private" className="inline-flex items-center w-full p-3 rounded-xl cursor-pointer peer-checked:bg-gray-200 hover:bg-gray-100 active:bg-gray-300">
                                                <Lock className="w-6 h-6 mr-6" />
                                                <div className="block">
                                                    <div className="text-sm font-semibold">Restricted</div>
                                                    <div className="w-full text-xs">Anyone can view, but only approved users can contribute</div>
                                                </div>
                                            </label>
                                        </li>
                                    </ul>
                                    <hr className='m-4 text-gray-500'/>
                                    <div className='flex justify-end'>
                                        <button onClick={handleClose} className="bg-gray-100 py-2 h-12 px-4 rounded-full text-sm font-semibold text-gray-500 hover:bg-gray-200">Cancel</button>
                                        <button disabled={!isValid}className="bg-slate-300 h-12 py-2 px-4 rounded-full text-sm font-semibold text-white ml-4 hover:bg-slate-400 enabled:hover:bg-blue-900 enabled:bg-blue-800">Create r/{inputValue}</button>
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