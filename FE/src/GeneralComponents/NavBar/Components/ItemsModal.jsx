import { configs } from '@/Features/Core/CoreTexts'
import Button from '@/GeneralElements/Button/Button'
import { logOutUser } from '@/hooks/UserRedux/UserModelSlice'
import { userStore } from '@/hooks/UserRedux/UserStore'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
export default function ItemsModal({ closeModal, isOpen }) {
    const nav = useNavigate();
    const disp = useDispatch();
    const logOut = () => {
        disp(logOutUser());
        nav(0);
        return;
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl  border p-6 text-left align-middle  transition-all">

                                <div className="mt-2 flex flex-col gap-4">
                                    {
                                        configs.navItem.map((e, idx) => <a key={idx} href={e.href} onClick={closeModal}>
                                            <Button className="w-full" >{e.text}</Button>
                                            </a>)
                                    }
                                    {
                                        userStore.getState().user.user == null ? <>
                                            <Link to="/login" onClick={closeModal}>
                                                <Button className="mb-3 flex gap-2 w-full text-center justify-center items-center">
                                                    <i className="fa-solid fa-circle-arrow-left" />
                                                    <p>Login</p>
                                                </Button>
                                            </Link>
                                            <Link to="/register" onClick={closeModal}>
                                                <Button className="mb-3 flex gap-2 w-full text-center justify-center items-center">
                                                    <i className="fa-solid fa-circle-plus" />
                                                    <p>Careate account</p>
                                                </Button>
                                            </Link>
                                        </> : <>
                                            <Link to="/orders" onClick={closeModal}>
                                                <Button className="w-full"  >
                                                    طلباتي
                                                </Button>
                                            </Link>
                                            <Link to="/settings" onClick={closeModal}>
                                                <Button className={'w-full'}>
                                                    Settings
                                                </Button>
                                            </Link>
                                            {
                                                (userStore.getState().user.user != null && !userStore.getState().user.user.verifiedEmail) &&
                                                <Link to="/verify-email" onClick={closeModal}>
                                                    <Button className={'w-full'}>
                                                        Active account
                                                    </Button>
                                                </Link>
                                            }
                                            <Button onClick={logOut} className={'w-full flex gap-3 justify-center items-center'}>
                                                <i className="fa-solid fa-right-from-bracket"></i>
                                                <p> Logout </p>
                                            </Button>

                                        </>
                                    }
                                </div>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}


