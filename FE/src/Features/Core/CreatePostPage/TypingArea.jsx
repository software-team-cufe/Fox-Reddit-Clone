
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react'
import { Tabs, Tab } from '../../../GeneralElements/Tabs/Tab'
import { NotepadText, ImageUp, BarChart2, Link2, Trash2, BadgeInfo, X } from 'lucide-react'
<<<<<<< HEAD
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
=======


>>>>>>> origin/newnew-nadine
import './QuillStyle.css'
import CheckButton from "../../../GeneralElements/CheckButton/CheckButton";
import Poll from "./Poll"

function TypingArea(props) {
    const navigator = useNavigate();
    const [DisablePoll, setDisablePoll] = useState(false); //ToDo: set by community
    // const [PostContent, props.SetPostText] = useState('');
    // const [PostTitle, setPostTitle] = useState("");
    const [FocusTitle, setFocusTitle] = useState(false);
    // const [props.VideoOrImageSrc, props.SetVideoOrImageSrc] = useState("");
    const [OpenImageTab, setOpenImageTab] = useState(false);
    const [ShowRemovePop, setShowRemovePop] = useState(false);
    const [ShowCancelPost, setShowCancelPost] = useState(false);
    const [VideoFile, setVideoFile] = useState(false);    //boolean to mark the file type
    const [DisablePost, setDisablePost] = useState(true);

    const [ToolBar, setToolBar] = useState([['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'video'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'direction': 'rtl' }],                         // text direction


    [{ 'size': [false, 'large'] }],  // custom dropdown
    [{ 'color': [] }, { 'background': [] }],])       // dropdown with defaults from theme })

    useEffect(() => {
        if (props.PostTitle.length === 0)
            setDisablePost(true);
        else if (props.SelectedCom.name === "Choose Community")
            setDisablePost(true);
        else
            setDisablePost(false);

    }, [props.PostTitle, props.SelectedCom])


    useEffect(() => {
        if (props.SelectedCom.name === "Choose Community")
            setDisablePoll(true);
        else
            setDisablePoll(false);


    }, [props.SelectedCom])


    useEffect(() => {

        if (OpenImageTab) {
            const imageInput = document.getElementById("DropBannerImage");
            if (!(imageInput === null)) {
                imageInput.addEventListener('dragover', () => { event.preventDefault(); });
                imageInput.addEventListener('drop', () => {
                    event.preventDefault();
                    handleBannerUpload(event, "Drop");
                });
            }
        }


    }, [OpenImageTab, props.VideoOrImageSrc]);

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
            // Check the file type
            if (file.type.startsWith('image/')) {
                setVideoFile(false);
            } else if (file.type.startsWith('video/')) {
                setVideoFile(true);
            }
        }
        reader.onload = () => {
            props.SetVideoOrImageSrc(reader.result);
        };

    }

    const handleMaxchar = (event) => {
        if (props.PostTitle.length >= 300 && !(event.key === 'Backspace')) {
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
        props.SetVideoOrImageSrc(null);
        setShowRemovePop(false);
        //ToDo: Add Api

    }


    return (
        <div className='bg-white h-fit rounded  w-full'>

            <Tabs>
                <Tab label="Post" num={0} addOnClick={NoDrag} icon={<NotepadText strokeWidth={1} color=" #e94c00" size={24} />}>

                    <div className='p-4 relative'>
                        <div className={`flex border rounded  p-1 h-fit my-2 ${FocusTitle ?
                            'border-gray-800' : 'border-gray-300'}`}>
                            <input type="text" onChange={() => { props.SetPostTitle(event.target.value) }}
                                placeholder='Title' className=' focus:outline-none border-none text-sm rounded
                                  border w-full h-10 focus:border-none'
                                onKeyDown={handleMaxchar}
                                onFocus={() => { event.preventDefault(); setFocusTitle(true); }}
                                onBlur={() => { event.preventDefault(); setFocusTitle(false); }}
                                value={props.PostTitle}
                            ></input>
                            <p className="text-xs py-2  text-gray-500">{props.PostTitle.length}/300</p>
                        </div>
                        <ReactQuill
                            value={props.PostText}
                            onChange={props.SetPostText}
                            placeholder="Text (optional)"
                            modules={{
                                toolbar: {
                                    container: ToolBar
                                },
                            }}
                        />

                    </div>
                </Tab>
                <Tab label="Image & Video" num={1} addOnClick={Drag}
                    icon={<ImageUp strokeWidth={1} color=" #e94c00" size={24} />}>

                    <div className='p-4 relative w-full'>
                        <div className={`flex border rounded w-full p-1 h-fit my-2 ${FocusTitle ? 'border-gray-800'
                            : 'border-gray-300'}`}>
                            <input type="text" onChange={() => { props.SetPostTitle(event.target.value) }}
                                placeholder='Title' className=' focus:outline-none border-none text-sm rounded
                                  border w-full h-10 focus:border-none'
                                onKeyDown={handleMaxchar}
                                onFocus={() => { event.preventDefault(); setFocusTitle(true); }}
                                onBlur={() => { event.preventDefault(); setFocusTitle(false); }}
                                value={props.PostTitle}
                            ></input>
                            <p className="text-xs py-2  text-gray-500">{props.PostTitle.length}/300</p>
                        </div>

                        <div className="w-full h-fit ">

                            {props.VideoOrImageSrc && (
                                <div className="w-full h-[425px] bg-white border rounded relative ">
                                    <div className=" w-full h-96 grid overflow-hidden  place-content-center relative">
                                        {VideoFile &&
                                            <video width={1280} height={720} controls>
                                                <source src={props.VideoOrImageSrc} />
                                                Your browser does not support the video tag.
                                            </video>}
                                        {!VideoFile && <>
                                            <img className='object-cover object-center  w-full blur-lg '
                                                src={props.VideoOrImageSrc}
                                                alt="Selected" />
                                            <img className='object-cover object-top h-96 absolute
                                             overflow-auto top-1/2 left-1/2
                                     transform -translate-x-1/2 -translate-y-1/2  ' src={props.VideoOrImageSrc} alt="Selected" />
                                        </>}

                                    </div>
                                    <Trash2 strokeWidth={1} size={30} color='#e94c00' className='absolute p-1
                                     bg-white border
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
                                                        className="bg-white text-black border rounded-full 
                                                         p-1 px-2 m-1 border-orange-600 
                                                         hover:bg-orange-800 hover:text-white"
                                                    >
                                                        keep
                                                    </button>
                                                    <button
                                                        onClick={handleRemoveImage}
                                                        type="submit"
                                                        className="bg-orange-600 text-white rounded-full
                                                         m-1 p-1 px-2 hover:bg-orange-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            )}

                            {!props.VideoOrImageSrc && (<>
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
                                     sm:my-8 sm:px-40 sm:py-20  '> Drag and drop or Upload an image or a video  </p>
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
                            <input type="text" onChange={() => { props.SetPostTitle(event.target.value) }}
                                placeholder='Title' className=' focus:outline-none border-none text-sm rounded
                                  border w-full h-10 focus:border-none'
                                onKeyDown={handleMaxchar}
                                onFocus={() => { event.preventDefault(); setFocusTitle(true); }}
                                onBlur={() => { event.preventDefault(); setFocusTitle(false); }}
                                value={props.PostTitle}
                            ></input>
                            <p className="text-xs py-2  text-gray-500">{props.PostTitle.length}/300</p>
                        </div>
                        <input value={props.PostURL} onChange={() => { props.SetPostURL(event.target.value) }}
                            type="text" className="border rounded w-full h-12 border-gray-300 p-2
                         focus:outline-none focus:border-gray-800" placeholder="Url" />
                    </div>
                </Tab>
                <Tab label="Poll" enable={DisablePoll} num={3} addOnClick={NoDrag} icon={<BarChart2 strokeWidth={1}
                    color=" #e94c00" size={24} />}>
                    <div className='p-4 relative'>
                        <div className={`flex border rounded  p-1 h-fit my-2 ${FocusTitle ? 'border-gray-800' :
                            'border-gray-300'}`}>
                            <input type="text" onChange={() => { props.SetPostTitle(event.target.value) }}
                                placeholder='Title' className=' focus:outline-none border-none text-sm rounded
                                  border w-full h-10 focus:border-none'
                                onKeyDown={handleMaxchar}
                                onFocus={() => { event.preventDefault(); setFocusTitle(true); }}
                                onBlur={() => { event.preventDefault(); setFocusTitle(false); }}
                                value={props.PostTitle}
                            ></input>
                            <p className="text-xs py-2  text-gray-500">{props.PostTitle.length}/300</p>
                        </div>
                        <ReactQuill
                            value={props.PostText}
                            onChange={props.SetPostText}
                            placeholder="Text (optional)"
                            modules={{
                                toolbar: {
                                    container: ToolBar
                                },
                            }}
                        />
                        <div className="border flex p-2">
                            <div className="w-4/6">
                                <Poll Poll2={props.Poll2} SetPoll2={props.SetPoll2}
                                    Poll1={props.Poll1} SetPoll1={props.SetPoll1}
                                    className="w-5/6" PollValues={props.Poll3} DisablePoll={DisablePoll}
                                    SetPollValues={props.SetPoll3} VoteLength={props.VoteLength}
                                    SetVoteLength={props.SetVoteLength} />

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
            <CheckButton IsChecked={props.Spoiler}
                SetIsChecked={props.SetSpoiler} label="Spoiler" />
            <CheckButton IsChecked={props.NFSW}
                SetIsChecked={props.SetNFSW} label="NSFW" />
            <hr className="w-[100%-2] my-4 grid mx-5" />
            <div className="w-full relative h-6 ">
                <button onClick={props.PostFunc}
                    disabled={DisablePost}
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
                <input checked={!!props.PostNotifications}
                    onChange={(event) => { props.SetPostNotifications(event.target.checked) }}
                    type="checkbox" className='mx-4' />Send me post reply notifications
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