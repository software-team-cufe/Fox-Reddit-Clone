import React, { useState, useEffect } from "react";
import axios from "axios";
import { userAxios } from "@/Utils/UserAxios";
import { responsiveFontSizes } from "@mui/material";

function SafetySettings() {
    const [FocusBlock, setFocusBlock] = useState(false);
    const [BlockValue, setBlockValue] = useState("");
    const [FocusMute, setFocusMute] = useState(false);
    const [MuteValue, setMuteValue] = useState("");
    const [EnableAddBlock, setEnableAddBlock] = useState(true);
    const [EnableAddMute, setEnableAddMute] = useState(true);
    const [isFocusedB, setIsFocusedB] = useState("border-gray-400");
    const [isFocusedM, setIsFocusedM] = useState("border-gray-400");
    const [MutedCom, setMutedCom] = useState([]);
    const [Blocked, setBlocked] = useState([]);
    //To do add of both fields

    const handleAddBlock = async () => {
        const val = idfromname(BlockValue);
        if (val != null) {
            try {
                const res = await axios.get(`http://localhost:3002/users/${val}`);
                setBlocked(prevBlocked => [...prevBlocked, { avatar: res.data.avatar, name: res.data.name }]);


            } catch (ex) {
                console.error(ex);
                if (ex.issues != null && ex.issues.length != 0) {
                    toast.error(ex.issues[0].message);
                }
            }
        }
    }
    const handleAddMute = () => {//To do
    }

    useEffect(() => {
        fetchMock();
        // fetchBlock();
    }, [])
    const idfromname = (name) => {
        axios.get(`http://localhost:3002/users`)
            .then(response => {
                console.log(name)
                response.data.map(user => {
                    console.log(user.name)
                    if (user.name == name) {
                        return user.id;
                    }
                })
                console.log("user not found");
                return null;
            })
            .catch(err => console.error(err));
    }
    // const fetchBlock = async () => {
    //     try {
    //         const res = await userAxios.get('/api/v1/me/blocked');
    //         console.log(res.data);
    //     } catch (ex) {
    //         if (ex.issues != null && ex.issues.length != 0) {
    //             toast.error(ex.issues[0].message);
    //         }
    //     }
    // }
    const fetchMock = async () => {
        try {
            const res = await axios.get('http://localhost:3002/users/1');
            setBlocked(res.data.blocked);
            setMutedCom(res.data.Muted);
        } catch (ex) {
            console.error(ex);
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
    }

    useEffect(() => {
        if (BlockValue.length === 0)
            setEnableAddBlock(true);
        else setEnableAddBlock(false);
    }, [BlockValue])
    useEffect(() => {
        if (MuteValue.length === 0)
            setEnableAddMute(true);
        else setEnableAddMute(false);
    }, [MuteValue])

    const handleBlockInputValue = (event) => {
        setBlockValue(event.target.value);

    }
    const handleMuteInputValue = (event) => {
        setMuteValue(event.target.value);

    }
    const addToBlocked = (avatar, name) => {
        setBlocked(prevBlocked => [...prevBlocked, { avatar, name }]);
    };

    return (


        <div>
            <div className="w-[75%]">
                <h1 className='font-bold my-4 text-xl'>Safety & Privacy</h1>
                <div className='text-xs mb-6 text-gray-500'><div className='text-xs
                  text-gray-500'>Manage how we use data to personalize your Fox experience,
                    and control how other users interact with you.</div></div>
                <div className='text-xs  text-gray-500'>SAFETY</div>
                <hr className='mb-6' />

                <h2 className=' text-base'>People You’ve Blocked</h2>
                <div className='text-xs  text-gray-500'>Blocked people can’t send you chat requests
                    or private messages.</div>

                <div onFocus={() => { setFocusBlock(true); setIsFocusedB("border-blue-500"); }}
                    onBlur={() => { if (BlockValue.length === 0) setFocusBlock(false); setIsFocusedB("border-gray-400"); }}
                    className={`relative h-12 flex  border p-1 my-4  focus:border  rounded-md  ${isFocusedB}`}>
                    <label htmlFor="BlockIn" className="hidden"></label>
                    <input id="BlockIn"
                        role="BlockIn"
                        value={BlockValue}
                        onChange={handleBlockInputValue}
                        onFocus={() => { setFocusBlock(true); }}
                        onBlur={() => { if (BlockValue.length === 0) setFocusBlock(false); }}
                        className="w-full px-2 py-1 focus:outline-none" type="text" />
                    <label className={`absolute text-gray-400 text-xs left-2 ${FocusBlock ? "top-0" : "top-4"} `}>Block New User</label>
                    <button onClick={handleAddBlock}
                        disabled={EnableAddBlock}
                        className=" disabled:text-gray-400 text-base font-sans text-orange-600 font-bold px-4 py-1 rounded-r-md">
                        Add
                    </button>

                </div>
                {Blocked.map((block, index) => (
                    <div className='w-full flex my-2' key={block.name}>
                        <img src={block.avatar} alt={block.name} className="w-10 h-10" />
                        <p className="pt-3 text-sm">{block.name}</p>
                        <button className="font-bold text-sm  text-gray-500 hover:text-blue-600 pb-1 ml-60">Remove</button>
                    </div>
                ))}

                <h2 className=' text-base'>Communities You've Muted</h2>
                <div className='text-xs  text-gray-500'>Posts from muted communities won't show up in your feeds or recommendations.
                    <div onFocus={() => { setFocusMute(true); setIsFocusedM("border-blue-500"); }}
                        onBlur={() => { if (MuteValue.length === 0) setFocusMute(false); setIsFocusedM("border-gray-400"); }}
                        className={`relative h-12 flex border  p-1 my-4 rounded-md  ${isFocusedM}`}>
                        <label htmlFor="MuteIn" className="hidden"></label>
                        <input id="MuteIn"
                            role="MuteIn"
                            value={MuteValue}
                            onChange={handleMuteInputValue}
                            onFocus={() => { setFocusMute(true); }}
                            onBlur={() => { if (MuteValue.length === 0) setFocusMute(false); }}
                            className="w-full text-black text-sm px-2 py-1 focus:outline-none" type="text" />
                        <label className={`absolute text-gray-400 text-xs left-2 ${FocusMute ?
                            "top-0" : "top-4"} `}>Mute New Community</label>
                        <button onClick={handleAddMute}
                            disabled={EnableAddMute}
                            className="  disabled:text-gray-400 text-base text-orange-600 font-bold px-4 py-1 rounded-r-md">
                            Add
                        </button>

                    </div>
                    {MutedCom.map((mute, index) => (
                        <div className='w-full flex my-2' key={mute.name}>
                            <img src={mute.icon} alt={mute.name} className="w-10 h-10" />
                            <p className="pt-3 text-black text-sm">{mute.name}</p>
                            <button className="font-bold text-gray-500 text-sm hover:text-blue-600 pb-1 ml-60">Remove</button>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    )
}

export default SafetySettings
