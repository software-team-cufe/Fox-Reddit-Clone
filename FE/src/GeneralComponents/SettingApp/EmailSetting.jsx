import ToggleButton from "@/GeneralElements/ToggleButton";
import Navofsetting from "./navofsetting";
export default function EmailSetting() {
    return (
        <div className="p-40">
            <Navofsetting />
            <h2 className=" font-semibold text-xl">
                Manage Emails
            </h2>

            <div>
                <p className="text-xs text-gray-500 mt-9 mb-1">MESSAGES</p>

                <hr className="w-1/2" />
                <div className="flex flex-col mt-7 w-1/2">
                    <div className="flex flex-row mb-7 justify-between ">
                        <div>
                            <p>
                                Private messages
                            </p>
                        </div>
                        <ToggleButton />

                    </div>

                    <div className="flex flex-row mb-7 justify-between">
                        <div>
                            <p>
                                Chat requests
                            </p>
                        </div>
                        <ToggleButton />
                    </div>

                </div>
            </div>


            <div>
                <p className="text-xs text-gray-500 mt-9 mb-1">ACTIVITY</p>

                <hr className="w-1/2" />
                <div className="flex flex-col mt-7 w-1/2 ">
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            New user welcome
                        </p>
                        <div >
                            <ToggleButton />
                        </div>


                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Comments on your posts
                        </p>
                        <div >
                            <ToggleButton />
                        </div>

                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Replies to your comments
                        </p>
                        <div >
                            <ToggleButton />
                        </div>

                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Upvotes on your posts
                        </p>
                        <div >
                            <ToggleButton />
                        </div>

                    </div>
                    <div className="flex flex-row mb-7 justify-between">
                        <p>
                            Upvotes on your comments
                        </p>
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

                <hr className="w-1/2" />
                <div className="flex flex-col mt-7 w-1/2">
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
                <hr className="w-1/2" />
                <div className="flex flex-col mt-7 w-1/2">
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

        </div>
    );
}