
import Button from '@/GeneralElements/Button/Button'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { Fragment, useState } from 'react'
import TextBox from '../../../../../../GeneralElements/TextBox/TextBox'
import { userAxios } from '../../../../../../Utils/UserAxios'
import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import axios from 'axios';

const items = [
    {
        name: "manageUsers",
        title: "Manage Users",
        subTitle: "Access mod notes, ban and mute users, and approve submitters*.",
    },
    {
        name: "createLiveChat",
        title: "Create Live Chats",
        subTitle: "Create live chat posts in this community.",
    },
    {
        name: "manageSettings",
        title: "Manage Settings",
        subTitle: "Manage community settings, appearance, emojis, rules, and AutoMod*.",
    },
    {
        name: "manageFlair",
        title: "Manage Flair",
        subTitle: "Create and manage user and post flair.",
    },
    {
        name: "manageModMail",
        title: "Manage Modmail",
        subTitle: "Read and respond to modmail and mute users*.",
    },
    {
        name: "managePosts",
        title: "Manage Posts & Comments",
        subTitle: "Access queues, take action on content, and manage collections and events.",
    },
    {
        name: "manageWikiPages",
        title: "Manage Wiki Pages",
        subTitle: "Create and manage wiki pages and AutoMod*.",
    },
]

export default function AddModeratorModal({ closeModal, isOpen, initial }) {
    const params = useParams();
    const values = initial ?? {};
    console.log(values);
    const [isPerminent, setPer] = useState(false);
    const handelSubmit = async () => {
        const data = Object.fromEntries(new FormData(document.getElementById('frm-ban')).entries());
        const obj = {};
        for (const x of items) {
            obj[x.name] = data[x.name] == "on" ? true : data[x.name] == null ? false : data[x.name];
        }
        console.log(obj);
        const id = toast.loading("Please wait");
        try {

            if (initial) {
                const res2 = await axios.patch(`http://localhost:3002/moderators/${initial.id}`, {
                    "communityName": params.community,
                    "username": data.username,
                    "rules": obj
                });
            } else {
                const res2 = await axios.post('http://localhost:3002/moderators', {
                    "communityName": params.community,
                    "username": data.username,
                    "rules": obj
                });
            }
            // const res = await userAxios.post(`/${params.community}/api/mute/${data.userName}`, data);

        } catch (ex) { }
        try {

            const res2 = await userAxios.post(`/${params.community}/api/join_moderator`, {
                "communityName": params.community,
                "username": data.username,
                "rules": obj
            });
            // const res = await userAxios.post(`/${params.community}/api/mute/${data.userName}`, data);

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
                                        Invite Moderators
                                        <button onClick={closeModal}><X /></button>
                                    </div>
                                    <hr />
                                    <form onSubmit={(e) => e.preventDefault()} id='frm-ban' className=' '>
                                        <div className='pt-0 p-6  space-y-4 mt-4 '>
                                            <TextBox
                                                initialValue={values.username}
                                                name='username' label='User name' />

                                            <div>
                                                <p className='mb-4'>Give them access to...</p>
                                                <div className=' space-y-4'>
                                                    {
                                                        items.map((e, idx) => <div className='grid grid-cols-6 gap-1' key={idx}>
                                                            <div className=' col-span-1'>
                                                                <input defaultChecked={values?.rules == null ? false : values?.rules[e.name]} type='checkbox' name={e.name} />
                                                            </div>
                                                            <div className='flex flex-col col-span-5'>
                                                                <label>{e.title}</label>
                                                                <label className=' text-gray-500 text-sm truncate'>{e.subTitle}</label>
                                                            </div>
                                                        </div>)
                                                    }
                                                </div>
                                            </div>
                                            <div className='flex gap-2 mt-5 justify-between items-center'>
                                                <div></div>
                                                <div className='flex gap-2'>
                                                    <Button onClick={closeModal} className=" border bg-transparent hover:bg-transparent border-blue-500  font-semibold">
                                                        <p className='text-blue-500 '>Cancel</p>
                                                    </Button>
                                                    <Button onClick={handelSubmit} className="bg-blue-500 hover:bg-blue-400">Add</Button>
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


