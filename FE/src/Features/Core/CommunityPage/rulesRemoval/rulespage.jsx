import React, {useEffect, useState} from "react"
import {Newspaper} from "lucide-react";
import RuleContainer from "./rulecontainer";
import RuleForm from "./ruleForm";
import { useParams } from "react-router-dom";
import { userAxios } from "@/Utils/UserAxios";

export default function RulesPage() {

  const {community} = useParams();
  const [loading, setLoading] = useState(true);
  const [crash, setCrash] = useState(false);

  useEffect(() => {
    userAxios.get(`${community}/api/rules`)
    .then(response => {
      const newrules = response.data.rules.map(rule => ({
        title : rule.title,
        description : rule.description,
        reason : rule.reason,
        appliesTo : 'both',
        createdAt : rule.createdAt,
      }));
      setRules(newrules);
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      setCrash(true);
      setLoading(false);
    })
  }, []);

    const [Rules, setRules] = useState([]);
    const [ShowForm, setShowForm] = useState(false);
    const [Editing, setEditing] = useState(false);
    const [trigger, setTrigger] = useState(0);

    if(loading){
      return (
        <div role="communitypage" className="w-100 h-100 flex flex-col items-center justify-center">
          <img src={'/logo.png'} className="h-20 w-20 mt-48 mx-auto animate-ping" alt="Logo" />
        </div>
      )
    }

    if(crash){
      return (
          <div role="communitypage" className="w-100 h-100 flex flex-col items-center justify-center">
          <img src={'/snooNotFound.jpg'} className="h-96 w-96 mt-20 mx-auto" alt="Logo" />
          <p className="text-gray-600 mx-auto font-semibold">Failed to load page</p>
          </div>
      )
      }

    return (
        <div>
            {ShowForm && <RuleForm onClose={setShowForm} index={trigger} setlist={setRules} list={Rules} editing={Editing} rule={Rules[trigger]}/>}
            <div id="rulePageSectionBar" role="rulePageSectionBar" className="flex justify-end mb-4 gap-3 mr-2">
                <button id="arrangeRulesButton" role="arrangeRulesButton" className="p-2 font-semibold text-sm rounded-full hover:bg-gray-200">Reorder rules</button>
                <button id="addRuleButton" role="addRuleButton" className="p-2 px-4 font-bold text-sm rounded-full hover:bg-blue-500 bg-blue-600 text-white" onClick={()=>{setShowForm(true); setEditing(false);}}>Add rule</button>
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
                    <RuleContainer key={index} rule={rule} index={index} modal={setShowForm} editing={setEditing} trigger={setTrigger}/>
                ))}
                </>
            )}
        </div>
    )
}