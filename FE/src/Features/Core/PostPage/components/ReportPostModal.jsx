
import Button from '@/GeneralElements/Button/Button'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { userAxios } from '../../../../Utils/UserAxios'
import TextBox from '../../../../GeneralElements/TextBox/TextBox';

export default function ReportPostModal({ closeModal, isOpen }) {
    const params = useParams();
    const handelReport = async () => {
        const data = Object.fromEntries(new FormData(document.getElementById('frm-report')).entries());
        const id = toast.loading("Please wait");
        try {
          const res = await userAxios.post("/api/report", {
            "linkID": `t3_${params.id}`,
            data
          })
        } catch (ex) { }
        toast.dismiss(id);
      };
    const [isPerminent, setPer] = useState(false);
   
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
                                        Submit a report
                                        <button onClick={closeModal}><X /></button>
                                    </div>
                                    <hr />

                                    <form onSubmit={(e) => e.preventDefault()} id='frm-report' className=' '>
                                        <div className='pt-0 p-6  space-y-4 mt-4 '>
                                            <p className='my-4'>
                                                Thanks for looking out for yourself and your fellow redditors by reporting things that break the rules. Let us know what's happening, and we'll look into it.</p>


                                            <div>
                                                <label>Reason</label>
                                                <select name='reason' className='select-picker'>
                                                    <option>Harassment</option>
                                                    <option>Threatening violence</option>
                                                    <option>Hate</option>
                                                    <option>Minor abuse or sexualization</option>
                                                    <option>Sharing personal information</option>
                                                    <option>Non-consensual intimate media</option>
                                                    <option>Prohibited transaction</option>
                                                    <option>Impersonation</option>
                                                    <option>Copyright violation</option>
                                                    <option>Trademark violation</option>
                                                    <option>Self-harm or suicide</option>
                                                    <option>Spam</option>
                                                </select>
                                            </div>
                                            <h2 className=' text-lg font-semibold'>Who is being impersonated?</h2>
                                            <select name='impersonated' className='select-picker'>
                                                <option>You or an individual or entity you represent</option>
                                                <option>Someone else</option>
                                                
                                            </select>
                                        </div>

                                        <div className=' bg-gray-100 p-4 flex flex-col'>
                                           
                                            <div className='flex gap-2 mt-5 justify-end items-center'>
                                                
                                                <div className='flex gap-2'>
                                                    <Button onClick={closeModal} className=" border bg-transparent hover:bg-transparent border-blue-500  font-semibold">
                                                        <p className='text-blue-500 '>Cancel</p>
                                                    </Button>
                                                    <Button onClick={handelReport} className="bg-blue-500 hover:bg-blue-400">Ban</Button>
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
