import React, { useState } from "react";
import { X } from "lucide-react";

export default function RuleForm({onClose, editing, rule}) {
    const [Rule, setRule] = useState(editing ? rule.title : "");
    const [appliesTo, setAppliesTo] = useState(editing ? rule.appliesTo: "");
    const [reportReason, setReportReason] = useState(editing ? rule.reportReason : "");
    const [description, setDescription] = useState(editing ? rule.description : "");

    const handleRadioChange = (e) => {
        setAppliesTo(e.target.value);
    };

    return (
        <>
            {(
                <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0 ">
                            <div role="createForm" className="relative transform w-80 h-3/4 bg-white rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-[410px] sm:max-w-lg">
                                <div className="bg-white px-3 pb-4 pt-4 sm:pb-4 rounded-full">
                                    <div className="flex justify-between">
                                        <p className="font-medium text-md text-gray-900" id="modal-title">
                                            {!editing ? "Add Rule" : "Edit Rule"}
                                        </p>
                                        <X className="w-5 h-5 text-gray-500 hover:text-black" onClick={() => onClose(false)}/>
                                    </div>
                                    <hr className="my-2 font-light text-gray-900" />
                                    <p className="text-md my-3 mb-1 font-semibold">Rule</p>
                                    <textarea maxLength={100} placeholder='Rule displayed (e.g. "no photos")' className="w-full p-2 h-12 border border-gray-500 border-opacity-25 rounded-md focus:border-blue-500 focus:outline-none" value={Rule} onChange={(e) => setRule(e.target.value)} />
                                    <label className="text-xs my-3 mb-1 text-gray-400 font-semibold">{100 - Rule.length} Characters remaining</label>
                                    <p className="text-md my-3 mb-2 font-semibold">Applies to</p>
                                    <div className="flex flex-col gap-2">
                                        <label className="gap-2 flex text-sm">
                                            <input
                                                type="radio"
                                                name="appliesTo"
                                                value="both"
                                                checked={appliesTo === "both"}
                                                onChange={handleRadioChange}
                                            />
                                            Posts & comments
                                        </label>
                                        <label className="gap-2 flex text-sm">
                                            <input
                                                type="radio"
                                                name="appliesTo"
                                                value="posts"
                                                checked={appliesTo === "posts"}
                                                onChange={handleRadioChange}
                                            />
                                            Posts only
                                        </label>
                                        <label className="gap-2 flex text-sm">
                                            <input
                                                type="radio"
                                                name="appliesTo"
                                                value="comments"
                                                checked={appliesTo === "comments"}
                                                onChange={handleRadioChange}
                                            />
                                            Comments only
                                        </label>
                                        <p className="text-md mt-4 font-semibold">Report reason</p>
                                        <p className="text-xs text-gray-800 -mt-1 font-medium">defaults to rule name if blank</p>
                                        <textarea maxLength={100} placeholder='Reason rule is broken (e.g. "this is a photo")' className="w-full p-2 h-12 border border-gray-500 border-opacity-25 rounded-md focus:border-blue-500 focus:outline-none" value={reportReason} onChange={(e) => setReportReason(e.target.value)} />
                                        <label className="text-xs mb-1 text-gray-400 font-semibold">{100 - reportReason.length} Characters remaining</label>

                                        <p className="text-md mt-4 font-semibold">Full description</p>
                                        <textarea maxLength={500} placeholder='Rule displayed (e.g. "no photos")' className="w-full p-2 h-28 border border-gray-500 border-opacity-25 rounded-md focus:border-blue-500 focus:outline-none" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        <label className="text-xs mb-1 text-gray-400 font-semibold">{500 - description.length} Characters remaining</label>

                                        <div className="flex justify-between mt-4 p-3 h-16 -mx-3 -mb-4 rounded-b-lg bg-gray-200">
                                            {editing ? <button className="ml-2 text-red-500 font-semibold hover:text-red-600" onClick={() => onClose(false)}>Delete</button> : <div></div>}
                                            <div className={`flex gap-3`}>
                                                <button className="p-2 px-4 font-bold text-sm border border-opacity-75 border-gray-600 rounded-full hover:border-black" onClick={() => onClose(false)}>Cancel</button>
                                                <button className="p-2 px-4 font-bold text-sm rounded-full enabled:hover:bg-blue-500 enabled:bg-blue-600 text-white bg-gray-400" disabled={Rule.length == 0 || reportReason.length == 0 || appliesTo == "" || description.length == 0}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}