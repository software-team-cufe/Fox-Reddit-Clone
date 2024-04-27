import React, { useState } from "react";
import { Pencil, Expand, Minimize } from "lucide-react";

export default function RuleContainer({ index, rule, modal, editing, number }) {
    const [Expanded, setExpanded] = useState(false);

    const setModal = () => {
        modal(true);
        editing(true);
        number(index-1);
    }

    return (
        <div className="my-5">
            <div className="w-full border border-opacity-50 border-gray-400">
                <div className="flex justify-between p-2 border-b border-gray-200">
                    <div className="flex gap-3">
                        <p className="text-lg">{index}</p>
                        <p>{rule.title}</p>
                    </div>
                    <div className="flex gap-3">
                        <Pencil className="w-5 h-5 text-gray-500 hover:text-black" onClick={setModal}/>
                        {Expanded ? <Minimize className="w-5 h-5 text-gray-500 hover:text-black hover:fill-black" onClick={() => setExpanded(false) }/> : <Expand className="w-5 h-5 text-gray-500" onClick={setExpanded}/>}
                    </div>
                </div>
            </div>
            {Expanded && (
                <div className="p-4 border bg-gray-200 border-opacity-50 border-gray-400">
                    <p className="text-xs font-semibold">REPORT REASON</p>
                    <p className="text-xs mb-3 text-gray-800">{rule.description}</p>
                <div className="grid grid-cols-2 mb-3 grid-rows-2">
                    <p className="text-xs font-semibold">APPLIES TO</p>
                    <p className="text-xs font-semibold">CREATED</p>
                    <p className="text-xs text-gray-800">{rule.description}</p>
                    <p className="text-xs text-gray-800">{rule.description}</p>
                </div>
                <p className="text-xs font-semibold">FULL DESCRIPTION</p>
                <p className="text-xs text-gray-800">{rule.description}</p>
                </div>
            )}
        </div>
    )
}