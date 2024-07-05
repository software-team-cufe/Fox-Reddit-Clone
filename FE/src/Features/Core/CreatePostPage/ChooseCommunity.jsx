import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from "lucide-react"
import CreateCommunity from '../../../GeneralComponents/CreateCommunity/CreateCommunity';
import { userAxios } from "@/Utils/UserAxios";
import { userStore } from '../../../hooks/UserRedux/UserStore';
const Dropdown = (props) => {
    const store = userStore.getState().user.user;
    const Profile = [{ name: store.username, icon: store.avatar }]
    // { name: "r / com1", icon: "DumPhoto1.jpg", membersCount: "12", id: "1254" },
    // { name: " r / com2", icon: "DumPhoto2.jpg", membersCount: "125", id: "12562" }
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const [ShowCreateCom, setShowCreateCom] = useState(false);
    const [YourCommunities, setYourCommunities] = useState([]);
    const [OtherCommunities, setOtherCommunities] = useState([])

    useEffect(() => {
        fetchMyComs();
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        fetchOtherComs();
    }, [searchTerm])



    const fetchMyComs = async () => {
        try {
            const res = await userAxios.get('/subreddits/mine/member')
            setYourCommunities(res.data.communities);
        } catch (error) {
            console.log(error);
        }

    }

    const fetchOtherComs = async () => {
        try {
            const res = await userAxios.get(`r/search/?q=${searchTerm}&type=sr&page=1&limit=5`)
            setOtherCommunities(res.data.communitySearchResultAuth);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCreateNewCom = () => {
        setShowCreateCom(true);
    }

    const filteredProfile = Profile.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredYourCom = YourCommunities.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredOtherCom = OtherCommunities.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className=" w-[100%]  flex items-center my-4 " ref={dropdownRef}>
            <div className="relative group w-5/6">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700
                     bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                >
                    <span className="mr-2"> {props.Selected.name}</span>
                    <ChevronDown strokeWidth={2} size={20} />
                </button>
                {isOpen && (
                    <div className="absolute w-full z-10  mt-2 rounded-md shadow-lg bg-white ring-1 ring-black
                     ring-opacity-5 p-1 space-y-1 max-h-[300px] h-max overflow-auto">
                        <input
                            className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                            type="text"
                            placeholder="Search items"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        {filteredProfile.length > 0 && <div className='text-xs mt-1  m-2 font-bold text-gray-500'>YOUR PROFILE</div>}
                        {filteredProfile.map((item, id) => (
                            <button key={id} onClick={() => { props.setSelected(item); setIsOpen(false); }}
                                className=" px-4 py-2 text-gray-700 w-full 
                             hover:bg-gray-100 active:bg-blue-100 cursor-pointer h-12 flex gap-7 rounded-md">
                                <img src={item.icon} alt={item.name} className='w-9 h-9 rounded ' />
                                <p className='m-2 '>{item.name}</p>
                            </button>
                        ))}

                        {filteredYourCom.length > 0 && <> <hr className='m-4 my-6' />
                            <div className='text-xs mt-1 m-2 font-bold text-gray-500'>YOUR COMMUNITIES</div>
                            <button
                                onClick={handleCreateNewCom}
                                type="submit"
                                className="bg-white text-orange-600 font-bold text-xs rounded-full  p-1 px-2 m-1 
                 hover:bg-orange-100  disabled:text-gray-400 disabled:hover:bg-white"
                            >
                                Create New
                            </button>
                        </>}
                        {ShowCreateCom && <CreateCommunity onClose={() => { setShowCreateCom(false); }} />}
                        {filteredYourCom.map((item, id) => (
                            <button key={id} onClick={() => { props.setSelected(item); setIsOpen(false); }}
                                className=" px-4 py-2 text-gray-700 w-full 
                        hover:bg-gray-100 active:bg-blue-100 cursor-pointer h-12 flex gap-7 rounded-md">
                                <img src={item.icon} alt={item.name} className='w-9 h-9 rounded ' />
                                <div>
                                    <p className='mx-2 '>{item.name}</p>
                                    <p className='text-xs   mx-2  text-gray-500'>{item.memberCount} members </p>
                                </div>
                            </button>
                        ))}

                        {filteredOtherCom.length > 0 && <>
                            <hr className='m-4 my-6' />
                            <div className='text-xs mt-1 m-2 font-bold text-gray-500'>OTHERS</div> </>}
                        {filteredOtherCom.map((item, index) => (
                            <button key={index} onClick={() => { props.setSelected(item); setIsOpen(false); }}
                                className=" px-4 py-2 text-gray-700 w-full
                        hover:bg-gray-100 active:bg-blue-100 cursor-pointer h-12 flex gap-7 rounded-md">
                                <img src={item.icon} alt={item.name} className='w-9 h-9 rounded ' />
                                <div>
                                    <p className='mx-2 '>{item.name}</p>
                                    <p className='text-xs   mx-2  text-gray-500'>{item.membersCnt} members </p>
                                </div></button>
                        ))}
                        {filteredOtherCom.length === 0 && filteredYourCom.length === 0
                            && filteredProfile.length === 0 &&
                            <div className=' border p-1 px-6 w-full rounded'>No communities found</div>
                        }
                    </div>
                )}
            </div>
        </div >
    );
};

export default Dropdown;
