
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
import React, { useState, useEffect, useRef } from 'react';
import { X, Search, TrendingUp } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setSearchField } from '@/hooks/UserRedux/searchSlice';
import { useMatch } from 'react-router-dom';
import { userAxios } from "@/Utils/UserAxios";

const SearchComponent = ({ Viewed, setViewed, IsLogged }) => {
    let path = useLocation().pathname;

    const [people, setpeople] = useState([]);
    const [Coms, setComs] = useState([]);
    const [search, setSearch] = useState('');
    const [showSelector, setShowSelector] = useState(false);
    const [selected, setSelected] = useState("");
    const [Focus, setFocus] = useState(false);
    const navigator = useNavigate();
    const [hideit, sethideit] = useState(false);
    const params = useParams();
    const match = useMatch("/r/:community");
    const dispatcher = useDispatch();
    const [limitPeople, setlimitPeople] = useState(3);
    const [limitCom, setlimitCom] = useState(3);
    const [ShowTrend, setShowTrend] = useState(false);
    const trendRef = useRef(null);
    const [Trending, setTrending] = useState([])

    useEffect(() => {
        //fetchData();
        //TODO: show popular when search is emtpy
        fetchTrending();
        const handleClickOutside = () => {
            if (!Focus && trendRef.current &&
                !trendRef.current.contains(event.target))
                setShowTrend(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    useEffect(() => {
        if (Focus) { setShowTrend(true); }
    }, [Focus])


    useEffect(() => {

        if (path.includes("/user/")) {
            const user = params.user;
            setViewed(`u/${user}`);
        }
        else if (path.includes("/r/")) {
            const comm = params.community;
            setViewed(`r/${comm}`);
        }
        else {
            setViewed(null);
        }

    }, [path])

    useEffect(() => {
        const timer = setTimeout(goSearch, 200);
        return () => clearTimeout(timer);

    }, [search]);

    useEffect(() => {
        fetchOtherComs();
        fetchPeople();
        if (filteredPeople.length === 0) {
            setlimitCom(5);
            setlimitPeople(6);
        }
        else if (filteredComs.length === 0) {
            setlimitCom(6);
            setlimitPeople(5);
        }
        else {
            setlimitCom(3);
            setlimitPeople(3);
        }
    }, [search])


    const fetchOtherComs = async () => {
        try {
            const res = await userAxios.get(`r/search/?q=${search}&type=sr&page=1&limit=${limitCom}`)
            if (IsLogged)
                setComs(res.data.communitySearchResultAuth);
            else if (!IsLogged) {
                setComs(res.data.communitySearchResultNotAuth);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const fetchPeople = async () => {
        try {
            const res = await userAxios.get(`r/search/?q=${search}&type=user&page=1&limit=${limitPeople}`)
            setpeople(res.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchTrending = async () => {
        try {
            const res = await userAxios.get(`r/trendingSearch`)
            console.log(res.data);
            let imgT = null;
            res.data.trendingSearches.map((trend) => {
                trend.attachments.map((img) => {
                    if (img.contains("image")) {
                        imgT = img;
                        return;
                    }
                })

            })
            const newTrends = res.data.trendingSearches.map((trend => ({
                communityIcon: trend.communityIcon,
                title: trend.title,
                communityName: trend.communityName,
                textHTML: trend.textHTML,
                img: imgT

            })))
            setTrending(newTrends);
        } catch (error) {
            console.error(error);
        }
    }

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
        if (match && Viewed != null) {
            dispatcher(setSearchField(value));
        }
        else {
            setSelected(value);
            setSearch("");
            sethideit(true);
            navigator(`/search/${value}/Posts`);
        }
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

    const filteredPeople = people.filter(item =>
        item.username.toLowerCase().includes(search.toLowerCase())
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
                {Viewed &&
                    <div className="bg-gray-200 my-auto rounded-full flex items-center">
                        <div className="p-2">{Viewed}</div>
                        <div onClick={() => setSelected("")} className="p-2 select-none rounded-r-md 
                        cursor-pointer hover:bg-magma-orange-clear">
                            <X onClick={() => { setViewed(null) }}
                                strokeWidth={1} size={12} className='hover:bg-slate-300 rounded' />
                        </div>
                    </div>}

                <div className="flex-1 my-auto">
                    <input type="text" value={search}
                        onChange={e => handlechange(e.target.value)} placeholder="Search"
                        className="w-full border-0 focus:border-0 
                         focus:outline-none focus:ring-0 py-1 px-0"
                        onFocus={() => { setFocus(true); }}
                        onBlur={() => {
                            setFocus(false);

                        }}
                        onKeyDown={(e) => { if (search && e.key === 'Enter') navToSearch(search) }} />
                    {search.length === 0 && ShowTrend && !Viewed &&
                        <> <div ref={trendRef} className=" max-h-[300px] h-max overflow-auto
                        absolute left-0 bg-white shadow   z-30 w-full rounded-b-md font-medium">
                            <div className="p-2 space-y-1">
                                <div className='flex text-xs   mx-2  text-gray-500'>
                                    <TrendingUp className='text-xs   mx-2  text-gray-500' />
                                    <p className='my-1'>TRENDING TODAY</p>
                                </div>
                                {Trending.map((item, index) => (
                                    (
                                        <div key={index}>
                                            <div ref={trendRef} onClick={() => {
                                                navToSearch(`${item.title}`);
                                                setShowTrend(false);
                                            }}
                                                className="hover:bg-orange-100 text-black  flex
                                              p-4 cursor-pointer  rounded hover:border-light-blue-1 relative">
                                                <div className=' '>
                                                    <p className='text-sm font-bold'>{item.title}</p>
                                                    <div className='mb-4  text-sm font-normal'
                                                        dangerouslySetInnerHTML={{ __html: item.textHTML }}></div>
                                                    <div className='flex'>
                                                        <img src={item.communityIcon} alt={item.communityName} className='w-5 h-5 rounded-full ' />
                                                        <p className='mx-2 mt-1 '>{item.communityName}</p>
                                                    </div>
                                                </div>
                                                {item.imgT && <img className='sm:h-24 sm:w-24 h-0 w-0 rounded right-4 absolute top-2 '
                                                    src={item.imgT} alt={item.communityName} />}
                                            </div>
                                            <hr className='mx-6 mb-4 mt-2' />
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                        </>}
                    {showSelector && (
                        !hideit && <div className=" max-h-[300px] h-max overflow-auto
                        absolute left-0 bg-white shadow  z-30 w-full rounded-b-md font-medium">
                            <div className="p-2 space-y-1">
                                {filteredPeople.length !== 0 && <> <hr className='w[80%] mx-4' /> People
                                    {filteredPeople.map((item, index) => (
                                        (
                                            <div key={index} onClick={() => { handlechange(""); navigator(`/user/${item.name}`) }}
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
                                            <div key={index} onClick={() => { navigator(`/r/${item.name}`);}}
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
