
import ToggleButton from "@/GeneralElements/ToggleButton/ToggleButton";

export default function FeedSettings() {
    return (
        <div className="w-[75%]">
            <h1 className=" font-semibold text-xl">
                Feed settings
            </h1>

            <div>
                <p className="text-xs text-gray-500 mt-9 mb-1">CONTENT PREFERENCES</p>

                <hr className="w-[70%]" />
                <div className="flex flex-col mt-7 w-3/2">
                    <div className="flex flex-row mb-7 justify-between ">
                        <div>
                            <p>
                                Show mature (18+) content
                            </p>
                            <br />
                            <p className="text-gray-400 text-wrap">
                                See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results.
                            </p>
                        </div>
                        <ToggleButton />

                    </div>

                    <div className="flex flex-row mb-7 justify-between">
                        <div>
                            <p>
                                Blur mature images and media
                            </p>
                            <br />
                            <p className="text-gray-400 text-wrap">
                                Blur previews and thumbnails for any images or videos tagged as NSFW (Not Safe for Work).
                            </p>
                        </div>
                        <ToggleButton />
                    </div>

                </div>
            </div>


            <div>
                <div className="flex flex-col mt-7 w-3/2 ">
                    <div className="flex flex-row mb-7 justify-between">
                        <div>
                            <div>
                                Enable home feed recommendations
                            </div>
                            <div className="text-gray-400 text-wrap">
                                Allow us to introduce recommended posts in your home feed.
                            </div>
                        </div>
                        <div >
                            <ToggleButton />
                        </div>


                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Autoplay media
                        </p>

                        <p className="text-gray-400 text-wrap">
                            Play videos and gifs automatically when in the viewport.
                        </p>
                        <div >
                            <ToggleButton />
                        </div>

                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Reduce Animations
                        </p>
                        <br />
                        <p className="text-gray-400 text-wrap">
                            Reduce animations on posts, comments, and feeds.
                        </p>
                        <div >
                            <ToggleButton />
                        </div>

                    </div>
                    <div className="flex flex-nowrap">
                        <div className="flex flex-row mb-7 flex-wrap">
                            <p>
                                Community themes
                            </p>
                            <br />
                            <p className="text-gray-400 text-wrap">
                                Use custom themes for all communities. You can also turn this off on a per community basis.
                            </p>
                        </div>

                        <div >
                            <ToggleButton />
                        </div>
                    </div>

                    <div className="flex flex-nowrap">
                        <div className="flex flex-row mb-7 flex-wrap">
                            <p>
                                Community content sort
                            </p>
                            <br />
                            <p className="text-gray-400 text-wrap">
                                Choose how you would like content organized in communities you visit. This will not affect global feeds such as Home, or Popular.
                            </p>
                        </div>

                        <div >
                            <ToggleButton />
                        </div>
                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Username mentions
                        </p>
                        <div >
                            <ToggleButton />
                        </div>

                    </div>

                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            New followers
                        </p>
                        <div >
                            <ToggleButton />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-xs text-gray-500 mt-9 mb-1">NEWSLETTERS
                </p>

                <hr className="w-[70%]" />
                <div className="flex flex-col mt-7 w-3/2">
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Daily Digest
                        </p>
                        <div >
                            <ToggleButton />
                        </div>


                    </div>

                </div>
            </div>

            <div>
                <hr className="w-[70%]" />
                <div className="flex flex-col mt-7 w-3/2">
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Unsubscribe from all emails
                        </p>
                        <div >
                            <ToggleButton />
                        </div>


                    </div>


                </div>
            </div>

        </div>)
}