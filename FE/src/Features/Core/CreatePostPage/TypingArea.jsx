
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Tabs, Tab } from '../../../GeneralElements/Tabs/Tab'
import { NotepadText, ImageUp, BarChart2, Link2 } from 'lucide-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './QuillStyle.css'
import CheckButton from "../../../GeneralElements/CheckButton/CheckButton";
import { toast } from 'react-toastify';

function TypingArea() {

    const [content, setContent] = useState('');
    const [editorHtml, setEditorHtml] = useState('');
    const [PostTitle, setPostTitle] = useState("");
    const [FocusTitle, setFocusTitle] = useState(false);
    const navigator = useNavigate();
    const [SelectedBannar, setSelectedBannar] = useState([]);

    const [ToolBar, setToolBar] = useState([['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'video', 'image'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'direction': 'rtl' }],                         // text direction


    [{ 'size': [false, 'large'] }],  // custom dropdown
    [{ 'color': [] }, { 'background': [] }],])       // dropdown with defaults from theme })

    const handleMaxchar = (event) => {
        if (PostTitle.length >= 300 && !(event.key === 'Backspace')) {
            event.preventDefault()
        }
    }

    useEffect(() => {
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
        // document.getElementById("DropBannerImage").addEventListener('dragover', handleDragOver, false);
        // document.getElementById("DropBannerImage").addEventListener('drop', handleBannerDrop, false);


    }, []);
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
                setSelectedBannar([...SelectedBannar, reader.result]);
                // SaveChagesToast();
            };
            // img.onerror = () => {
            //     // Handle error when image is corrupted
            //     toast.error("The image you chose is corrupted. \u{1F614}", {
            //         position: toast.POSITION.BOTTOM_CENTER
            //     });
            // };
        };
        // reader.onerror = () => {
        //     // Handle error when file cannot be read
        //     toast.error("File cannot be read \u{1F615}", {
        //         position: toast.POSITION.BOTTOM_CENTER
        //     });
    };


    // const SaveChagesToast = () => {
    //     toast.success("Changes saved\u{1F60A}", {
    //         position: toast.POSITION.BOTTOM_CENTER
    //     })
    // }

    return (
        <div className='bg-white h-96 '>
            <Tabs>
                <Tab label="Post" icon={<NotepadText />}>
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
                            value={editorHtml}
                            onChange={setEditorHtml}
                            placeholder="Text (optional)"
                            modules={{
                                toolbar: {
                                    container: ToolBar
                                },
                            }}
                        />
                        <CheckButton label="Spoiler" />
                        <CheckButton label="NSFW" />
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-600 text-white rounded-full px-4 py-2 absolute right-6 hover:bg-orange-800"
                    >
                        Post
                    </button>
                    <div className="bg-gray-100 h-24 mt-12 p-6">
                        <input type="checkbox" className='mx-4' />Send me post reply notifications
                        <div>
                            <p className="hover:underline text-blue-700 px-4">
                                <Link to="/setting/account#connectAccount">Connect accounts to share your post</Link>
                            </p>
                        </div>
                    </div>


                </Tab>
                <Tab label="Image & Video" icon={<ImageUp />}>
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

                        <div className="w-full h-60">

                            {!(SelectedBannar.length === 0) && SelectedBannar.map((Selected) => {
                                return (
                                    <div className="  hover:cursor-pointer
                    	         border border-gray-300 h-full  w-full bg-white  rounded">
                                        <div className="h-6">
                                            <img
                                                className="object-center  h-[100px]"
                                                src={Selected}
                                                alt="Selected"
                                            />
                                        </div>
                                    </div>
                                )
                            })}

                            {SelectedBannar.length === 0 && (<>
                                <div id="DropBannerImage" className='relative text-center border-dashed hover:cursor-pointer
                    	         border border-[#e94c00] h-full  w-full bg-white  rounded'
                                    onClick={() => document.getElementById("Banner-load").click()}>
                                    <input
                                        className='hidden'
                                        id="Banner-load"
                                        type="file"
                                        accept=".png, .jpg, .jpeg, .mp4"
                                        onChange={handleBannerUpload}
                                    />
                                    <div className='items-center text-center h-full w-full justify-items-center' >
                                        <p className='text-lg font-sans  text-center  w-full py-10 px-20  sm:w-max
                                     sm:my-8 sm:px-96 sm:py-20  '> Drag and drop or Upload Banner  image  </p>
                                    </div>
                                </div>
                            </>
                            )}
                        </div>
                    </div>
                </Tab>
                <Tab label="Link" icon={<Link2 />}>
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
                    </div>
                </Tab>
                <Tab label="Poll" icon={<BarChart2 />}>
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
                    </div>
                </Tab>
            </Tabs>

        </div>
    )
}

export default TypingArea