import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react'

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

    const [options, setoptions] = useState([{ name: "r / com1", icon: "DumPhoto1.jpg", membersCount: "12" },
    { name: " r / com2", icon: "DumPhoto2.jpg", membersCount: "125" }]);
    const [search, setSearch] = useState('');
    const [showSelector, setShowSelector] = useState(false);
    const [selected, setSelected] = useState(null);
    const [Focus, setFocus] = useState(false);

    useEffect(() => {
        const timer = setTimeout(goSearch, 200);
        console.log(showSelector)
        return () => clearTimeout(timer);

    }, [search]);


    const goSearch = () => {
        if (search) {
            setShowSelector(true);
        } else {
            setShowSelector(false);
        }
    };
    const filteredSearch = options.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={`relative border rounded-full h-12 my-2 focus:border-2  mx-auto text-xs
         w-[50%]${Focus ? 'border-blue-500 w-[50%] ' : ''}
        `}>
            <div className="  rounded-full p-2 flex gap-1 flex-wrap"
                onClick={() => setShowSelector(false)}>
                {selected &&
                    <div className="bg-gray-200 rounded-full flex items-center">
                        <div className="p-2">{selected.name}</div>
                        <div onClick={() => setSelected(null)} className="p-2 select-none rounded-r-md 
                        cursor-pointer hover:bg-magma-orange-clear">
                            <X strokeWidth={1} size={12} className='hover:bg-slate-300 rounded' />
                        </div>
                    </div>}

                <div className="flex-1">
                    <input type="text" value={search}
                        onChange={e => setSearch(e.target.value)} placeholder="Search"
                        className="w-full border-0 focus:border-0 
                         focus:outline-none focus:ring-0 py-1 px-0"
                        onFocus={() => { setFocus(true); }}
                        onBlur={() => { setFocus(false); }}
                        onKeyDown={() => { if (search && event.keyCode === 13) setSelected(search) }} />
                    {showSelector && (
                        <div className="absolute left-0 bg-white shadow h-max z-30 w-full rounded-b-md font-medium">
                            <div className="p-2 space-y-1">
                                {filteredSearch.map((item, index) => (
                                    (
                                        <div key={index} onClick={() => setSelected(item)}
                                            className="hover:bg-orange-100 flex cursor-pointer p-2 hover:border-light-blue-1">
                                            <img src={item.icon} alt={item.name} className='w-9 h-9 rounded ' />
                                            <div>
                                                <p className='mx-2 '>{item.name}</p>
                                                <p className='text-xs   mx-2  text-gray-500'>{item.membersCount} members </p>
                                            </div>
                                        </div>
                                    )
                                ))}


                                <div onClick={() => setSelected(item)}
                                    className="text-gray-500 h-6 flex rounded p-2 pb-8 hover:bg-gray-100">
                                    <Search size={16} className='mx-4 ' />
                                    <p className='text-sm'>
                                        Search for {search}
                                    </p>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
