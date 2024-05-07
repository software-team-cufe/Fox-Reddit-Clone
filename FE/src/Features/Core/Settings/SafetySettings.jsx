import React, { useState, useEffect } from "react";
import axios from "axios";
import { userAxios } from "@/Utils/UserAxios";
import { toast } from "react-toastify";
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


    useEffect(() => {
        fetchMock();
        fetchBlock();
    }, [])
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

    const fetchMock = async () => {
        try {
            const res = await axios.get('http://localhost:3002/users/1');
            setMutedCom(res.data.Muted);
        } catch (ex) {
            console.error(ex);
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
    }


    const fetchBlock = async () => {
        try {
            const res = await userAxios.get('/api/v1/me/blocked');
            console.log(res.data);
            setBlocked(res.data.blockedsData);
        } catch (ex) {
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
    }


    const idFromName = async (name) => { //check if user is exits and return his/her id
        const response = await axios.get(`http://localhost:3002/users`)
            .catch(err => console.error(err));
        for (const user of response.data) {
            if (user.name === name) {
                return user.id;
            }
        }
        toast.error("user not found");
        return null;
    }

    const idFromNameCom = async (name) => { //for communities
        const response = await axios.get(`http://localhost:3002/communities`)
            .catch(err => console.error(err));
        for (const com of response.data) {
            if (com.name === name) {
                return com.id;
            }
        }
        toast.error("Community is not found");
        return null;
    }

    const handleBlockInputValue = (event) => {
        setBlockValue(event.target.value);

    }
    const handleMuteInputValue = (event) => {
        setMuteValue(event.target.value);

    }

    const handleRemoveBlock = async (nameToRemove) => {
        try {

            const data = {
                username: nameToRemove,
                type: "unblock"
            }
            const res = await userAxios.post('api/block_user', data);
            console.log(res.data);
            const updatedBlocked = Blocked.filter(block => block.username !== nameToRemove);
            setBlocked(updatedBlocked);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemoveMute = async (nameToRemove) => {
        try {
            const updatedMute = MutedCom.filter(mute => mute.name !== nameToRemove);
            const res = await axios.patch(`http://localhost:3002/users/1`, { Muted: updatedMute });
            setMutedCom(updatedMute);
        } catch (ex) {
            console.error(ex);
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
    };
    const handleAddMute = async () => {
        const val = await idFromNameCom(MuteValue);
        if (val != null) {
            for (const com of MutedCom) {
                if (com.name === MuteValue) {
                    toast.success("Community is already muted");
                    return;
                }
            }
            try {
                const res = await axios.get(`http://localhost:3002/communities/${val}`);
                const updatedComMuted = [...MutedCom, { icon: res.data.icon, name: res.data.name }];
                const ress = await axios.patch(`http://localhost:3002/users/1`, { Muted: updatedComMuted });
                setMutedCom(updatedComMuted);
                setMuteValue('');
            } catch (ex) {
                console.error(ex);
                if (ex.response && ex.response.data && ex.response.data.message) {
                    toast.error(ex.response.data.message);
                } else {
                    toast.error("An error occurred while muting the community.");
                }
            }
        }
    }

    const handleAddBlock = async () => {
        try {
            const data = {
                username: BlockValue,
                type: "block"
            }
            const res = await userAxios.post('api/block_user', data);
            fetchBlock();
        } catch (error) {
            const errorMessage = error.response ?
                error.response.data.message : error.message;
            console.log(errorMessage);
            toast.error(errorMessage);
        }
    }

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
                    <label className={`absolute text-gray-400 text-xs left-2 duration-300
                     ${FocusBlock ? "top-0" : "top-4"} `}>Block New User</label>
                    <button onClick={handleAddBlock}
                        disabled={EnableAddBlock}
                        className=" disabled:text-gray-400 text-base font-sans
                         text-orange-600 font-bold px-4 py-1 rounded-r-md">
                        Add
                    </button>

                </div>
                {Blocked && Blocked.map((block, index) => (
                    <div className='w-full flex my-2' key={block.username}>
                        <img src={block.avatar} alt={block.username} className="w-8 h-8  rounded m-1" />
                        <p className="pt-3 text-sm min-w-max">{block.username}</p>
                        <div className="w-full" />
                        <button onClick={() => { handleRemoveBlock(block.username) }}
                            className="font-bold text-sm 
                         text-gray-500 hover:text-blue-600 pb-1  ">Remove</button>
                    </div>
                ))}

                <h2 className=' text-base'>Communities You've Muted</h2>
                <div className='text-xs  text-gray-500'>Posts from muted communities won't
                    show up in your feeds or recommendations.
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
                        <label className={`absolute text-gray-400 text-xs left-2 duration-300 ${FocusMute ?
                            "top-0" : "top-4"} `}>Mute New Community</label>
                        <button onClick={handleAddMute}
                            disabled={EnableAddMute}
                            className="  disabled:text-gray-400 text-base
                             text-orange-600 font-bold px-4 py-1 rounded-r-md">
                            Add
                        </button>

                    </div>
                    {MutedCom.map((mute, index) => (
                        <div className='w-full flex my-2' key={mute.name}>
                            <img src={mute.icon} alt={mute.name} className="w-8 h-8  rounded m-1" />
                            <p className="pt-3 text-black text-sm  min-w-max">{mute.name}</p>
                            <div className="w-full" />
                            <button onClick={() => { handleRemoveMute(mute.name) }}
                                className="font-bold text-gray-500 text-sm
                             hover:text-blue-600 pb-1 ">Remove</button>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    )
}

export default SafetySettings
