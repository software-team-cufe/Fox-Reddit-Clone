import React, {useState} from "react"
import {Newspaper} from "lucide-react";
import RuleContainer from "./rulecontainer";
import RuleForm from "./ruleForm";

export default function RulesPage() {
    const [Rules, setRules] = useState([
        {
          title: "Rule 1",
          appliesTo: "both",
          reportReason: "Reason 1",
          description: "This is rule 1"
        },
        {
          title: "Rule 2",
          appliesTo: "posts",
          reportReason: "Reason 2",
          description: "This is rule 2"
        },
        {
          title: "Rule 3",
          appliesTo: "comments",
          reportReason: "Reason 3",
          description: "This is rule 3"
        }
      ]);

    const [ShowForm, setShowForm] = useState(false);
    const [Editing, setEditing] = useState(false);
    const [Number, setNumber] = useState(0);

    return (
        <div>
            {ShowForm && <RuleForm onClose={setShowForm} editing={Editing} rule={Rules[Number]}/>}
            <div className="flex justify-end mb-4 gap-3 mr-2">
                <button className="p-2 font-semibold text-sm rounded-full hover:bg-gray-200">Reorder rules</button>
                <button className="p-2 px-4 font-bold text-sm rounded-full hover:bg-blue-500 bg-blue-600 text-white" onClick={()=>{setShowForm(true); setEditing(false);}}>Add rule</button>
            </div>
            {Rules.length == 0 ?
            (
             <div className="text-center mt-32">
                <Newspaper className="w-5 h-5 mb-5 mx-auto text-gray-700"/>
                <p className="text-gray-600 font-semibold">Not rules yet</p>
                </div> 
                ):(
                <>
                {Rules.map((rule, index) => (
                    <RuleContainer key={index} index={index + 1} rule={rule} modal={setShowForm} editing={setEditing} number={setNumber}/>
                ))}
                </>
            )}
        </div>
    )
}