import React, { useEffect, useState } from 'react'
import { ArrowBigUp, ArrowBigDown, X, UserRoundX, BadgeCheck } from 'lucide-react'
import { Switch } from '@headlessui/react'

function PostReplies({ Messages, DiffTime, setUnreadAtIndex }) {
    const [SureToRemove, setSureToRemove] = useState(false);
    const [SureToBlock, setSureToBlock] = useState(false);
    const [ReportPop, setReportPop] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null);
    const [Unread, setUnread] = useState(false);
    const [DisableNext, setDisableNext] = useState(false);
    const [DoneReportPop, setDoneReportPop] = useState(true);
    const [UserToReport, setUserToReport] = useState('');
    const [BlockedUserInRep, setBlockedUserInRep] = useState(false);

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

    }, [])

    useEffect(() => {
        selectedButton === null ? setDisableNext(true) : setDisableNext(false)
    }, [selectedButton])

    const handleUpVote = () => { }
    const handleDownVote = () => { }
    const handleRemove = () => { }
    const handleBlock = () => {
        //check if UserToBlock is not empty set BlockedUserInRep
        setBlockedUserInRep(!BlockedUserInRep);
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
            return <>
                <div className='text-sm mt-4 mb-2'>{item.title}</div>
                <div className='text-xs text-gray-500'>{item.des}</div>
            </>;
        }
        return null;
    });

    return (
        <div className=' w-full  sm:mx-40 lg:mx-60 sm:mt-2'>
            {Messages.map((mess, i) => {
                return (
                    <div key={i} className={`p-4 rounded sm:w-2/3 w-full 
                   
                    ${mess.unread ? "bg-gray-300" : ""}
                    ${i % 2 === 0 && !mess.unread ? "bg-white" : "bg-[#fff6f1]"}
                    `}>
                        <div className='flex'>
                            <p className='text-sm mr-2 mt-1' >post reply:</p>
                            <p className='text-lg font-bold' onClick={() => {
                                //navigate to post
                            }}>{mess.PostTitle}</p>
                        </div>
                        <div className='flex mr-2 ml-14 mb-2'>
                            <div className='flex flex-col mr-2'>
                                <ArrowBigUp onClick={() => { handleUpVote(mess.id) }}
                                    className={`${mess.UpOrDownV === 'up' ?
                                        ' text-green-600 rounded-full' : 'text-slate-400'}`} />
                                <ArrowBigDown onClick={() => { handleDownVote(mess.id) }}
                                    className={`${mess.UpOrDownV === 'down' ?
                                        ' text-red-600 rounded-full' : 'text-slate-400'}`} />
                            </div>
                            <div className='mr-2 w-full '>
                                <div className='flex mb-2'>
                                    <p className='text-xs mt-1 mr-2 text-gray-500'>
                                        from</p>
                                    <p className='text-sm mr-2  text-blue-600
                                     hover:cursor-pointer hover:underline'>
                                        {mess.username}</p>
                                    <p className='text-xs mt-1 mr-2 text-gray-500'>
                                        {DiffTime(mess.createdAt)}</p>
                                </div>
                                <div className='mb-2  w-24 text-sm'
                                    dangerouslySetInnerHTML={{ __html: mess.text }}></div>
                                <div className='flex flex-wrap text-gray-500'>
                                    <p className='text-xs m-1 hover:cursor-pointer 
                                    hover:underline' onClick={() => {
                                            //go to comment page
                                        }}>Context</p>
                                    <p onClick={() => {
                                        //go to post page
                                    }} className='mx-2 m-1 text-xs hover:cursor-pointer 
                                    hover:underline '>Full Comments ({mess.CommentsNum})</p>
                                    {!SureToRemove && <p onClick={() => {
                                        setSureToRemove(true);
                                    }}
                                        className='text-xs m-1 hover:cursor-pointer
                                     hover:underline'>Remove</p>}
                                    {SureToRemove && <div className='flex'>
                                        <p className='text-xs
                                     text-red-600 m-1 '>are you sure?</p>
                                        <p onClick={() => {
                                            handleRemove(mess.id);
                                        }}
                                            className=' m-1 text-xs hover:cursor-pointer
                                     hover:underline'>Yes</p>
                                        <p className='text-xs text-red-600 m-1 '>/</p>
                                        <p onClick={() => {
                                            setSureToRemove(false);
                                        }}
                                            className=' m-1 text-xs hover:cursor-pointer
                                     hover:underline'>No</p>   </div>}
                                    <p onClick={() => { setReportPop(true); setUserToReport(mess.username); }}
                                        className='mx-2 m-1 text-xs hover:cursor-pointer
                                     hover:underline'>Report</p>
                                    {!SureToBlock && <p onClick={() => {
                                        setSureToBlock(true);
                                    }}
                                        className='text-xs m-1 hover:cursor-pointer 
                                    hover:underline'>Block user</p>}
                                    {SureToBlock && <div className='flex'> <p
                                        className='text-xs text-red-600 m-1 '>
                                        are you sure?</p>
                                        <p onClick={() => {
                                            handleBlock(mess.username);
                                        }}
                                            className=' m-1 text-xs hover:cursor-pointer
                                     hover:underline'>Yes</p>
                                        <p className='text-xs text-red-600 m-1 '>/</p>
                                        <p onClick={() => {
                                            setSureToBlock(false);
                                        }}
                                            className=' m-1 text-xs hover:cursor-pointer
                                     hover:underline'>No</p>   </div>}
                                    <p onClick={() => { setUnreadAtIndex(i, true); }}
                                        className={`mx-2 text-xs m-1  hover:cursor-pointer
                                     hover:underline ${mess.unread ? "hidden" : "block"}`}>Mark Unread</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                )
            })}
            {ReportPop && (
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
                        <button className='p-2 bg-[#935226ef] text-white
                                     rounded-full absolute bottom-3 right-4 hover:bg-[#edc6b2] 
                                      hover:text-slate-900 disabled:bg-gray-300 disabled:text-white'
                            disabled={DisableNext}>
                            Next</button>
                        <div>{ReportDes}</div>
                    </div>
                </div>
            )}
            {DoneReportPop && (
                <div className="fixed inset-0 flex items-center 
                            justify-center bg-gray-800 bg-opacity-50">
                    <div className={`bg-white p-3 w-full sm:w-[500px] relative rounded shadow-md
                    ${selectedButton === null ? " sm:h-[375px] h-[500px]" : "sm:h-[500px] h-[600px]"}`}>
                        <h2 className="text-lg font-semibold mb-4">Submit
                            a Report
                        </h2>
                        <X onClick={() => { setDoneReportPop(false); setUserToReport(''); }}
                            size={20} className=' text-gray-400 absolute top-4 right-4 
                            hover:cursor-pointer hover:text-black' />
                        <BadgeCheck />
                        <p>Thanks for your report </p>
                        <p className="text-gray-700 text-xs mb-2">
                            Thanks again for your report and for looking out for
                            yourself and your fellow. Your reporting
                            helps make Fox a better, safer, and more welcoming place
                            for everyone; and it means a lot to us.
                        </p>
                        <hr />
                        <UserRoundX />
                        <p>Block Feeling-Abrocoma-862</p>
                        <p>You won't be able to send direct messages or chat requests to each other.</p>
                        <Switch
                            checked={BlockedUserInRep}
                            onChange={() => handleBlock(UserToReport)}
                            className={`${BlockedUserInRep ? 'bg-blue-700' : 'bg-gray-300'}
                                                    relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full
                                                     border-2 border-transparent transition-colors duration-200 ease-in-out 
                                                     focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
                            <span
                                aria-hidden="true"
                                className={`${BlockedUserInRep ? 'translate-x-4' : 'translate-x-0'}
                                                        pointer-events-none inline-block h-5 w-5 transform rounded-full
                                                         bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                        </Switch>
                        <hr />
                        <br />
                        <button className='p-2 bg-[#935226ef] text-white
                                     rounded-full absolute bottom-3 right-4 hover:bg-[#edc6b2] 
                                      hover:text-slate-900 disabled:bg-gray-300 disabled:text-white'>
                            Done</button>
                        <div>{ReportDes}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostReplies