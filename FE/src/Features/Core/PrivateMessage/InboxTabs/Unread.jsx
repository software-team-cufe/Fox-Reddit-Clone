import React, { useEffect, useState } from 'react'
import {
    X, UserRoundX, BadgeCheck
    , CirclePlus, CircleMinus
} from 'lucide-react'
import { Switch } from '@headlessui/react'
import ReactQuill from 'react-quill';
import { userAxios } from "@/Utils/UserAxios";
import { userStore } from '../../../../hooks/UserRedux/UserStore';
function Unread({ DiffTime }) {
    const currentId = userStore.getState().user.user._id;
    const [UnreadMess, setUnreadMess] = useState([]);
    const [SureToRemove, setSureToRemove] = useState(Array(UnreadMess.length).fill(false));
    const [SureToBlock, setSureToBlock] = useState(Array(UnreadMess.length).fill(false));
    const [Blocked, setBlocked] = useState(Array(UnreadMess.length).fill(false));
    const [ReportPop, setReportPop] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null);
    const [DisableNext, setDisableNext] = useState(false);
    const [DoneReportPop, setDoneReportPop] = useState(false);
    const [UserToReport, setUserToReport] = useState('');
    const [BlockedUserInRep, setBlockedUserInRep] = useState(false);
    const [ShowRepIn, setShowRepIn] = useState(Array(UnreadMess.length).fill(false));
    const [ReplyValue, setReplyValue] = useState('');
    const [ShowExpand, setShowExpand] = useState(Array(UnreadMess.length).fill(true));
    const [loading, setLoading] = useState(true);
    const [crash, setCrash] = useState(false);
    const [Removed, setRemoved] = useState(Array(UnreadMess.length).fill(true));

    const [ToolBar, setToolBar] = useState([['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    ])

    const buttons = ["Harassment", "Threatening violence",
        "Hate", "Minor abuse or sexualization", "Sharing personal information",
        "Non-consensual intimate media", "Prohibited transaction",
        "Impersonation", "Copyright violation", "Trademark violation",
        "Self-harm or suicide", "Spam", "Community interference",
        "Report abuse"];

    const Desc = [{ title: "Harassment", des: "Harassing, bullying, intimidating, or abusing an individual or group of people with the result of discouraging them from participating." }, { title: "Threatening violence", des: "Encouraging, glorifying, or inciting violence or physical harm against individuals or groups of people, places, or animals." },
    { title: "Hate", des: "Promoting hate or inciting violence based on identity or vulnerability." }, { title: "Minor abuse or sexualization", des: "Sharing or soliciting content involving abuse, neglect, or sexualization of minors or any predatory or inappropriate behavior involving minors." }, { title: "Sharing personal information", des: "Sharing or threatening to share private, personal, or confidential information about someone." },
    { title: "Non-consensual intimate media", des: 'Sharing, threatening to share, or soliciting intimate or sexually-explicit content of someone without their consent (including fake or "lookalike" pornography).' }, { title: "Prohibited transaction", des: "Soliciting or facilitating transactions or gifts of illegal or prohibited goods and services." },
    { title: "Impersonation", des: "Impersonating an individual or entity in a misleading or deceptive way. This includes deepfakes, manipulated content, or false attributions." }, { title: "Copyright violation", des: "Content posted to Fox that infringes a copyright you own or control. (Note: Only the copyright owner or an authorized representative can submit a report.)" }, { title: "Trademark violation", des: "Content posted to Fox that infringes a trademark you own or control. (Note: Only the trademark owner or an authorized representative can submit a report.)" },
    { title: "Self-harm or suicide", des: "Behavior or comments that make you think someone may be considering suicide or seriously hurting themselves." }, { title: "Spam", des: "Repeated, unwanted, or unsolicited manual or automated actions that negatively affect users, communities, and the Fox platform." }, { title: "Community interference", des: "Targeted behavior by a group of users seeking to disrupt or interfere with the operation of your community." },
    { title: "Report abuse", des: "Using Fox’s reporting tools to spam, harass, bully, intimidate, abuse, or create a hostile environment." }];

    useEffect(() => {
        fetchMessages();
    }, [])

    useEffect(() => {
        setShowExpand(Array(UnreadMess.length).fill(true));
    }, [UnreadMess])

    useEffect(() => {
        selectedButton === null ? setDisableNext(true) : setDisableNext(false)
    }, [selectedButton])

    const fetchMessages = async () => {
        try {
            const res = await userAxios.get('message/unreadMessages/');
            console.log(res.data);
            const filteredMessages = res.data.messages.filter(message => !message.isDeleted);
            setUnreadMess(filteredMessages);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setCrash(true);
            setLoading(false);
        }
    }
    const handleBlock = async () => {
        if (UserToReport) {
            try {
                if (BlockedUserInRep) {
                    const data = {
                        username: UserToReport,
                        type: "unblock"
                    }
                    const res = await userAxios.post('api/block_user', data);
                    console.log(res.data);
                    //check if UserToBlock is not empty set BlockedUserInRep
                    setBlockedUserInRep(!BlockedUserInRep);
                }
                else {
                    const data = {
                        username: UserToReport,
                        type: "block"
                    }
                    const res = await userAxios.post('api/block_user', data);
                    console.log(res.data);
                    //check if UserToBlock is not empty set BlockedUserInRep
                    setBlockedUserInRep(!BlockedUserInRep);
                }
            } catch (error) {
                console.log(error);
            }

        }
    }

    const handleRemove = async (id, i) => {
        try {
            console.log(id);
            const res = await userAxios.post('api/del_msg', { msgId: id });
            console.log(res.data);
            setRemoved(prevState => {
                const newState = [...prevState];
                newState[i] = true;
                return newState;
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (buttonName) => {
        if (selectedButton === buttonName) {
            // If the clicked button is already selected, unselect it
            setSelectedButton(null);
        } else {
            // Otherwise, select the clicked button
            setSelectedButton(buttonName);
        }
    };

    const ReportDes = Desc.map(item => {
        if (item.title === selectedButton) {
            return <div key={item.title}>
                <div className='text-sm mt-4 mb-2'>{item.title}</div>
                <div className='text-xs text-gray-500'>{item.des}</div>
            </div>;
        }
        return null;
    });

    const SendReport = () => {
        //after done
        setSelectedButton(null);
        setUserToReport('');

    }
    if (loading) {
        return (
            <img src={'/logo.png'} className="h-20 w-20 mt-48 mx-auto animate-ping" alt="Logo" />
        )
    }

    if (crash) {
        return (
            <div>
                <img src={'/snooNotFound.jpg'} className="h-96 w-96 mt-20 mx-auto" alt="Logo" />
                <p className="text-gray-600 mx-auto font-semibold">Failed to load page</p>
            </div>
        )
    }

    const SendReply = async (id, to) => {
        try {
            const data = {
                text: ReplyValue,
                toUsername: to,
                parentID: id
            }
            const res = await userAxios.post('api/message/addReplyOnMessage', data);
            setReplyValue('');
        } catch (error) {
            console.log(error)
        }
    }
    const toggleShowRepIn = (index) => {
        setShowRepIn((prevShowRepIn) => {
            const newShowRepIn = Array.from({ length: UnreadMess.length },
                (_, i) => i === index ? !prevShowRepIn[i] : false);
            return newShowRepIn;
        });
    };

    const toggleShowExpand = (index) => {
        setShowExpand((prevShowRepIn) => {
            const newShowRepIn = Array.from({ length: UnreadMess.length },
                (_, i) => i === index ? !prevShowRepIn[i] : prevShowRepIn[i]);
            return newShowRepIn;
        });
    };
    const handleBlockk = async (username, i) => {
        try {
            const data = {
                username: username,
                type: "block"
            }
            const res = await userAxios.post('api/block_user', data);
            console.log(res.data);
            setBlocked(prevState => {
                const newState = [...prevState];
                newState[i] = true;
                return newState;
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className=' w-full  sm:mx-40 lg:mx-60 sm:mt-2'>
            {UnreadMess.length === 0 && <div className='bg-white p-4 rounded sm:w-2/3 w-full '
            >there doesn't seem to be anything here</div>}
            {UnreadMess.map((mess, i) => {
                return (
                    <div key={i} className={`p-4 rounded sm:w-2/3 w-full  mb-1
                  ${i % 2 === 0 ? "bg-white" : "bg-[#fff6f1]"}`}>
                        <div className='flex'>
                            <p className='text-lg font-bold ml-4' >{mess.subject}:</p>
                        </div>
                        <div className='flex mr-2 ml-14 mb-2'>

                            <div className='mr-2 w-full '>
                                <div className='flex mb-2'>
                                    {!ShowExpand[i] && <CirclePlus onClick={() => { toggleShowExpand(i); }}
                                        size={16} className='my-1 mr-1
                                    text-[#935226ef] hover:text-[#edc6b2] hover:cursor-pointer' />}
                                    {ShowExpand[i] && <CircleMinus onClick={() => { toggleShowExpand(i); }}
                                        size={16} className='my-1  mr-1
                                    text-[#935226ef] hover:text-[#edc6b2] hover:cursor-pointer' />}
                                    <p className='text-xs mt-1 mr-2 text-gray-500'>
                                        from</p>
                                    <p className='text-sm mr-2  text-blue-600
                                        hover:cursor-pointer hover:underline'>
                                        {mess.fromID.username}</p>
                                    <p className='text-xs mt-1 mr-2 text-gray-500'>
                                        {DiffTime(mess.createdAt)}</p>
                                </div>
                                {ShowExpand[i] && <div id="hidden-in-collapse">
                                    <div className='mb-2  text-sm'
                                        dangerouslySetInnerHTML={{ __html: mess.text }}></div>
                                    <div className='flex flex-wrap text-gray-500'>
                                        {!Removed[i] && <>{!SureToRemove[i] && <p onClick={() => {
                                            setSureToRemove(prevState => {
                                                const newState = [...prevState];
                                                newState[i] = !newState[i];
                                                return newState;
                                            });
                                        }}
                                            className='text-xs m-1 hover:cursor-pointer
                                     hover:underline'>Remove</p>}
                                            {SureToRemove[i] && <div className='flex'>
                                                <p className='text-xs
                                     text-red-600 m-1 '>are you sure?</p>
                                                <p onClick={() => {
                                                    handleRemove(mess._id, i);
                                                }}
                                                    className=' m-1 text-xs hover:cursor-pointer
                                     hover:underline'>Yes</p>
                                                <p className='text-xs text-red-600 m-1 '>/</p>
                                                <p onClick={() => {
                                                    setSureToRemove(prevState => {
                                                        const newState = [...prevState];
                                                        newState[i] = !newState[i];
                                                        return newState;
                                                    });
                                                }}
                                                    className=' m-1 text-xs hover:cursor-pointer
                                     hover:underline'>No</p>   </div>}
                                        </>}
                                        <p onClick={() => { setReportPop(true); setUserToReport(mess.fromID.username); }}
                                            className='mx-2 m-1 text-xs hover:cursor-pointer
                                     hover:underline'>Report</p>
                                        {!Blocked[i] && <>{!SureToBlock[i] && <p onClick={() => {
                                            setSureToBlock(prevState => {
                                                const newState = [...prevState];
                                                newState[i] = !newState[i];
                                                return newState;
                                            });
                                        }}
                                            className='text-xs m-1 hover:cursor-pointer 
                                    hover:underline'>Block user</p>}
                                            {SureToBlock[i] && <div className='flex'> <p
                                                className='text-xs text-red-600 m-1 '>
                                                are you sure?</p>
                                                <p onClick={() => {
                                                    handleBlockk(mess.fromID.username, i);
                                                }}
                                                    className=' m-1 text-xs hover:cursor-pointer
                                     hover:underline'>Yes</p>
                                                <p className='text-xs text-red-600 m-1 '>/</p>
                                                <p onClick={() => {
                                                    setSureToBlock(prevState => {
                                                        const newState = [...prevState];
                                                        newState[i] = !newState[i];
                                                        return newState;
                                                    });
                                                }}
                                                    className=' m-1 text-xs hover:cursor-pointer
                                     hover:underline'>No</p>   </div>}</>}
                                        <p onClick={() => { setShowRepIn(true); toggleShowRepIn(i); }}
                                            className={`mx-2 text-xs m-1  hover:cursor-pointer
                                     hover:underline ${mess.unread ? "hidden" : "block"}`}>Reply</p>
                                    </div>
                                    {ShowRepIn[i] && <div className=' my-1 h-max mt-4'>
                                        <ReactQuill
                                            value={ReplyValue}
                                            onChange={(value) => { setReplyValue(value) }}
                                            modules={{
                                                toolbar: {
                                                    container: ToolBar
                                                },
                                            }}
                                        />
                                        <div className=' relative w-full m-10 mt-12 '>
                                            <button onClick={() => { SendReply(mess._id, mess.fromID.username); toggleShowRepIn(i); }}
                                                className='  p-2 bg-[#935226ef] text-white
                                    hover:bg-[#edc6b2] hover:text-slate-900 disabled:bg-gray-300
                                     disabled:text-white absolute rounded-full 
                                         right-10 bottom-0 '>Send</button>
                                            <button onClick={() => { toggleShowRepIn(i); setReplyValue(''); }}
                                                className='p-2 bg-[#935226ef] text-white
                                    hover:bg-[#edc6b2] hover:text-slate-900 disabled:bg-gray-300
                                     disabled:text-white absolute rounded-full
                                         right-28 bottom-0  '>Cancel</button>
                                        </div>
                                    </div>}
                                </div>}
                            </div>
                        </div>

                    </div>
                )
            })}
            {
                ReportPop && (
                    <div className="fixed inset-0 flex items-center 
                            justify-center bg-gray-800 bg-opacity-50">
                        <div className={`bg-white p-3 w-full sm:w-[500px] relative rounded shadow-md
                    ${selectedButton === null ? " sm:h-[375px] h-[500px]" : "sm:h-[500px] h-[600px]"}`}>
                            <h2 className="text-lg font-semibold mb-4">Submit
                                a Report
                            </h2>
                            <X onClick={() => { setReportPop(false); setUserToReport(''); }}
                                size={20} className=' text-gray-400 absolute top-4 right-4 
                            hover:cursor-pointer hover:text-black' />
                            <p className="text-gray-700 text-xs mb-2">
                                Thanks for looking out for yourself and your
                                fellow by reporting things that break the rules.
                                Let us know what's
                                happening, and we'll look into it.
                            </p>
                            {buttons.map((buttonName, index) => (
                                <button
                                    key={index}
                                    className={`py-2 px-4 text-xs rounded-full 
                                            m-1 border hover:bg-blue-500 hover:text-white
                                             ${selectedButton === buttonName ?
                                            'bg-blue-500 text-white' :
                                            ' text-gray-800'
                                        }`}
                                    onClick={() => handleClick(buttonName)}
                                >
                                    {buttonName}
                                </button>
                            ))}
                            <br />
                            <button onClick={() => { setReportPop(false); setDoneReportPop(true); }}
                                className='p-2 bg-[#935226ef] text-white
                                     rounded-full absolute bottom-3 right-4 hover:bg-[#edc6b2] 
                                      hover:text-slate-900 disabled:bg-gray-300 disabled:text-white'
                                disabled={DisableNext}>
                                Next</button>
                            <div>{ReportDes}</div>
                        </div>
                    </div>
                )
            }
            {
                DoneReportPop && (
                    <div className="fixed inset-0 flex items-center 
                            justify-center bg-gray-800 bg-opacity-50">
                        <div className={`bg-white p-3 w-full sm:w-[500px] relative rounded shadow-md
                    ${selectedButton === null ? " sm:h-[355px] h-[320px]" : "sm:h-[450px] h-[500px]"}`}>
                            <h2 className="text-lg font-semibold mb-4">Submit
                                a Report
                            </h2>
                            <X onClick={() => { setDoneReportPop(false); setUserToReport(''); }}
                                size={20} className=' text-gray-400 absolute top-4 right-4 
                            hover:cursor-pointer hover:text-black' />
                            <BadgeCheck className=' text-orange-600  rounded-full'
                                strokeWidth={1.5} size={35} />
                            <p className='mt-3 mb-1'>Thanks for your report </p>
                            <p className="text-gray-700 text-xs mb-3">
                                Thanks again for your report and for looking out for
                                yourself and your fellow. Your reporting
                                helps make Fox a better, safer, and more welcoming place
                                for everyone; and it means a lot to us.
                            </p>
                            <hr />
                            <div className='flex'>
                                <UserRoundX className=' text-orange-600  rounded-full my-2'
                                    strokeWidth={1.5} size={26} />
                                <div>
                                    <p className='text-sm mx-2 mt-3 mb-1'>Block {UserToReport}</p>
                                    <p className='text-xs mx-2 mb-2'>You won't be able to send direct messages or chat requests to each other.</p>
                                </div>
                                <Switch
                                    checked={BlockedUserInRep}
                                    onChange={() => handleBlock(UserToReport)}
                                    className={`${BlockedUserInRep ? 'bg-blue-700' : 'bg-gray-300'}
                                                    relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full
                                                    my-6 mx-6 border-2 border-transparent transition-colors duration-200 ease-in-out 
                                                     focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
                                    <span
                                        aria-hidden="true"
                                        className={`${BlockedUserInRep ? 'translate-x-4' : 'translate-x-0'}
                                                        pointer-events-none inline-block h-5 w-5 transform rounded-full
                                                         bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                                </Switch>
                            </div>
                            <hr />
                            <br />
                            <button onClick={() => { setDoneReportPop(false); SendReport(); }}
                                className='p-2 bg-[#935226ef] text-white
                                     rounded-full absolute bottom-3 right-4 hover:bg-[#edc6b2] 
                                      hover:text-slate-900 disabled:bg-gray-300 disabled:text-white'>
                                Submit</button>
                            <div>{ReportDes}</div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Unread