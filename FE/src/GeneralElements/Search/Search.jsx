import axios from "axios";
/**
 * SearchComponent is a React component that provides a search input field with a dropdown selector.
 * It allows users to search for communities and navigate to the search results page.
 *
 * @component
 * @example
 * return (
 *   <SearchComponent />
 * )
 */
import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
    const Profile = [{ name: "u / Nouran", icon: "Prof.jpg" }]
    const YourCommunities = [{ name: "r / com1", icon: "DumPhoto1.jpg", membersCount: "12" },
    { name: " r / com2", icon: "DumPhoto2.jpg", membersCount: "125" }];
    const OtherCommunities = [{ name: "r / com3", icon: "DumPhoto3.jpg", membersCount: "123" },
    {
        name: "r / com4", icon: "DumPhoto4.jpg", membersCount: "1235", rules: [
            "Be respectful to other members.",
            "No spamming or self-promotion.",
            "Keep discussions relevant to League of Legends.",
            "No hate speech or harassment of any kind.",
            "Follow Reddit's content policy."
        ],
    }];


    const [peoplee, setpeople] = useState([]);
    const [Coms, setComs] = useState([]);
    const [search, setSearch] = useState('');
    const [showSelector, setShowSelector] = useState(false);
    const [selected, setSelected] = useState("");
    const [Focus, setFocus] = useState(false);
    const navigator = useNavigate();
    const [hideit, sethideit] = useState(false);

    useEffect(() => {
        fetchData();
        //TODO: show popular when search is emtpy
    }, [])


    useEffect(() => {
        const timer = setTimeout(goSearch, 200);
        // console.log(showSelector)
        return () => clearTimeout(timer);

    }, [search]);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:3002/users');
            setpeople(res.data);
            const ress = await axios.get('http://localhost:3002/communities');
            setComs(ress.data);
        } catch (ex) {
            console.error(ex);
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
    }

    const navToSearch = (value) => {
        setSelected(value);
        setSearch("");
        sethideit(true);
        navigator(`/search/${value}/posts`);
    };

    const handlechange = (comingvalue) => {
        setSearch(comingvalue);
        sethideit(false);
    };
    const goSearch = () => {
        if (search) {
            setShowSelector(true);
        } else {
            setShowSelector(false);
        }
    };

    const filteredPeople = peoplee.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    const filteredComs = Coms.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={`relative border rounded-full h-12 my-2 focus:border-2  mx-auto text-xs
         w-[50%]${Focus ? 'border-blue-500 w-[50%] ' : ''}
        `}>
            <div className="  rounded-full p-2 flex gap-1 flex-wrap"
                onClick={() => setShowSelector(false)}>
                {/* {selected &&
                    <div className="bg-gray-200 my-auto rounded-full flex items-center">
                        <div className="p-2">{selected}</div>
                        <div onClick={() => setSelected("")} className="p-2 select-none rounded-r-md 
                        cursor-pointer hover:bg-magma-orange-clear">
                            <X strokeWidth={1} size={12} className='hover:bg-slate-300 rounded' />
                        </div>
                    </div>} */}

                <div className="flex-1 my-auto">
                    <input type="text" value={search}
                        onChange={e => handlechange(e.target.value)} placeholder="Search"
                        className="w-full border-0 focus:border-0 
                         focus:outline-none focus:ring-0 py-1 px-0"
                        onFocus={() => { setFocus(true); }}
                        onBlur={() => { setFocus(false); }}
                        onKeyDown={(e) => { if (search && e.key === 'Enter') navToSearch(search) }} />
                    {showSelector && (
                        !hideit && <div className="absolute left-0 bg-white shadow h-max z-30 w-full rounded-b-md font-medium">
                            <div className="p-2 space-y-1">
                                {filteredPeople.length !== 0 && <> <hr className='w[80%] mx-4' /> People
                                    {filteredPeople.map((item, index) => (
                                        (
                                            <div key={index} onClick={() => navToSearch(item)}
                                                className="hover:bg-orange-100 flex cursor-pointer p-2 hover:border-light-blue-1">
                                                <img src={item.avatar} alt={item.name} className='w-9 h-9 rounded ' />
                                                <div>
                                                    <p className='mx-2 '>{item.name}</p>
                                                    <p className='text-xs   mx-2  text-gray-500'> user</p>
                                                </div>
                                            </div>
                                        )
                                    ))}</>}
                                {filteredComs.length !== 0 && <> <hr className='w[80%] mx-4' /> Communities
                                    {filteredComs.map((item, index) => (
                                        (
                                            <div key={index} onClick={() => navToSearch(item)}
                                                className="hover:bg-orange-100 flex cursor-pointer p-2 hover:border-light-blue-1">
                                                <img src={item.icon} alt={item.name} className='w-9 h-9 rounded ' />
                                                <div>
                                                    <p className='mx-2 '>{item.name}</p>
                                                    <p className='text-xs   mx-2  text-gray-500'>{item.membersCount} members </p>
                                                </div>
                                            </div>
                                        )
                                    ))}</>}


                                {!hideit && <div onClick={() => navToSearch(search)}
                                    className="text-gray-500 h-6 flex rounded p-2 pb-8 hover:bg-gray-100">
                                    <Search size={16} className='mx-4 ' />
                                    <p className='text-sm'>
                                        Search for {search}
                                    </p>
                                </div>}

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
