
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Tabs, Tab } from '../../../GeneralElements/Tabs/Tab'
import { NotepadText, ImageUp, BarChart2, Link2, Trash2, BadgeInfo, X } from 'lucide-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './QuillStyle.css'
import CheckButton from "../../../GeneralElements/CheckButton/CheckButton";
import Poll from "./Poll"

function TypingArea(props) {
    const navigator = useNavigate();
    const [DisablePoll, setDisablePoll] = useState(false); //ToDo: set by community
    const [PostContent, setPostContent] = useState('');
    const [PostTitle, setPostTitle] = useState("");
    const [FocusTitle, setFocusTitle] = useState(false);
    const [SelectedBannar, setSelectedBannar] = useState("");
    const [OpenImageTab, setOpenImageTab] = useState(false);
    const [ShowRemovePop, setShowRemovePop] = useState(false);
    const [PollValusesAfterTwo, setPollValusesAfterTwo] = useState([]);
    const [PollValueOne, setPollValueOne] = useState("");
    const [PollValueTwo, setPollValueTwo] = useState("");
    const [VoteLength, setVoteLength] = useState(0);
    const [ShowCancelPost, setShowCancelPost] = useState(false);

    const [ToolBar, setToolBar] = useState([['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'video'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'direction': 'rtl' }],                         // text direction


    [{ 'size': [false, 'large'] }],  // custom dropdown
    [{ 'color': [] }, { 'background': [] }],])       // dropdown with defaults from theme })


    ////////////////////////////////////////////////////////////
    //ToDo: Try making loading line
    // const [isLoading, setIsLoading] = useState(true);
    //  const [loadingProgress, setLoadingProgress] = useState(0);
    //take care this hook disables drag and drop for some reason
    // useEffect(() => {
    //     const image = new Image();
    //     image.src = { SelectedBannar };

    //     image.addEventListener('load', (event) => {
    //         console.log("load");
    //         const { loaded, total } = event;
    //         const progress = (loaded / total) * 100;
    //         setLoadingProgress(50);
    //     });
    // }, []);
    //in return:
    //      {/* {isLoading && ( */}
    //      <div className="w-full absolute bottom-0 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    //      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${loadingProgress}%` }}></div>
    //  </div>
    //  {/* )} */}
    //////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (props.SelectedCom.name === "Choose Community")
            setDisablePoll(true);
        else
            setDisablePoll(false);


    }, [props.SelectedCom])


    useEffect(() => {
        if (OpenImageTab) {
            // This function handles the drag over event
            const handleDragOver = (event) => {
                event.preventDefault();
            };
            // This function handles the drop event of Banner image
            const handleBannerDrop = (event) => {
                event.preventDefault();
                handleBannerUpload(event, "Drop");
            };

            // Add these event listeners to the drop zone
            const imageInput = document.getElementById("DropBannerImage");
            if (!(imageInput === null)) {
                imageInput.addEventListener('dragover', handleDragOver);
                imageInput.addEventListener('drop', handleBannerDrop);
            }
        }

    }, [OpenImageTab]);
    const handleBannerUpload = (event, UpOrDrop = "up") => {
        const reader = new FileReader();
        let file;
        if (!(UpOrDrop === "Drop")) {
            file = event.target.files[0];
        }
        else {
            file = event.dataTransfer.files[0];
        }

        if (file) {
            reader.readAsDataURL(file);
        }

        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                setSelectedBannar(reader.result);
                // const timeoutId = setTimeout(() => {
                //     // Code to be executed after the delay
                // }, 10000);

            };

        };

    };

    const handleMaxchar = (event) => {
        if (PostTitle.length >= 300 && !(event.key === 'Backspace')) {
            event.preventDefault()
        }
    }
    const Drag = () => {
        setOpenImageTab(true);
    }
    const NoDrag = () => {
        setOpenImageTab(false);
    }

    const handleRemoveImage = () => {
        setSelectedBannar(null);
        setShowRemovePop(false);
        //ToDo: Add Api

    }

    const handleAddOption = () => {
        if (!ShowOption3) {
            setShowOption3(true);
            return;
        }
        if (!ShowOption4) {
            setShowOption4(true);
            return;
        }
        if (!ShowOption5) {
            setShowOption5(true);
            return;
        }
        if (!ShowOption6) {
            setShowOption6(true);
            return;
        }
    }




    return (
        <div className='bg-white h-fit rounded  w-full'>

            <Tabs>
                <Tab label="Post" num={0} addOnClick={NoDrag} icon={<NotepadText strokeWidth={1} color=" #e94c00" size={24} />}>

                    <div className='p-4 relative'>
                        <div className={`flex border rounded  p-1 h-fit my-2 ${FocusTitle ? 'border-gray-800' : 'border-gray-300'}`}>
                            <input type="text" onChange={() => { setPostTitle(event.target.value) }}
                                placeholder='Title' className=' focus:outline-none border-none text-sm rounded
                                  border w-full h-10 focus:border-none'
                                onKeyDown={handleMaxchar}
                                onFocus={() => { event.preventDefault(); setFocusTitle(true); }}
                                onBlur={() => { event.preventDefault(); setFocusTitle(false); }}
                                value={PostTitle}
                            ></input>
                            <p className="text-xs py-2  text-gray-500">{PostTitle.length}/300</p>
                        </div>
                        <ReactQuill
                            value={PostContent}
                            onChange={setPostContent}
                            placeholder="Text (optional)"
                            modules={{
                                toolbar: {
                                    container: ToolBar
                                },
                            }}
                        />

                    </div>
                </Tab>
                <Tab label="Image & Video" num={1} addOnClick={Drag} icon={<ImageUp strokeWidth={1} color=" #e94c00" size={24} />}>

                    <div className='p-4 relative w-full'>
                        <div className={`flex border rounded w-full p-1 h-fit my-2 ${FocusTitle ? 'border-gray-800' : 'border-gray-300'}`}>
                            <input type="text" onChange={() => { setPostTitle(event.target.value) }}
                                placeholder='Title' className=' focus:outline-none border-none text-sm rounded
                                  border w-full h-10 focus:border-none'
                                onKeyDown={handleMaxchar}
                                onFocus={() => { event.preventDefault(); setFocusTitle(true); }}
                                onBlur={() => { event.preventDefault(); setFocusTitle(false); }}
                                value={PostTitle}
                            ></input>
                            <p className="text-xs py-2  text-gray-500">{PostTitle.length}/300</p>
                        </div>

                        <div className="w-full h-fit ">

                            {SelectedBannar && (
                                <div className="w-full h-[425px] bg-white border rounded relative ">
                                    <div className=" w-full h-96 grid overflow-hidden  place-content-center relative">
                                        <img className='object-cover object-center  w-full blur-lg ' src={SelectedBannar} alt="Selected" />
                                        <img className='object-cover object-top h-96 absolute overflow-auto top-1/2 left-1/2
                                     transform -translate-x-1/2 -translate-y-1/2  ' src={SelectedBannar} alt="Selected" />

                                    </div>
                                    <Trash2 strokeWidth={1} size={30} color='#e94c00' className='absolute p-1 bg-white border
                                     rounded-full bottom-1 right-1 hover:bg-gray-300'
                                        onClick={() => { ShowRemovePop ? setShowRemovePop(false) : setShowRemovePop(true); }}
                                    />

                                    <div className="relative flex ">

                                        {ShowRemovePop && <div className=" shadow-slate-300 shadow border rounded  
                                           absolute  bg-white right-0 bottom-10 border-orange-600 z-50 w-max h-48">
                                            <div className=" relative ">
                                                <p className="p-4">Remove image?</p>
                                                <hr className="w-80 grid mx-5" />
                                                <p className="p-4">Are you sure you want to remove your image?</p>
                                                <hr className="w-80 grid mx-5" />
                                                <div className="flex p-4 right-0 absolute ">
                                                    <button
                                                        onClick={() => { setShowRemovePop(false); }}
                                                        type="submit"
                                                        className="bg-white text-black border rounded-full  p-1 px-2 m-1 border-orange-600 
                                                         hover:bg-orange-800 hover:text-white"
                                                    >
                                                        keep
                                                    </button>
                                                    <button
                                                        onClick={handleRemoveImage}
                                                        type="submit"
                                                        className="bg-orange-600 text-white rounded-full m-1 p-1 px-2 hover:bg-orange-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            )}

                            {!SelectedBannar && (<>
                                <div id="DropBannerImage" className='relative text-center border-dashed hover:cursor-pointer
                    	         border border-[#e94c00] h-full  w-full bg-white  rounded'
                                    onClick={() => document.getElementById("Banner-load").click()}>
                                    <input
                                        className='hidden'
                                        id="Banner-load"
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={handleBannerUpload}
                                    />
                                    <div className='items-center text-center h-full w-full justify-items-center' >
                                        <p className='text-lg font-sans  text-center  w-full py-10 px-10 sm:w-max
                                     sm:my-8 sm:px-40 sm:py-20  '> Drag and drop or Upload Banner  image  </p>
                                    </div>
                                </div>
                            </>
                            )}
                        </div>
                    </div>
                </Tab>
                <Tab label="Link" num={2} addOnClick={NoDrag} icon={<Link2 strokeWidth={1} color=" #e94c00" size={24} />}>
                    <div className='p-4 relative'>
                        <div className={`flex border rounded  p-1 h-fit my-2 ${FocusTitle ?
                            'border-gray-800' : 'border-gray-300'}`}>
                            <input type="text" onChange={() => { setPostTitle(event.target.value) }}
                                placeholder='Title' className=' focus:outline-none border-none text-sm rounded
                                  border w-full h-10 focus:border-none'
                                onKeyDown={handleMaxchar}
                                onFocus={() => { event.preventDefault(); setFocusTitle(true); }}
                                onBlur={() => { event.preventDefault(); setFocusTitle(false); }}
                                value={PostTitle}
                            ></input>
                            <p className="text-xs py-2  text-gray-500">{PostTitle.length}/300</p>
                        </div>
                        <input type="text" className="border rounded w-full h-12 border-gray-300 p-2
                         focus:outline-none focus:border-gray-800" placeholder="Url" />
                    </div>
                </Tab>
                <Tab label="Poll" enable={DisablePoll} num={3} addOnClick={NoDrag} icon={<BarChart2 strokeWidth={1} color=" #e94c00" size={24} />}>
                    <div className='p-4 relative'>
                        <div className={`flex border rounded  p-1 h-fit my-2 ${FocusTitle ? 'border-gray-800' : 'border-gray-300'}`}>
                            <input type="text" onChange={() => { setPostTitle(event.target.value) }}
                                placeholder='Title' className=' focus:outline-none border-none text-sm rounded
                                  border w-full h-10 focus:border-none'
                                onKeyDown={handleMaxchar}
                                onFocus={() => { event.preventDefault(); setFocusTitle(true); }}
                                onBlur={() => { event.preventDefault(); setFocusTitle(false); }}
                                value={PostTitle}
                            ></input>
                            <p className="text-xs py-2  text-gray-500">{PostTitle.length}/300</p>
                        </div>
                        <ReactQuill
                            value={PostContent}
                            onChange={setPostContent}
                            placeholder="Text (optional)"
                            modules={{
                                toolbar: {
                                    container: ToolBar
                                },
                            }}
                        />
                        <div className="border flex p-2">
                            <div className="w-4/6">
                                <Poll className="w-5/6" PollValues={PollValusesAfterTwo} DisablePoll={DisablePoll}
                                    FirstPoll={setPollValueOne} SecPoll={setPollValueTwo}
                                    SetPollValues={setPollValusesAfterTwo} VoteLength={VoteLength}
                                    setVoteLength={setVoteLength} />

                            </div>
                            <div  >
                                <div className="flex px-3">
                                    <BadgeInfo strokeWidth={1} size={24} color='#e94c00' />
                                    <p className="text-sm"> Tips on Better Polls</p>
                                </div>
                                <div className="flex flex-col space-y-1 px-4">
                                    <p className="text-sm">1. Suggest short clear options</p>
                                    <p className="text-sm">2. The more options, the better</p>
                                    <p className="text-sm">3. Choose the poll duration</p>
                                    <p className="text-sm">4. Options can't be edited after post creation </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab>

            </Tabs>
            <CheckButton label="Spoiler" />
            <CheckButton label="NSFW" />
            <hr className="w-[100%-2] my-4 grid mx-5" />
            <div className="w-full relative h-6 ">
                <button
                    disabled={DisablePoll}
                    type="submit"
                    className="bg-orange-600 text-white rounded-full px-4 py-2 
                    absolute right-4  hover:bg-orange-800 disabled:bg-gray-400"
                >
                    Post
                </button>
                <button
                    onClick={() => { setShowCancelPost(true); }}
                    type="submit"
                    className="border-orange-600 text-orange-600 rounded-full px-4 py-2
                     absolute right-24 border font-bold  hover:bg-orange-100"
                >
                    Cancel
                </button>
                <div className="relative">
                    {ShowCancelPost && <div className=" shadow-slate-300 shadow border rounded  
                                           absolute  bg-white right-0 bottom-10 border-orange-600 z-50 w-max h-48">
                        <div className=" relative ">
                            <div className="flex gap-60">
                                <p className="p-4">Discard Post</p>
                                <X strokeWidth={1} size={24}
                                    onClick={() => { setShowCancelPost(false); }}
                                    className="rounded hover:bg-gray-100 mt-4" />
                            </div>
                            <hr className="w-96 grid mx-5" />
                            <p className="p-4">Returning to the previous page will discard your post</p>
                            <hr className="w-96 grid mx-5" />
                            <div className="flex p-4 right-0 absolute ">
                                <button
                                    onClick={() => { navigator("../") }}
                                    type="submit"
                                    className="bg-white text-black border rounded-full  p-1 px-2 m-1 border-orange-600 
                                                         hover:bg-orange-800 hover:text-white"
                                >
                                    Discard post
                                </button>
                                <button
                                    onClick={() => { setShowCancelPost(false); }}
                                    type="submit"
                                    className="bg-orange-600 text-white rounded-full m-1 p-1 px-2 hover:bg-orange-800"
                                >
                                    Edit post
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="bg-gray-100 h-32 mt-12 p-6">
                <input type="checkbox" className='mx-4' />Send me post reply notifications
                <div>
                    <p className="hover:underline text-blue-700 px-4">
                        <Link to="/setting/account#connectAccount">Connect accounts to share your post</Link>
                    </p>
                </div>
                <div id="DropBannerImage" className="hidden" />
            </div>

        </div>
    )
}

export default TypingArea