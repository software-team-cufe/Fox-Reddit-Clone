import { useState, useEffect } from "react";
import Navofsetting from "./navofsetting";
function Safety() {
    const [FocusBlock, setFocusBlock] = useState(false);
    const [BlockValue, setBlockValue] = useState("");
    const [FocusMute, setFocusMute] = useState(false);
    const [MuteValue, setMuteValue] = useState("");
    const [EnableAddBlock, setEnableAddBlock] = useState(true);
    const [EnableAddMute, setEnableAddMute] = useState(true);
    const [isFocusedB, setIsFocusedB] = useState(false);
    const [isFocusedM, setIsFocusedM] = useState(false);
    //To do add of both fields

    const handleAddBlock = () => {//To do
    }
    const handleAddMute = () => {//To do
    }

    const handleFocusBlock = () => {
        setIsFocusedB(true);
        console.log({ isFocusedB });
    }
    const handleBlurBlock = () => { setIsFocusedB(false); }
    const handleFocusMute = () => { setIsFocusedM(true); }
    const handleBlurMute = () => { setIsFocusedM(false); }

    useEffect(() => {
        if (BlockValue.startsWith("u/") || BlockValue.startsWith("r/"))
            setEnableAddBlock(false);
        else setEnableAddBlock(true);
    }, [BlockValue])
    useEffect(() => {
        if (MuteValue.startsWith("u/") || MuteValue.startsWith("r/"))
            setEnableAddMute(false);
        else setEnableAddMute(true);
    }, [MuteValue])

    const handleBlockInputValue = (event) => {
        setBlockValue(event.target.value);
        console.log({ BlockValue })
    }
    const handleMuteInputValue = (event) => {
        setMuteValue(event.target.value);
        console.log({ MuteValue })
    }
    return (
        <div className="flex">
            <div
                className="bg-white w-40 LeSS:w-0 min-w-0 max-w-40 mx-2" />

            <div>
                <Navofsetting />
                <div className="w-[70%]">
                    <h1 className='my-4 text-xl'>Safety & Privacy</h1>
                    <div className='text-xs mb-6 text-gray-500'><div className='text-xs  text-gray-500'>Manage how we use data to personalize your Fox experience, and control how other users interact with you.</div></div>
                    <div className='text-xs  text-gray-500'>SAFETY</div>
                    <hr className='mb-6' />

                    <h2 className=' text-base'>People You’ve Blocked</h2>
                    <div className='text-xs  text-gray-500'>Blocked people can’t send you chat requests or private messages.</div>

                    <div onFocus={() => { setFocusBlock(true); handleFocusBlock(); }}
                        onBlur={() => { if (BlockValue.length === 0) setFocusBlock(false); handleBlurBlock(); }}
                        className={`relative h-12 flex  border p-1 my-4  focus:border border-gray-400 rounded-md  ${isFocusedB ? 'border-blue-500' : 'border-gray-400'}`}>
                        <input value={BlockValue}
                            onChange={handleBlockInputValue}
                            onFocus={() => { setFocusBlock(true); handleFocusBlock(); }}
                            onBlur={() => { if (BlockValue.length === 0) setFocusBlock(false); }}
                            className="w-full px-2 py-1 focus:outline-none" type="text" />
                        <label className={`absolute text-gray-400 text-xs left-2 ${FocusBlock ? "top-0" : "top-4"} `}>Block New User</label>
                        <button onClick={handleAddBlock}
                            disabled={EnableAddBlock}
                            className=" disabled:text-gray-400 text-base font-sans text-orange-600 font-bold px-4 py-1 rounded-r-md">
                            Add
                        </button>

                    </div>

                    <h2 className=' text-base'>Communities You've Muted</h2>
                    <div className='text-xs  text-gray-500'>Posts from muted communities won't show up in your feeds or recommendations.
                        <div onFocus={() => { setFocusMute(true); handleFocusMute(); }}
                            onBlur={() => { if (MuteValue.length === 0) setFocusMute(false); handleBlurMute(); }}
                            className={`relative h-12 flex border  p-1 my-4 border-gray-400 rounded-md  ${isFocusedM ? 'border-blue-500' : 'border-gray-400'}`}>
                            <input value={MuteValue}
                                onChange={handleMuteInputValue}
                                onFocus={() => { setFocusMute(true); }}
                                onBlur={() => { if (MuteValue.length === 0) setFocusMute(false); }}
                                className="w-full text-black text-sm px-2 py-1 focus:outline-none" type="text" />
                            <label className={`absolute text-gray-400 text-xs left-2 ${FocusMute ? "top-0" : "top-4"} `}>Mute New Community</label>
                            <button onClick={handleAddMute}
                                disabled={EnableAddMute}
                                className="  disabled:text-gray-400 text-base text-orange-600 font-bold px-4 py-1 rounded-r-md">
                                Add
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Safety
