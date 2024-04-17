import React, { useState, useEffect } from 'react'
import TypingArea from './TypingArea'
import ChooseCommunity from './ChooseCommunity'
import "./QuillStyle.css"
import { Smile } from 'lucide-react'
import { Attachment } from '@mui/icons-material'
function CreatePostPage(props) {
    const [SelectedCom, setSelectedCom] = useState({ name: "Choose Community", id: "-1" }); //
    const [ComHasRules, setComHasRules] = useState(false);
    const [ShowComCard, setShowComCard] = useState(false);
    //poll options to be one array before sent to back 
    const [Poll1, setPoll1] = useState("");             //
    const [Poll2, setPoll2] = useState("");               // 
    const [Poll3, setPoll3] = useState([]);               //

    //Send to API
    const [ComID, setComID] = useState('');
    const [UserID, setUserID] = useState("DummyUserID");  //To be changed
    const [TitleValue, setTitleValue] = useState('');                          //
    const [PostText, setPostText] = useState('');                                  //
    const [PostURL, setPostURL] = useState('');                               //
    const [NSFW, setNSFW] = useState(false);                                //
    const [Spoiler, setSpoiler] = useState(false);                          //
    const [PostNotifications, setPostNotifications] = useState(false);      //
    const [VideoOrImageSrc, setVideoOrImageSrc] = useState(null);
    const [PollOptions, setPollOptions] = useState([]);                 //ToDo
    const [VoteLength, setVoteLength] = useState(1);                   //

    const updatePollOptions = () => {
        let newOptions = [];
        if (Poll1) newOptions.push(Poll1);
        if (Poll2) newOptions.push(Poll2);
        Poll3.forEach(option => {
            if (option.value) newOptions.push(option.value);
        });
        setPollOptions(newOptions);
    };

    // Call update function when any of the state variables change
    useEffect(() => {
        updatePollOptions();
    }, [Poll1, Poll2, Poll3]);

    let ComId = SelectedCom.id;

    const Post = () => {
        if (PostNotifications === "on")
            setPostNotifications(true);
        const NewPost = {
            title: { TitleValue },
            text: { PostText }, attachments: [VideoOrImageSrc], spoiler: { Spoiler },
            CommunityID: { ComId }, nsfw: { NSFW }, userId: { UserID }, url: { PostURL },
            isNotifications: { PostNotifications }, voteLength: { VoteLength }, pollOptions: { PollOptions }
        }
        console.log(NewPost);
    }

    useEffect(() => {
        if (SelectedCom.rules)
            setComHasRules(true)
        else
            setComHasRules(false);

        if (SelectedCom.name === "Choose Community")
            setShowComCard(false);
        else
            setShowComCard(true);

    }, [SelectedCom])

    return (
        <div className='bg-gray-300 ' id="parentElement">
            <div className='flex'>
                <div className='lg:w-[60%] w-full md:ml-40  '>
                    <div className='h-12'></div>
                    <p className='text-xl m-1 '>Create a post</p>
                    <hr className='lg:my-4' />
                    <ChooseCommunity
                        Selected={SelectedCom} setSelected={setSelectedCom}
                        id="ChooseCom" />
                    <TypingArea PostFunc={Post}
                        Poll3={Poll3} SetPoll3={setPoll3}
                        VoteLength={VoteLength} SetVoteLength={setVoteLength}
                        Poll1={Poll1} SetPoll1={setPoll1} Poll2={Poll2} SetPoll2={setPoll2}
                        VideoOrImageSrc={VideoOrImageSrc} SetVideoOrImageSrc={setVideoOrImageSrc}
                        PostNotifications={PostNotifications} SetPostNotifications={setPostNotifications}
                        Spoiler={Spoiler} SetSpoiler={setSpoiler}
                        NFSW={NSFW} SetNFSW={setNSFW}
                        PostURL={PostURL} SetPostURL={setPostURL}
                        PostTitle={TitleValue} SetPostTitle={setTitleValue}
                        PostText={PostText} SetPostText={setPostText} SelectedCom={SelectedCom}
                        className="h-96" id="TypeArea" />
                </div>
                <div className=' LeSS:hidden mt-16 m-2 w-0 md:block md:w-80'>
                    <div className='bg-white rounded my-2'>

                        {ComHasRules &&
                            <>
                                <div className='bg-orange-700 px-4 my-1 rounded text-white w-full h-max'>
                                    {SelectedCom.name} Rules
                                </div>
                                {SelectedCom.rules.map((item, index) => (
                                    <>
                                        <p key={index + Math.random()} className='my-1 text-lg 
                           '>{index + 1} . {item}</p>
                                        <hr className='w-[90%] mx-4' />
                                    </>
                                ))} </>}
                    </div>
                    <div className='bg-white p-4 h-max rounded '>
                        <div className='flex'>

                            <img src="logo.png" alt='logo' className='h-8 w-8 mx-2' />
                            <p className='my-1 text-lg font-bold
                            '> Posting to Fox</p>
                        </div>
                        <hr className='w-[90%] mx-4' />
                        <p className='my-1 text-lg 
                            '> 1. Remember the human</p>
                        <hr className='w-[90%] mx-4' />
                        <p className='my-1 text-lg 
                           '> 2. Behave like you would in real life</p>
                        <hr className='w-[90%] mx-4' />
                        <p className='my-1 text-lg 
                            '> 3. Look for the original source of content</p>
                        <hr className='w-[90%] mx-4' />
                        <p className='my-1 text-lg 
                           '> 4. Search for duplicates before posting</p>
                        <hr className='w-[90%] mx-4' />
                        <p className='my-1 text-lg 
                           '> 5. Read the community’s rules</p>
                        <hr className='w-[90%] mx-4' />
                    </div>
                </div>
            </div >
        // </div >
    )
}

export default CreatePostPage