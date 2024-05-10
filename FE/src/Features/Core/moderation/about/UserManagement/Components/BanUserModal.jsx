
import Button from '@/GeneralElements/Button/Button'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { Fragment, useState } from 'react'
import TextBox from '../../../../../../GeneralElements/TextBox/TextBox'
import { userAxios } from '../../../../../../Utils/UserAxios'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
export default function BanUserModal({ closeModal, isOpen, values }) {
    const params = useParams();
    // values = values ?? {};

    const [isPerminent, setPer] = useState(false);
    const handelSubmit = async () => {
        const data = Object.fromEntries(new FormData(document.getElementById('frm-ban')).entries());
        data.period = isNaN(parseInt(data.period)) ? 99999 : parseInt(data.period);
        const id = toast.loading("Please wait");
        try {

            if (values != null) {
                for (const x of Object.keys(data)) {
                    values[x] = data[x];
                }
                const res = await userAxios.patch(`/${params.community}/api/edit_content_controls`, data);
                const res2 = await axios.put(`http://localhost:3002/banned/${values.id}`, values);
            } else {
                const res2 = await axios.post(`http://localhost:3002/banned`, {
                    "userName": data.userName,
                    "reason": data.reason,
                    "note": data.note,
                    "period": data.period,
                    "communityName": params.community,
                    "banMsg": data.banMsg,
                    "image": "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png"
                });
                const res = await userAxios.post(`/${params.community}/api/ban/${data.userName}`, data);


            }

        } catch (ex) {
            
        }
        toast.dismiss(id);
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[9999px]" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white border  text-left align-middle  transition-all">

                                <div className="mt-2 flex flex-col gap-4">
                                    <div className='pt-6  px-6 flex items-center justify-between'>
                                        Ban a user:
                                        <button id="close" onClick={closeModal}><X /></button>
                                    </div>
                                    <hr />
                                    <form onSubmit={(e) => e.preventDefault()} id='frm-ban' className=' '>
                                        <div className='pt-0 p-6  space-y-4 mt-4 '>
                                            <TextBox initialValue={values?.username} name='userName' label='ENTER USERNAME' />
                                            <div>
                                                <label>Reason</label>
                                                <select defaultValue={values?.banInfo?.reason} name='reason' className='select-picker'>
                                                    <option>None</option>
                                                    <option>Spam</option>
                                                    <option>Personal and confidential information</option>
                                                    <option>Threatening, harassing, or inciting violence</option>
                                                    <option>other</option>
                                                </select>
                                            </div>
                                            <TextBox initialValue={values?.banInfo?.note} name='note' label='MOD NOTE' />
                                            <div>
                                                <label>How Long?</label>
                                                <div className='flex gap-4'>
                                                    <div className='flex'>
                                                        <TextBox initialValue={values?.banInfo?.period} name='period' type='number' disabled={isPerminent} className=' rounded-r-none' />
                                                        <div className='border flex items-center justify-center px-2 text-center rounded-r-lg'>
                                                            Days
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <input onChange={(e) => setPer(!isPerminent)} id='per' type='checkbox' />
                                                        <label htmlFor='per'>Perminent</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=' bg-gray-100 p-4 flex flex-col'>
                                            <span className='mb-2'>Note to include in ban message*</span>
                                            <TextBox initialValue={values?.banMsg} name='banMsg' area={true} placeholder='Reason' />
                                            <div className='flex gap-2 mt-5 justify-between items-center'>
                                                <span className=' text-sm'>Visible to banned user</span>
                                                <div className='flex gap-2'>
                                                    <Button id="cancelll" onClick={closeModal} className=" border bg-transparent hover:bg-transparent border-blue-500  font-semibold">
                                                        <p className='text-blue-500 '>Cancel</p>
                                                    </Button>
                                                    <Button id="bannnn" onClick={handelSubmit} className="bg-blue-500 hover:bg-blue-400">Ban</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </div>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}


