/**
 * feedSetting is a functional component that renders the feed settings page.
 * 
 * @file feedSetting is a functional component that renders the feed settings page.
 * @module feedSettings
 */
import React from "react";  
import ToggleButton from "@/GeneralElements/ToggleButton/ToggleButton";
import { getByRole } from '@testing-library/react';
import Dropdown from "./dropDownlist";

export default function FeedSettings() {
    return (
        <div className="w-[75%]">
            <h1 className=" font-semibold text-xl" role="TextOfButtons">
                Feed settings
            </h1>

            <div>
                <p className="text-xs text-gray-500 mt-9 mb-1" role="TextOfButtons">CONTENT PREFERENCES</p>

                <hr className="w-[70%]" />
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
                        <ToggleButton />

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
                        <ToggleButton />
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
                            <ToggleButton />
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
                            <ToggleButton  />
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
                        <ToggleButton />
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
                        <ToggleButton />
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
                            <ToggleButton  />
                        </div>
                    </div>
                </div>
            </div>

        </div>)
}