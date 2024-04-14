/**
 * feedSetting is a functional component that renders the feed settings page.
 * 
 * @file feedSetting is a functional component that renders the feed settings page.
 * @module feedSettings
 */
import React, { useEffect, useState } from "react";
import ToggleButton from "@/GeneralElements/ToggleButton/ToggleButton";
import { getByRole } from '@testing-library/react';
import axios from "axios";
// import Dropdown from "./DropDownlist";
/**
 * 
 * Adult content, autoplay media, community themes, community content sort, global content view, open pots in new tab
 */

export default function FeedSettings() {

    //const [communities, setCommunities] = useState([]); // array of communities to show
    const [showMatureContent, setShowMatureContent] = useState(true);//mature toggle view
    // const [loading, setLoading] = useState(true); // loading state for fetching 

    //  useEffect(() => {
    //      axios.get("http://localhost:3500/communities") //fetch communities and organize into communities array for mapping
    //        .then(response => {
    //          const newComms = response.data.map(comm => ({
    //              id: comm.commID,
    //              name: comm.name,
    //              icon: comm.icon,
    //              about: comm.description,
    //              online: comm.onlineMembers,
    //              members: comm.membersCount,
    //              NSFW: comm.NSFW
    //        }));
    //        let tempArr =[];
    //      for (let i = 0; i < newComms.length; i++) {
    //         if(showMatureContent === false){
    //             if (newComms[i].NSFW === false) {
    //                 tempArr.push(newComms[i]);
    //             }
    //         }else{
    //                 tempArr.push(newComms[i]);
    //         }
    //         }
    //      setCommunities(tempArr);
    //      console.log(communities);
    //      //setCommunities(newComms);
    //      //setLoading(false); //set loading to false after fetching to load body
    //     }, []);
    // })

    //state for each setting statement to be toggled
    const [blurMatureImg, setBlurMatureImg] = useState(false);
    const [autoplayMedia, setAutoplayMedia] = useState(false);
    const [communityTheme, setCommunityTheme] = useState(false);
    const [rememberingSortPerCommunity, setRememberingSortPerCommunity] = useState(false);
    const [globalView, setGlobalView] = useState(false);
    const [openPostsInNewTab, setOpenPostsInNewTab] = useState(false);
    const handleToggleInFeedMatureContent = (isChecked) => {
        setShowMatureContent(isChecked);
        console.log(isChecked);
        //console.log(showMatureContent);
    }
    const handleToggleInFeedBlurImage = (isChecked2) => {
        setBlurMatureImg(isChecked2);
        console.log(isChecked2);
        //console.log(BlurMatureImg);
    }
    const handleToggleInFeedAutoplay = (isChecked3) => {
        setAutoplayMedia(isChecked3);
        console.log(isChecked3);
        //console.log(autoplayMedia);
    }
    const handleToggleInFeedCommunityTheme = (isChecked4) => {
        setCommunityTheme(isChecked4);
        console.log(isChecked4);
        //console.log(communityTheme);
    }
    const handleToggleInFeedRememberSort = (isChecked5) => {
        setRememberingSortPerCommunity(isChecked5);
        console.log(isChecked5);
        //console.log(rememberingSortPerCommunity);
    }
    const handleToggleInFeedGlobalView = (isChecked6) => {
        setGlobalView(isChecked6);
        console.log(isChecked6);
        //console.log(globalView);
    }
    const handleToggleInFeedNewTab = (isChecked7) => {
        setOpenPostsInNewTab(isChecked7);
        console.log(isChecked7);
        //console.log(openPostsInNewTab);
    };


    return (
        <div className="w-[75%]">
            <h1 className=" font-semibold text-xl" role="TextOfButtons">
                Feed settings
            </h1>

            <div>
                <p className="text-xs text-gray-500 mt-9 mb-1" role="TextOfButtons">CONTENT PREFERENCES</p>
                <hr className="w-[75%]" />
                <div className="flex flex-col mt-7 w-3/2">
                    <div className="flex flex-row mb-7 justify-between " role="toggleButton">
                        <div>
                            <p role="TextOfButtons">
                                Show mature (18+) content
                            </p>
                            <br />
                            <p className="text-gray-400 text-wrap" role="TextOfButtons">
                                See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results.
                            </p>
                        </div >
                        <ToggleButton onToggle={handleToggleInFeedMatureContent} />
                    </div>

                    <div className="flex flex-row mb-7 justify-between" role="toggleButton">
                        <div>
                            <p role="TextOfButtons">
                                Blur mature images and media
                            </p>
                            <br />
                            <p className="text-gray-400 text-wrap" role="TextOfButtons">
                                Blur previews and thumbnails for any images or videos tagged as NSFW (Not Safe for Work).
                            </p>
                        </div>
                        <ToggleButton onToggle={handleToggleInFeedBlurImage} />
                    </div>

                </div>
            </div>


            <div>
                <div className="flex flex-col mt-7 w-3/2 " role="toggleButton">

                    <div className="flex flex-row flex-wrap mb-7 justify-between">
                        <div role="TextOfButtons">
                            Autoplay media
                        </div>
                        <br />
                        <div className="text-gray-400 text-wrap" role="TextOfButtons">
                            Play videos and gifs automatically when in the viewport.
                        </div>
                        <div role="toggleButton" >
                            <ToggleButton onToggle={handleToggleInFeedAutoplay} />
                        </div>

                    </div>

                    <div className="flex flex-nowrap">
                        <div className="flex flex-row mb-7 flex-wrap" role="TextOfButtons">
                            <p>
                                Community themes
                            </p>
                            <br />
                            <p className="text-gray-400 text-wrap" role="TextOfButtons">
                                Use custom themes for all communities. You can also turn this off on a per community basis.
                            </p>
                        </div>

                        <div role="toggleButton">
                            <ToggleButton onToggle={handleToggleInFeedCommunityTheme} />
                        </div>
                    </div>

                    <div className="flex flex-nowrap">
                        <div className="flex flex-row mb-7 flex-wrap">
                            <p role="TextOfButtons">
                                Community content sort
                            </p>
                            <br />
                            <p className="text-gray-400 text-wrap" role="TextOfButtons">
                                Choose how you would like content organized in communities you visit. This will not affect global feeds such as Home, or Popular.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-nowrap ml-8">
                        <div className="flex flex-row mb-7 flex-wrap">
                            <p role="TextOfButtons">
                                Remember per community
                            </p>
                            <br />
                            <p className="text-gray-400 text-wrap" role="TextOfButtons">
                                Enable if you would like each community to remember and use the last content sort you selected for that community.
                            </p>
                        </div>
                        <div>
                            <ToggleButton onToggle={handleToggleInFeedRememberSort} />
                        </div>
                    </div>

                    <div className="flex flex-row mb-7 flex-nowrap">
                        <div className="flex flex-row flex-wrap">
                            <p role="TextOfButtons">
                                Global content view
                            </p>
                            <br />
                            <p className="text-gray-400 text-wrap" role="TextOfButtons">
                                Choose how you would like content displayed in feeds. This control is also found above your feed.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-nowrap ml-8">
                        <div className="flex flex-row mb-7 flex-wrap">
                            <p role="TextOfButtons">
                                Remember per community
                            </p>
                            <br />
                            <p className="text-gray-400 text-wrap" >
                                Enable if you would like each community to remember and use the last content sort you selected for that community.
                            </p>
                        </div>
                        <div role="TextOfButtons">
                            <ToggleButton onToggle={handleToggleInFeedGlobalView} />
                        </div>
                    </div>

                    <div className="flex flex-row mb-7 justify-between">
                        <div className="flex flex-row justify-between flex-wrap">
                            <div role="TextOfButtons">
                                Open posts in new tab
                            </div>
                            <br />
                            <div className="text-gray-400 text-wrap" role="TextOfButtons">
                                Enable to always open posts in a new tab.
                            </div>
                        </div>
                        <div role="toggleButton">
                            <ToggleButton onToggle={handleToggleInFeedNewTab} />
                        </div>
                    </div>
                </div>
            </div>

        </div>)
}