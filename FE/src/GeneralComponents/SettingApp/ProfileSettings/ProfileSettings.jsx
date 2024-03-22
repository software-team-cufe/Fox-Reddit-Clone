import { useState } from 'react'
import { Plus } from "lucide-react";
import SocialLinks from './SocialLinks';

function ProfileSettings() {
    const [DisplayName, setDisplayName] = useState("");
    const [IsDNEditable, setIsDNEditable] = useState(true); //Display Name
    const [About, setAbout] = useState("");
    const [IsAboutEditable, setIsAboutEditable] = useState(true);
    const [OpenLikePop, setOpenLikePop] = useState(false);


    const handleDisplayNameChange = (event) => {
        const newContent = event.target.value;
        setDisplayName(newContent);
    };
    const handleMaxcharDN = (event) => {
        if (DisplayName.length >= 30 && !(event.key === 'Backspace')) {
            setIsDNEditable(false);
            event.preventDefault()
        }
        else {
            setIsDNEditable(true);
        }
    }

    const handleAboutChange = (event) => {
        const newContent = event.target.value;
        setAbout(newContent);
    };
    const handleMaxcharAbout = (event) => {
        if (About.length >= 200 && !(event.key === 'Backspace')) {
            setIsAboutEditable(false);
            event.preventDefault()
        }
        else {
            setIsAboutEditable(true);
        }
    }

    const handleOpenLinkPop = () => {
        OpenLikePop ? setOpenLikePop(false) : setOpenLikePop(true)
    }




    return (
        <>
            <h1 className='my-9 text-xl'>Customize profile</h1>
            <div className='text-xs  text-gray-500'>PROFILE INFORMATION</div>
            <hr className='mb-6' />

            <h2 className=' text-base'>Display name (optional)</h2>
            <div className='text-xs  text-gray-500'>Set a display name. This does not change your username.</div>
            <input
                className="rounded h-12 p-2 border text-sm border-gray-300 w-full my-4 focus:border-gray-400 "
                type="text"
                onKeyDown={handleMaxcharDN}
                onChange={handleDisplayNameChange}
                placeholder='Display name (optional)'
            />
            {IsDNEditable &&
                <div className="text-xs text-gray-500"><span>{30 - DisplayName.length}  Characters remaining</span></div>
            }
            {!IsDNEditable &&
                <div className="text-xs text-red-500"><span> 0 Characters remaining</span></div>
            }

            <h2 className=' text-base'>About (optional)</h2>
            <div className='text-xs  text-gray-500'>A brief description of yourself shown on your profile.</div>
            <textarea
                className="rounded h-20 pb-4 pt-1 px-1  border text-sm border-gray-300 w-full my-4 focus:border-gray-400 "
                type="text"
                onKeyDown={handleMaxcharAbout}
                onChange={handleAboutChange}
                placeholder='About (optional)'
            />
            {IsAboutEditable &&
                <div className="text-xs text-gray-500"><span>{200 - About.length} Characters remaining</span></div>
            }
            {!IsAboutEditable &&
                <div className="text-xs text-red-500"><span> 0 Characters remaining</span></div>
            }

            <h2 className=' text-base'>Social links (5 max)</h2>
            <div className='text-xs my-4   text-gray-500'>People who visit your profile will see your social links.</div>
            <button onClick={handleOpenLinkPop} className='rounded-full border p-4 bg-gray-200 flex hover:bg-gray-300'>
                <Plus size={12} />
                <div className='mx-2 text-xs font-bold'>Add social link </div>
            </button>

            {OpenLikePop &&
                <SocialLinks handleOpenLinkPop={handleOpenLinkPop} />
            }
        </>
    )
}

export default ProfileSettings