import { useState, useEffect } from 'react'
import { Plus, ImageUp } from "lucide-react";
import SocialLinks from './SocialLinks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToggleButton from "@/GeneralElements/ToggleButton/ToggleButton";

function ProfileSettings() {
    const [DisplayName, setDisplayName] = useState("");
    const [IsDNEditable, setIsDNEditable] = useState(true); //Display Name
    const [About, setAbout] = useState("");
    const [IsAboutEditable, setIsAboutEditable] = useState(true);
    const [OpenLikePop, setOpenLikePop] = useState(false);
    const [selectedProfImage, setselectedProfImage] = useState(null);
    const [SelectedBannar, setSelectedBannar] = useState(null);

    useEffect(() => {
        // This function handles the drag over event
        const handleDragOver = (event) => {
            event.preventDefault();
        };

        // This function handles the drop event of Profle image
        const handleProfImageDrop = (event) => {
            event.preventDefault();
            handleProfImageUpload(event, "Drop");
        };

        // This function handles the drop event of Banner image
        const handleBannerDrop = (event) => {
            event.preventDefault();
            handleBannerUpload(event, "Drop");
        };

        // Add these event listeners to the drop zone
        document.getElementById("DropProfImage").addEventListener('dragover', handleDragOver, false);
        document.getElementById("DropProfImage").addEventListener('drop', handleProfImageDrop, false);

        // Cleanup function
        return () => {
            // Remove the event listeners
            //document.getElementById("DropProfImage").removeEventListener('dragover', handleDragOver);
            //document.getElementById("DropProfImage").removeEventListener('drop', handleProfImageDrop);
        };
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
                setSelectedBannar(reader.result);
                SaveChagesToast();
            };
            img.onerror = () => {
                // Handle error when image is corrupted
                toast.error("The image you chose is corrupted. \u{1F614}", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            };
        };

        reader.onerror = () => {
            // Handle error when file cannot be read
            toast.error("File cannot be read \u{1F615}", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        };

    };

    const handleProfImageUpload = (event, UpOrDrop = "up") => {
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
                setselectedProfImage(reader.result);
                SaveChagesToast();
            };
            img.onerror = () => {
                // Handle error when image is corrupted
                toast.error("The image you chose is corrupted. \u{1F614}", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            };
        };

        reader.onerror = () => {
            // Handle error when file cannot be read
            toast.error("File cannot be read \u{1F615}", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        };

    };


    const handleDisplayNameChange = (event) => {
        const newContent = event.target.value;
        setDisplayName(newContent);
    };
    const handleMaxcharDN = (event) => {
        if (DisplayName.length >= 30 && !(event.key === 'Backspace')) {
            setIsDNEditable(false);
            event.preventDefault()
        }
        else {
            setIsDNEditable(true);
        }
    }

    const handleAboutChange = (event) => {
        const newContent = event.target.value;
        setAbout(newContent);
    };
    const handleMaxcharAbout = (event) => {
        if (About.length >= 200 && !(event.key === 'Backspace')) {
            setIsAboutEditable(false);
            event.preventDefault()
        }
        else {
            setIsAboutEditable(true);
        }
    }

    const handleOpenLinkPop = () => {
        OpenLikePop ? setOpenLikePop(false) : setOpenLikePop(true)
    }

    const SaveChagesToast = () => {
        toast.success("Changes saved\u{1F60A}", {
            position: toast.POSITION.BOTTOM_CENTER
        })
    }



    return (
        <div className='flex  '>

            <div className="justify-center  w-[85%]">
                <h1 className='mb-9 font-bold text-xl'>Customize profile</h1>
                <div className='text-xs  text-gray-500'>PROFILE INFORMATION</div>
                <hr className='mb-6' />

                <h2 className=' text-base'>Display name (optional)</h2>
                <div className='text-xs  text-gray-500'>Set a display name. This does not change your username.</div>
                <input
                    className="rounded h-12 p-2 border text-sm border-gray-300 w-full my-4 focus:border-gray-400 "
                    type="text"
                    onKeyDown={handleMaxcharDN}
                    onChange={handleDisplayNameChange}
                    placeholder='Display name (optional)'
                />
                {IsDNEditable &&
                    <div className="text-xs text-gray-500"><span>{30 - DisplayName.length}  Characters remaining</span></div>
                }
                {!IsDNEditable &&
                    <div className="text-xs text-red-500"><span> 0 Characters remaining</span></div>
                }

                <h2 className=' text-base'>About (optional)</h2>
                <div className='text-xs  text-gray-500'>A brief description of yourself shown on your profile.</div>
                <textarea
                    className="rounded h-20 pb-4 pt-1 px-1  border text-sm border-gray-300 w-full my-4 focus:border-gray-400 "
                    type="text"
                    onKeyDown={handleMaxcharAbout}
                    onChange={handleAboutChange}
                    placeholder='About (optional)'
                />
                {IsAboutEditable &&
                    <div className="text-xs text-gray-500"><span>{200 - About.length} Characters remaining</span></div>
                }
                {!IsAboutEditable &&
                    <div className="text-xs text-red-500"><span> 0 Characters remaining</span></div>
                }

                <h2 className=' text-base'>Social links (5 max)</h2>
                <div className='text-xs my-4   text-gray-500'>People who visit your profile will see your social links.</div>
                <button onClick={handleOpenLinkPop} className='rounded-full border p-4 bg-gray-200 flex hover:bg-gray-300'>
                    <Plus size={12} />
                    <div className='mx-2 text-xs font-bold'>Add social link </div>
                </button>

                {OpenLikePop &&
                    <SocialLinks handleOpenLinkPop={handleOpenLinkPop} />
                }
                <div className='text-xs mt-6  text-gray-500'>IMAGES</div>
                <hr className='mb-6' />
                <h2 className=' text-base'>Profile and banner image</h2>
                <div className='text-xs    text-gray-500'>Images must be .png or .jpg format</div>
                <div className='flex'>
                    <div id="DropProfImage" className='relative border-dashed hover:cursor-pointer	border border-[#e94c00] h-[118.4px] m-4 w-[118.4px] bg-gray-200  rounded' onClick={() => document.getElementById("Pro-Image-load").click()}>
                        <input
                            className='hidden'
                            id="Pro-Image-load"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleProfImageUpload}
                        />

                        {selectedProfImage && (
                            <div>
                                <ImageUp strokeWidth={1} size={30} color='#e94c00' className='absolute p-1 bg-white border rounded-full bottom-1 right-1' />
                                <img className='object-cover object-top h-[118.4px] w-[118.4px]' src={selectedProfImage} alt="Selected" />
                            </div>
                        )}
                        {!selectedProfImage && (
                            <div className='items-center h-[118.4px] w-[118.4px] justify-items-center' >
                                <ImageUp strokeWidth={1} size={40} color='#e94c00' className='absolute p-1 bg-white border rounded-full bottom-1 left-9' />
                                <p className='text-ms font-sans px-2 mt-6 '> Upload Profile  </p>

                                <span className='text-ms font-sans px-4  mt-2'>image here</span>
                            </div>
                        )}
                    </div>
                    <div id="DropBannerImage" className='relative border-dashed hover:cursor-pointer	border border-[#e94c00] h-[118.4px] m-4 w-[300px] bg-gray-200  rounded' onClick={() => document.getElementById("Banner-load").click()}>
                        <input
                            className='hidden'
                            id="Banner-load"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleBannerUpload}
                        />

                        {SelectedBannar && (
                            <div>
                                <ImageUp strokeWidth={1} size={30} color='#e94c00' className='absolute p-1 bg-white border rounded-full bottom-1 right-1' />
                                <img className='object-cover object-top h-[118.4px] w-[118.4px]' src={SelectedBannar} alt="Selected" />
                            </div>
                        )}
                        {!SelectedBannar && (
                            <div className='items-center h-[118.4px] w-[118.4px] justify-items-center' >
                                <ImageUp strokeWidth={1} size={40} color='#e94c00' className='absolute p-1 bg-white border rounded-full bottom-2 left-1/2' />
                                <p className='text-ms font-sans  text-center   w-full  sm:w-max sm:my-8 sm:mx-2  '> Drag and drop or Upload Banner  image  </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className='text-xs mt-6  text-gray-500'>PROFILE CATEGORY</div>
                <hr className='mb-6' />
                <div className='flex gap-8'>
                    <span>
                        <p className='text-ms font-sans'> NSFW</p>

                        <span className='text-xs font-sans'>
                            This content is NSFW (may contain nudity, pornography, profanity
                            or inappropriate content for those under 18)
                        </span>
                    </span>
                    <ToggleButton />
                </div>
                <div className='text-xs mt-6  text-gray-500'>ADVANCED</div>
                <hr className='mb-6' />
                <div className='flex gap-28'>
                    <span>
                        <p className='text-ms  font-sans'>Allow people to follow you</p>

                        <span className='text-xs font-sans'>
                            Followers will be notified about posts you make to your profile and see them in their home feed.
                        </span>
                    </span>
                    <ToggleButton />
                </div>
                <div className='flex  my-4'>
                    <span>
                        <p className='text-ms font-sans  '>Content visibility</p>
                        {/* to do: put the real links */}
                        <span className='text-xs font-sans mr-44'>
                            Posts to this profile can appear in <a className='text-blue-500 underline' href="url">r/all</a> and your profile can be discovered in <a className='text-blue-500 underline' href="url">/users</a>
                        </span>
                    </span>
                    <ToggleButton />
                </div>
                <div className='flex   my-4'>
                    <span>
                        <p className='text-ms font-sans '>Active in communities visibility</p>
                        <span className='text-xs  mr-80 font-sans'>
                            Show which communities I am active in on my profile.
                        </span>
                    </span>
                    <ToggleButton />
                </div>
                <div className='flex  my-4' >
                    <span>
                        <p className='text-ms font-sans mr-96 '>Clear history</p>
                        <span className='text-xs font-sans'>
                            Delete your post views history.
                        </span>
                    </span>
                    <button className='border w-max p-1 text-ms ml-24 text-blue-700 border-blue-700  rounded-3xl font-bold '>
                        Clear history
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ProfileSettings