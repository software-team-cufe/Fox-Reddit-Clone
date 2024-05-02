import React, { useState } from "react";
import { Pencil, Expand, Minimize } from "lucide-react";

export default function RuleContainer({ rule, index, modal, editing, trigger}) {
    const [Expanded, setExpanded] = useState(false);

    const setModal = () => {
        modal(true);
        editing(true);
        trigger(index);
    }

    return (
        <div className="my-5">
            <div className="w-full border border-opacity-50 border-gray-400">
                <div className="flex justify-between p-2 border-b border-gray-200">
                    <div className="flex gap-3">
                        <p className="text-lg">{index + 1}</p>
                        <p>{rule.title}</p>
                    </div>
                    <div className="flex gap-3">
                        <Pencil id={`editRule${index}`} data-testid={`editRule${index}`} className="w-5 h-5 text-gray-500 hover:text-black" onClick={setModal}/>
                        {Expanded ? <Minimize id={`impandRule${index}`} data-testid={`impandRule${index}`} className="w-5 h-5 text-gray-500 hover:text-black hover:fill-black" onClick={() => setExpanded(false) }/> : <Expand id={`expandRule${index}`} data-testid={`expandRule${index}`} className="w-5 h-5 text-gray-500" onClick={setExpanded}/>}
                    </div>
                </div>
            </div>
            {Expanded && (
                <div className="p-4 border bg-gray-200 border-opacity-50 border-gray-400">
                    <p className="text-xs font-semibold">REPORT REASON</p>
                    <p role={`ruleReason${index}`} className="text-xs mb-3 text-gray-800">{rule.reason}</p>
                <div className="grid grid-cols-2 mb-3 grid-rows-2">
                    <p className="text-xs font-semibold">APPLIES TO</p>
                    <p className="text-xs font-semibold">CREATED</p>
                    <p role={`ruleApplies${index}`} className="text-xs text-gray-800">{rule.appliesTo}</p>
                    <p role={`ruleTime${index}`} className="text-xs text-gray-800">{rule.createdAt}</p>
                </div>
                <p className="text-xs font-semibold">FULL DESCRIPTION</p>
                <p role={`ruleDisc${index}`} className="text-xs text-gray-800">{rule.description}</p>
                </div>
            )}
        </div>
    )
}