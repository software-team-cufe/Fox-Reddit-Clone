import React, { useState } from 'react'


export default function EmailSetting() {

    const Buttons1 = [{ button1: "Private messages" }, { button1: "Chat requests" },];
    const Buttons2 = [
        { button2: "New user welcome", btnName: "", },
        { button2: "Comments on your posts" },
        { button2: "Replies to your comments" },
        { button2: "Upvotes on your posts" },
        { button2: "Upvotes on your comments" },
        { button2: "Username mentions" },
        { button2: "New followers" },];
    const Buttons3 = [{ button3: "Daily Digest" },]
    const Button4 = [{ button4: "Unsubscribe from all emails" }]

    const [disableButtons, setDisableButtons] = useState(false);
    const handleButton4Click = () => {
        setDisableButtons(!disableButtons);
    };

    const buttonStle1 = Buttons1.map(({ button1 }, idx) => (
        <div className={`flex flex-row mb-7 justify-between ${disableButtons ? 'opacity-50 cursor-not-allowed' : ''}`} key={idx}>
            <div>
                <p>
                    {button1}
                </p>
            </div>
            <div>
                <label className={`relative inline-flex cursor-pointer items-center ${disableButtons ? 'pointer-events-none' : ''}`}>
                    <input type="checkbox" className="peer sr-only" disabled={disableButtons} />
                    <label className="hidden"></label>
                    <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
          peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                </label>
            </div>

        </div>
    ))

    const buttonStle2 = Buttons2.map(({ button2 }, idx) => (
        <div className={`flex flex-row mb-7 justify-between ${disableButtons ? 'opacity-50 cursor-not-allowed' : ''}`} key={idx}>
            <div>
                <p>
                    {button2}
                </p>
            </div>
            <div>
                <label className={`relative inline-flex cursor-pointer items-center ${disableButtons ? 'pointer-events-none' : ''}`}>
                    <input type="checkbox" className="peer sr-only" disabled={disableButtons} />
                    <label className="hidden"></label>
                    <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
        peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                </label>
            </div>

        </div>
    ))

    const buttonStle3 = Buttons3.map(({ button3 }, idx) => (
        <div className={`flex flex-row mb-7 justify-between ${disableButtons ? 'opacity-50 cursor-not-allowed' : ''}`} key={idx}>
            <div>
                <p>
                    {button3}
                </p>
            </div>
            <div>
                <label className={`relative inline-flex cursor-pointer items-center ${disableButtons ? 'pointer-events-none' : ''}`}>
                    <input type="checkbox" className="peer sr-only" disabled={disableButtons} />
                    <label className="hidden"></label>
                    <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
          peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                </label>
            </div>

        </div>

    ))

    const buttonStle4 = Button4.map(({ button4 }, idx) => (<div className={`flex flex-row mb-7 justify-between '}`} key={idx}>
        <div>
            <p>
                {button4}
            </p>
        </div>
        <div>
            <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" onChange={handleButton4Click} />
                <label className="hidden"></label>
                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
      peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
            </label>
        </div>

    </div>

    ))

    return (
        <div>
            <h2 className=" font-semibold text-xl">
                Manage Emails
            </h2>

            <div>
                <p className="text-xs text-gray-500 mt-9 mb-1">MESSAGES</p>
                <hr className="w-[75%]" />
                <div className="flex flex-col mt-7 w-[75%]">
                    <div>
                        {buttonStle1}
                    </div>
                </div>
            </div>

            <div>
                <p className="text-xs text-gray-500 mt-9 mb-1">ACTIVITY</p>
                <hr className="w-[75%]" />
                <div className="flex flex-col mt-7 w-[75%]">
                    {buttonStle2}
                </div>
            </div>

            <div>
                <p className="text-xs text-gray-500 mt-9 mb-1">NEWSLETTERS
                </p>
                <hr className="w-[75%]" />
                <div className="flex flex-col mt-7 w-[75%]">
                    {buttonStle3}
                </div>
            </div>

            <div>
                <hr className="w-[75%]" />
                <div className="flex flex-col mt-7 w-[75%]">

                    {buttonStle4}
                </div>
            </div>

        </div>
    )
}

