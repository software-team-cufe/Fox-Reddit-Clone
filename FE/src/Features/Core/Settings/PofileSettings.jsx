import { useState, useEffect } from 'react'
import { Plus, ImageUp } from "lucide-react";
import SocialLinks from './SocialLinks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToggleButton from "@/GeneralElements/ToggleButton/ToggleButton";
import { userAxios } from "@/Utils/UserAxios";
import { Switch } from '@headlessui/react'
import axios from 'axios';

function ProfileSettings() {
    const [Name, setName] = useState("");
    const [IsDNEditable, setIsDNEditable] = useState(true); //Display Name
    const [About, setAbout] = useState("");
    const [IsAboutEditable, setIsAboutEditable] = useState(true);
    const [OpenLikePop, setOpenLikePop] = useState(false);
    const [selectedProfImage, setselectedProfImage] = useState(null);
    const [SelectedBannar, setSelectedBannar] = useState(null);
    const [NSFW, setNSFW] = useState(false);
    const [Followers, setFollowers] = useState(true);
    const [ContentVisiable, setContentVisiable] = useState(true);
    const [ActiveVisiable, setActiveVisiable] = useState(false);
    const [DisableNSFW, setDisableNSFW] = useState(false);
    const [hide, sethide] = useState(true);
    const [DisableSL, setDisableSL] = useState(false);

    useEffect(() => {
        FetchDataMock();
        // FetchData();
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

        document.getElementById("DropBannerImage").addEventListener('dragover', handleDragOver, false);
        document.getElementById("DropBannerImage").addEventListener('drop', handleBannerDrop, false);

    }, []);

    const FetchData = async () => {
        try {
            const res = await userAxios.get('user/boudie_test/about');
            console.log(res.data);
            setFollowers(res.data.acceptFollowers);
            setselectedProfImage(res.data.avatar);
            if (!res.data.over18) {
                setNSFW(false);
                setDisableNSFW(true);
            }
            else {
                setDisableNSFW(false);
            } //setNSFW(res.data.nsfw);

        } catch (ex) {
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }

    }
    const FetchDataMock = async () => {
        try {
            const res = await axios.get('http://localhost:3002/users/1');

            console.log(res.data);
            setNSFW(res.data.nsfw);
            setContentVisiable(res.data.conV);
            setActiveVisiable(res.data.comV);
            setAbout(res.data.about);
            setName(res.data.name);
            setselectedProfImage(res.data.avatar);
            setSelectedBannar(res.data.BannerImage);
            setFollowers(res.data.allowFollow);

        } catch (ex) {
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }


    }

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

                axios.patch('http://localhost:3002/users/1', { BannerImage: reader.result })
                    .then((res) => {
                        setSelectedBannar(reader.result);
                        toast.success("Changes saved \u{1F60A}");
                    })

                    .catch((ex) => {
                        if (ex.issues != null && ex.issues.length != 0) {
                            toast.error(ex.issues[0].message);
                        }
                    });

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

                axios.patch('http://localhost:3002/users/1', { avatar: reader.result })
                    .then((res) => {
                        setselectedProfImage(reader.result);
                        toast.success("Changes saved \u{1F60A}");
                    })
                    .catch((ex) => {
                        if (ex.issues != null && ex.issues.length != 0) {
                            toast.error(ex.issues[0].message);
                        }
                    });
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


    const handleNameChange = (event) => {
        const newContent = event.target.value;
        setName(newContent);
    };
    const handleMaxcharDN = (event) => {
        if (Name.length >= 30 && !(event.key === 'Backspace')) {
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
        sethide(!hide);
    }

    const SaveChagesToast = () => {
        toast.success("Changes saved\u{1F60A}", {
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

    const handleSaveNSFW = () => {
        if (!DisableNSFW) {
            axios.patch('http://localhost:3002/users/1', { nsfw: !NSFW })
                .then((res) => {
                    toast.success("Changes saved \u{1F60A}");
                    setNSFW(!NSFW);
                })
                .catch((ex) => {
                    if (ex.issues != null && ex.issues.length != 0) {
                        toast.error(ex.issues[0].message);
                    }
                });
        }
    }
    const handleSaveConV = () => {


        const res = axios.patch('http://localhost:3002/users/1', { conV: !ContentVisiable })
            .then((res) => {
                ContentVisiable ? setContentVisiable(false) : setContentVisiable(true);
                toast.success("Changes saved \u{1F60A}");
            })
            .catch((ex) => {
                if (ex.issues != null && ex.issues.length != 0) {
                    toast.error(ex.issues[0].message);
                }
            });

    }

    const handleSaveComV = () => {

        const res = axios.patch('http://localhost:3002/users/1', { comV: !ActiveVisiable })
            .then((res) => {
                ActiveVisiable ? setActiveVisiable(false) : setActiveVisiable(true);
                toast.success("Changes saved \u{1F60A}");
            })
            .catch((ex) => {
                if (ex.issues != null && ex.issues.length != 0) {
                    toast.error(ex.issues[0].message);
                }
            });

    }
    const handleSaveFollow = () => {

        const res = axios.patch('http://localhost:3002/users/1', { allowFollow: !Followers })
            .then((res) => {
                Followers ? setFollowers(false) : setFollowers(true);
                toast.success("Changes saved \u{1F60A}");
            })
            .catch((ex) => {
                if (ex.issues != null && ex.issues.length != 0) {
                    toast.error(ex.issues[0].message);
                }
            });

    }
    const handleNameSave = () => {
        const res = axios.patch('http://localhost:3002/users/1', { name: Name })
            .then((res) => {
                toast.success("Changes saved \u{1F60A}");
            })
            .catch((ex) => {
                if (ex.issues != null && ex.issues.length != 0) {
                    toast.error(ex.issues[0].message);
                }
            });
    }
    const handleAboutSave = () => {
        const res = axios.patch('http://localhost:3002/users/1', { about: About })
            .then((res) => {
                toast.success("Changes saved \u{1F60A}");
            })
            .catch((ex) => {
                if (ex.issues != null && ex.issues.length != 0) {
                    toast.error(ex.issues[0].message);
                }
            });
    }


    return (
        <div className='flex  '>

            <div className="justify-center w-[95%]  sm:w-[75%]">
                <h1 className='mb-9 font-bold text-xl'>Customize profile</h1>
                <div className='text-xs  text-gray-500'>PROFILE INFORMATION</div>
                <hr className='mb-6' />

                <h2 className=' text-base'>Display name (optional)</h2>
                <div className='text-xs  text-gray-500'>Set a display name. This does not change your username.</div>
                <input
                    value={Name}
                    onBlur={handleNameSave}
                    className="rounded h-12 p-2 border text-sm border-gray-300 w-full my-4 focus:border-gray-400 "
                    type="text"
                    onKeyDown={handleMaxcharDN}
                    onChange={handleNameChange}
                    placeholder='Display name (optional)'
                />
                {IsDNEditable &&
                    <div className="text-xs text-gray-500"><span>{30 - Name.length}
                        Characters remaining</span></div>
                }
                {!IsDNEditable &&
                    <div className="text-xs text-red-500"><span> 0 Characters remaining</span></div>
                }

                <h2 className=' text-base'>About (optional)</h2>
                <div className='text-xs  text-gray-500'>A brief description of yourself shown on your profile.</div>
                <textarea
                    onBlur={handleAboutSave}
                    className="rounded h-20 pb-4 pt-1 px-1  border text-sm border-gray-300 w-full my-4
                     focus:border-gray-400 "
                    type="text"
                    onKeyDown={handleMaxcharAbout}
                    onChange={handleAboutChange}
                    placeholder='About (optional)'
                    value={About}
                />
                {IsAboutEditable &&
                    <div className="text-xs text-gray-500"><span>{200 - About.length} Characters remaining</span></div>
                }
                {!IsAboutEditable &&
                    <div className="text-xs text-red-500"><span> 0 Characters remaining</span></div>
                }

                <h2 className=' text-base'>Social links (5 max)</h2>
                <div className='text-xs my-4   text-gray-500'>People who visit your profile will see your
                    social links.</div>
                <button disabled={DisableSL}
                    onClick={handleOpenLinkPop} className='rounded-full border p-4 bg-gray-200 flex
                 hover:bg-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-200'>
                    <Plus size={12} />
                    <div className='mx-2 text-xs font-bold'>Add social link </div>
                </button>


                <SocialLinks handleOpenLinkPop={sethide} hide={hide} DisableSL={setDisableSL} />

                <div className='text-xs mt-6  text-gray-500'>IMAGES</div>
                <hr className='mb-6' />
                <h2 className=' text-base'>Profile and banner image</h2>
                <div className='text-xs    text-gray-500'>Images must be .png or .jpg format</div>
                <div className='flex'>
                    <div id="DropProfImage" className='relative border-dashed hover:cursor-pointer	border 
                    border-[#e94c00] h-[118.4px] m-4 w-[118.4px] bg-gray-200  rounded'
                        onClick={() => document.getElementById("Pro-Image-load").click()}>
                        <input
                            className='hidden'
                            id="Pro-Image-load"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleProfImageUpload}
                        />

                        {selectedProfImage && (
                            <div>
                                <ImageUp strokeWidth={1} size={30} color='#e94c00' className='absolute p-1
                                 bg-white border rounded-full bottom-1 right-1' />
                                <img className='  object-cover pb-1 object-top h-[118.4px] w-[118.4px]'
                                    src={selectedProfImage} alt="Profile image" />
                            </div>
                        )}
                        {!selectedProfImage && (
                            <div className='items-center h-[118.4px] w-[118.4px] justify-items-center' >
                                <ImageUp strokeWidth={1} size={40} color='#e94c00' className='absolute p-1
                                 bg-white border rounded-full bottom-1 left-9' />
                                <p className='text-ms font-sans px-2 mt-6 '> Upload Profile  </p>

                                <span className='text-ms font-sans px-4  mt-2'>image here</span>
                            </div>
                        )}
                    </div>
                    <div id="DropBannerImage" className=' relative border-dashed hover:cursor-pointer
                    	border border-[#e94c00] h-[118.4px] m-4 w-[300px] bg-gray-200  rounded'
                        onClick={() => document.getElementById("Banner-load").click()}>
                        <input
                            className='hidden'
                            id="Banner-load"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleBannerUpload}
                        />

                        {SelectedBannar && (
                            <div>
                                <ImageUp strokeWidth={1} size={30} color='#e94c00'
                                    className='absolute p-1 bg-white border rounded-full bottom-1 right-1' />
                                <img className='object-cover  pb-1 h-[118.4px] 
                                 w-full' src={SelectedBannar} alt="Banner image" />
                            </div>
                        )}
                        {!SelectedBannar && (
                            <div className='items-center h-[118.4px] w-[118.4px] justify-items-center' >
                                <ImageUp strokeWidth={1} size={40} color='#e94c00' className='absolute p-1
                                 bg-white border rounded-full bottom-2 left-1/2' />
                                <p className='text-ms font-sans  text-center   w-full  sm:w-max sm:my-8 sm:mx-2 
                                 '> Drag and drop or Upload Banner  image  </p>
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
                    <div className="w-full" />
                    <Switch
                        checked={NSFW}
                        onChange={handleSaveNSFW}
                        className={`${NSFW ? 'bg-blue-700' : 'bg-gray-300'}
                                                    relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full
                                                     border-2 border-transparent transition-colors duration-200 ease-in-out 
                                                     focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
                        <span
                            aria-hidden="true"
                            className={`${NSFW ? 'translate-x-4' : 'translate-x-0'}
                                                        pointer-events-none inline-block h-5 w-5 transform rounded-full
                                                         bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                    </Switch>
                </div>
                <div className='text-xs mt-6  text-gray-500'>ADVANCED</div>
                <hr className='mb-6' />
                <div className='flex  '>
                    <span>
                        <p className='text-ms w-max font-sans'>Allow people to follow you</p>

                        <span className='text-xs font-sans'>
                            Followers will be notified about posts you make to your profile and see them in their home feed.
                        </span>
                    </span>
                    <div className="w-full" />
                    <Switch
                        checked={Followers}
                        onChange={handleSaveFollow}
                        className={`${Followers ? 'bg-blue-700' : 'bg-gray-300'}
                                                    relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full
                                                     border-2 border-transparent transition-colors duration-200 ease-in-out 
                                                     focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
                        <span
                            aria-hidden="true"
                            className={`${Followers ? 'translate-x-4' : 'translate-x-0'}
                                                        pointer-events-none inline-block h-5 w-5 transform rounded-full
                                                         bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                    </Switch>
                </div>
                <div className='flex  my-4'>
                    <span>
                        <p className='text-ms font-sans  '>Content visibility</p>
                        {/* to do: put the real links */}
                        <span className='text-xs font-sans '>
                            Posts to this profile can appear in
                            <a className='text-blue-500 underline' href="url">r/all</a>
                            and your profile can be discovered in
                            <a className='text-blue-500 underline' href="url">/users</a>
                        </span>
                    </span>
                    <div className="w-full" />
                    <Switch
                        checked={ContentVisiable}
                        onChange={handleSaveConV}
                        className={`${ContentVisiable ? 'bg-blue-700' : 'bg-gray-300'}
                                                    relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full
                                                     border-2 border-transparent transition-colors duration-200 ease-in-out 
                                                     focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
                        <span
                            aria-hidden="true"
                            className={`${ContentVisiable ? 'translate-x-4' : 'translate-x-0'}
                                                        pointer-events-none inline-block h-5 w-5 transform rounded-full
                                                         bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                    </Switch>
                </div>
                <div className='flex   my-4'>
                    <span>
                        <p className='text-ms font-sans w-max '>Active in communities visibility</p>
                        <span className='text-xs  font-sans'>
                            Show which communities I am active in on my profile.
                        </span>
                    </span>
                    <div className="w-full" />
                    <Switch
                        checked={ActiveVisiable}
                        onChange={handleSaveComV}
                        className={`${ActiveVisiable ? 'bg-blue-700' : 'bg-gray-300'}
                                                    relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full
                                                     border-2 border-transparent transition-colors duration-200 ease-in-out 
                                                     focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
                        <span
                            aria-hidden="true"
                            className={`${ActiveVisiable ? 'translate-x-4' : 'translate-x-0'}
                                                        pointer-events-none inline-block h-5 w-5 transform rounded-full
                                                         bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                    </Switch>
                </div>
                <div className='flex  my-4' >
                    <span>
                        <p className='text-ms font-sans w-max '>Clear history</p>
                        <span className='text-xs font-sans'>
                            Delete your post views history.
                        </span>
                    </span>
                    <div className="w-full" />
                    <button className='border min-w-max p-1 text-xs 
                     text-blue-700 border-blue-700 h-fit py-4  rounded-3xl font-bold '>
                        Clear history
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ProfileSettings