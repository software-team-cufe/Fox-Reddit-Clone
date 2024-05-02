import React, {useState, useEffect} from "react"
import {Newspaper} from "lucide-react";
import RemovalForm from "./removalForm";
import {userAxios} from "@/Utils/UserAxios";
import {useParams} from "react-router-dom";

/**
 * Renders the Removal Page component.
 *
 * @returns {JSX.Element} The Removal Page component.
 */
export default function RemovalPage() {
    const [Removal, setRemoval] = useState([]);
    const [ShowForm, setShowForm] = useState(false);
    const [Editing, setEditing] = useState(false);
    const [Number, setNumber] = useState(0);
    const [loading, setLoading] = useState(true);
    const {community} = useParams();
    const [crash, setCrash] = useState(false);

    useEffect(() => {
        userAxios.get(`${community}/api/removal_reasons`)
        .then(response => {
          const newrules = response.data.rules.map(rule => ({
            title : rule.title,
            Message : rule.description,
          }));
          setRemoval(newrules);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setCrash(true);
          setLoading(false);
        })
      }, []);

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
        <p className="text-gray-600 font-semibold">Failed to load page</p>
        </div>
    )
    }

    return (
        <div>
            {ShowForm && <RemovalForm onClose={setShowForm} index={Number} list={Removal} setlist={setRemoval} editing={Editing} removal={Removal[Number]}/>}
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