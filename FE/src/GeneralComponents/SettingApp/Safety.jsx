import { useState } from "react";

function Safety() {
    const [FocusBlock, setFocusBlock] = useState(false);
    const [BlockValue, setBlockValue] = useState("");
    const [FocusMute, setFocusMute] = useState(false);
    const [MuteValue, setMuteValue] = useState("");

    //To do add of both fields
    //to do disable of add buttons in both fields

    const handleBlockInputValue = (event) => {
        setBlockValue(event.target.value);
        console.log({ BlockValue })
    }
    const handleMuteInputValue = (event) => {
        setMuteValue(event.target.value);
        console.log({ MuteValue })
    }
    return (
        <div>
            <h1 className='my-4 text-xl'>Safety & Privacy</h1>
            <div className='text-xs mb-6 text-gray-500'><div className='text-xs  text-gray-500'>Manage how we use data to personalize your Fox experience, and control how other users interact with you.</div></div>
            <div className='text-xs  text-gray-500'>SAFETY</div>
            <hr className='mb-6' />

            <h2 className=' text-base'>People You’ve Blocked</h2>
            <div className='text-xs  text-gray-500'>Blocked people can’t send you chat requests or private messages.</div>

            <div onFocus={() => { setFocusBlock(true); }}
                onBlur={() => { if (BlockValue.length === 0) setFocusBlock(false); }}
                className="relative h-12 flex border my-4 border-gray-400 rounded-md">
                <input value={BlockValue}
                    onChange={handleBlockInputValue}
                    onFocus={() => { setFocusBlock(true); }}
                    onBlur={() => { if (BlockValue.length === 0) setFocusBlock(false); }}
                    className="w-full px-2 py-1 focus:outline-none" type="text" />
                <label className={`absolute text-gray-400 text-xs left-2 ${FocusBlock ? "top-0" : "top-4"} `}>Block New User</label>
                <button className=" text-base font-sans text-orange-600 font-bold px-4 py-1 rounded-r-md">
                    Add
                </button>

            </div>

            <h2 className=' text-base'>Communities You've Muted</h2>
            <div className='text-xs  text-gray-500'>Posts from muted communities won't show up in your feeds or recommendations.
                <div onFocus={() => { setFocusMute(true); }}
                    onBlur={() => { if (MuteValue.length === 0) setFocusMute(false); }}
                    className="relative h-12 flex border my-4 border-gray-400 rounded-md">
                    <input value={MuteValue}
                        onChange={handleMuteInputValue}
                        onFocus={() => { setFocusMute(true); }}
                        onBlur={() => { if (MuteValue.length === 0) setFocusMute(false); }}
                        className="w-full text-black text-sm px-2 py-1 focus:outline-none" type="text" />
                    <label className={`absolute text-gray-400 text-xs left-2 ${FocusMute ? "top-0" : "top-4"} `}>Mute New Community</label>
                    <button className=" text-base text-orange-600 font-bold px-4 py-1 rounded-r-md">
                        Add
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Safety
