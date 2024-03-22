
import { useState, useEffect } from 'react'
import { X, ArrowLeft } from "lucide-react";
import React from 'react'



function SocialLinks({ handleOpenLinkPop }) {
    const [hide, sethide] = useState(false);

    const [OpenCustomLink, setOpenCustomLink] = useState(false);
    const [CustomLinkeLable, setCustomLinkeLable] = useState("");
    const [CustonLinkvalue, setCustonLinkvalue] = useState("");
    const [DisableSaveCL, setDisableSaveCL] = useState(true);
    const [CLWarnMess, setCLWarnMess] = useState(false);

    const [OpenFoxLink, setOpenFoxLink] = useState(false);
    const [FoxLinkWarning, setFoxLinkWarning] = useState(false);
    const [FoxLinkValue, setFoxLinkValue] = useState("");
    const [DisableSaveFL, setDisableSaveFL] = useState(true);

    const [OpenInstaLink, setOpenInstaLink] = useState(false);
    const [InstaLinkValue, setInstaLinkValue] = useState("");
    const [DisableSaveInsta, setDisableSaveInsta] = useState(true);

    //handle Custom link
    useEffect(() => {
        if (CustonLinkvalue.length !== 0 && CustomLinkeLable.length !== 0) {
            setDisableSaveCL(false);
        } else {
            setDisableSaveCL(true);
        }

        console.log(DisableSaveCL);
    }, [CustonLinkvalue, CustomLinkeLable]);
    const handleCustonLinkValue = (e) => {
        if (CustonLinkvalue.length === 0)
            setCustonLinkvalue("https://" + e.target.value)
        else
            setCustonLinkvalue(e.target.value)
    }
    const handleSaveCustomLink = () => {//To do
        if (!(CustonLinkvalue.startsWith("https://") && CustonLinkvalue.includes("."))) {
            setCLWarnMess(true);

        }
        else
            setCLWarnMess(false);
    }

    //handl Fox link
    const handleSaveFoxLink = () => {//to do
        if (FoxLinkValue.startsWith("r/") || FoxLinkValue.startsWith("u/")) {
            setDisableSaveFL(false);
            setFoxLinkWarning(false);
        }
        else {
            setDisableSaveFL(true);
            setFoxLinkWarning(true);
        }
    }
    useEffect(() => {
        if (FoxLinkValue.length === 0) {
            setDisableSaveFL(true);

        }
        else {
            setDisableSaveFL(false);
        }
    }, [FoxLinkValue])

    //handle Instagram link
    const handleSaveInstaLink = () => {//to do

    }
    const handleInstaLValue = (e) => {
        if (InstaLinkValue.length === 0)
            setInstaLinkValue("@" + e.target.value)
        else
            setInstaLinkValue(e.target.value)
    }
    useEffect(() => {
        if (InstaLinkValue.length === 0) {
            setDisableSaveInsta(true);

        }
        else {
            setDisableSaveInsta(false);
        }
    }, [InstaLinkValue])

    return (
        <>
            {!(hide) && (

                <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                    <div className="relative p-4  w-2/3 mx-8  place-content-center justify-center">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                    Add Social Link
                                </h3>
                                <button onClick={handleOpenLinkPop} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <X />
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="flex flex-wrap p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={() => { setOpenCustomLink(true); sethide(true); }} className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/link.png" alt="Link" />
                                    <div className='mx-2 text-xs font-bold'>Custom link </div>
                                </button>
                                <button onClick={() => { setOpenFoxLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./logo.png" alt="Fox" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Fox </div>
                                </button>
                                <button onClick={() => { setOpenInstaLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/instagram.png" alt="instagram" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Instagram </div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/twitter.png" alt="twitter" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Twitter </div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/tiktok.png" alt="tiktok" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Tiktok </div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/twitch.png" alt="twitch" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Twitch </div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/facebook.png" alt="facebook" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Facebook </div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/youtube.png" alt="youtube" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Youtube </div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/tumblr.png" alt="tumblr" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Tumblr </div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/spotify.png" alt="spotify" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Spotify </div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/soundcloud.png" alt="soundcloud" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>SoundCloud </div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/beacons.png" alt="beacons" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Beacons</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/linktree.png" alt="linktree" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Linktree</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/discord.png" alt="discord" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Discord</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/venmo.png" alt="venmo" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Venmo</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/cash_app.png" alt="cash_app" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Cash app</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/patreon.png" alt="Patreon" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Patreon</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/kofi.png" alt="kofi" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Kofi</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/paypal.png" alt="paypal" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Paypal</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/cameo.png" alt="cameo" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Cameo</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/onlyfans.png" alt="onlyfans" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>OnlyFans</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/substack.png" alt="substack" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Substack</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/kickstarter.png" alt="kickstarter" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Kickstarter</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src=".\icons\buy_me_a_coffee.png" alt="buy-me-a-coffee" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Buy Me a Coffee</div>
                                </button>
                                <button className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/shopify.png" alt="shopify" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Shopify</div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            {OpenCustomLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenCustomLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveCL}
                                onClick={handleSaveCustomLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="./icons/link.png" alt="Link" />
                            <div className='mx-2 text-xs font-bold'>Custom link </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setCustomLinkeLable(event.target.value) }} placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleCustonLinkValue} value={CustonLinkvalue} placeholder='https://website.com' />
                            {CLWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenFoxLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenFoxLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveFL}
                                onClick={handleSaveFoxLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./logo.png" alt="Fox" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Fox </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={() => setFoxLinkValue(event.target.value)} value={FoxLinkValue} placeholder='r/community Or u/user' />
                            {FoxLinkWarning &&
                                <div className="text-xs text-red-500"><span>This community or user doesn’t exist. Double-check your spelling.</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenInstaLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenInstaLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveInsta}
                                onClick={handleSaveInstaLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/instagram.png" alt="instagram" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Instagram </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleInstaLValue} value={InstaLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
        </>
    )
}
//Twitter
export default SocialLinks