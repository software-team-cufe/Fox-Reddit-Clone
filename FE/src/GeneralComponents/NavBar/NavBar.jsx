import Logo from "@/GeneralElements/Logo/Logo";
import { userStore } from "@/hooks/UserRedux/UserStore";
import Button from "@/GeneralElements/Button/Button";
import { Link } from "react-router-dom";
import ItemsModal from "./Components/ItemsModal";
import ProfileIcon from "./Components/ProfileIcon";
import { useState } from "react";

export default function NavBar({ }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="px-[1.5rem] pt-[1rem]">
            <nav className='flex items-center justify-between'>
                <Logo className=" text-2xl" />
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    
                </div>
                <div className=''>
                    {
                        userStore.getState().user.user == null ?
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button>
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button>
                                        CreateAccount
                                    </Button>
                                </Link>
                            </div> : <ProfileIcon />
                    }
                </div>
            </nav>
        </div>

    )
}
