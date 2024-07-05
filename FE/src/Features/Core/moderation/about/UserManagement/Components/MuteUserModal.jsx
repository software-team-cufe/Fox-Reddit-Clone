
import Button from '@/GeneralElements/Button/Button'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { Fragment, useState } from 'react'
import TextBox from '../../../../../../GeneralElements/TextBox/TextBox'
import { userAxios } from '../../../../../../Utils/UserAxios'
import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import axios from 'axios'
export default function MuteUserModal({ closeModal, isOpen, }) {
    const params = useParams();
    const values = {}

    const [isPerminent, setPer] = useState(false);
    const handelSubmit = async () => {
        const data = Object.fromEntries(new FormData(document.getElementById('frm-ban')).entries());

        const id = toast.loading("Please wait");
        try {
            
            const res2 = await axios.post('http://localhost:3002/muted', {
                "communityName": params.community,
                "userName": data.userName,
                "reason": data.reason,
                "image": "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png"
            });
            const res = await userAxios.post(`/${params.community}/api/mute/${data.userName}`, data);
            // for (const x of Object.keys(data)) {
            //     values[x] = data[x];
            // }
            // const res2 = await axios.put(`http://localhost:3002/banned/${values.id}`, values);
        } catch (ex) { }
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
                                        Mute  user:
                                        <button id="close" onClick={closeModal}><X /></button>
                                    </div>
                                    <hr />
                                    <form onSubmit={(e) => e.preventDefault()} id='frm-ban' className=' '>
                                        <div className='pt-0 p-6  space-y-4 mt-4 '>
                                            <TextBox
                                                initialValue={values.userName}
                                                name='userName' label='User to mute' />

                                            <TextBox area={true} initialValue={values.note} name='reason' label='reason' />
                                            <div className='flex gap-2 mt-5 justify-between items-center'>
                                                <div></div>
                                                <div className='flex gap-2'>
                                                    <Button id="cancel-btn" onClick={closeModal} className=" border bg-transparent hover:bg-transparent border-blue-500  font-semibold">
                                                        <p className='text-blue-500 '>Cancel</p>
                                                    </Button>
                                                    <Button id="submit-bttn" onClick={handelSubmit} className="bg-blue-500 hover:bg-blue-400">Mute</Button>
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


