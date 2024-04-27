import React, {useState} from "react"
import {Newspaper} from "lucide-react";
import RuleContainer from "./rulecontainer";
import RemovalForm from "./removalForm";

export default function RemovalPage() {
    const [Removal, setRemoval] = useState([
        {
            title: "No spamming",
            Message: "This is a community for sharing and discussing news related to the stock market. Spamming is not allowed."
        },
        {
            title: "No hate speech",
            Message: "Hate speech is not allowed in this community. This includes racism, sexism, homophobia, and other forms of discrimination."
        }
    ]);

    const [ShowForm, setShowForm] = useState(false);
    const [Editing, setEditing] = useState(false);
    const [Number, setNumber] = useState(0);

    return (
        <div>
            {ShowForm && <RemovalForm onClose={setShowForm} editing={Editing} removal={Removal[Number]}/>}
            <div className="flex justify-end mb-4 gap-3 mr-2">
                <button className="p-2 px-4 font-bold text-sm rounded-full hover:bg-blue-500 bg-blue-600 text-white" onClick={()=>{setShowForm(true); setEditing(false);}}>Add removal reason</button>
            </div>
            {Removal.length == 0 ?
            (
             <div className="text-center mt-32">
                <Newspaper className="w-5 h-5 mb-5 mx-auto text-gray-700"/>
                <p className="text-gray-600 font-semibold">Not removal reasons yet</p>
                </div> 
                ):(
                <>
                {Removal.map((rule, index) => (
                            <div key={index} className="my-5">
                            <div className="w-full border border-opacity-50 border-gray-400">
                                <div className="flex justify-between p-2 border-b border-gray-200">
                                    <div className="flex gap-3">
                                        <p className="font-medium">{index+1}</p>
                                        <p>{rule.title}</p>
                                    </div>
                                    <p onClick={() => {setNumber(index); setShowForm(true); setEditing(true);} } className="text-blue-600 hover:text-blue-500 mr-2 font-semibold cursor-pointer">Edit</p>
                                </div>
                            </div>
                        </div>
                ))}
                </>
            )}
        </div>
    )
}