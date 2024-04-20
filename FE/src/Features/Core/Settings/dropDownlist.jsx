/**
 * 
 * dropDownList is a functional component that renders the drop down list. 
 * 
 */


import React from "react";
import {AiOutlineDown,AiOutlineUp} from "react-icons/ai"
import react, { useState , useEffect , useRef } from "react";
import { ArrowsUpFromLine, BadgePlus, CircleArrowOutUpLeft, Flame, GalleryThumbnails, Rows2, Rows4 } from "lucide-react";

export default function Dropdown({secondOrFirst}){
    const [open, setOpen] = useState(false);
    const [item,setItem] = useState(secondOrFirst == 1 ? "Hot" : "card");

    function useOnClickOutside(ref, handler) {
        React.useEffect(() => {
            const listener = event => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
    
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
    
            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        }, [ref, handler]);
    }
    
    // In your component
    const ref = useRef();
    
    useOnClickOutside(ref, () => setOpen(false));
    
    
if(secondOrFirst == 1){
    return(
        <div ref={ref} className="item-center text-center">
            <button
                onClick={() => setOpen(!open)}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-blue-500 dark:text-blue-500 mr-2 w-auto font-medium rounded-lg text-sm px-7 py-1.5 w-32
                bg-transparent dark:bg-transparent mb-2" // Added mb-2 for a small gap
                type="button">
                    {/** `${changeButtonVal(obj,true)}`*/}
                    {`${item}`}
                    {!open ? <AiOutlineDown/> : <AiOutlineUp/>} 
            </button>
            {open && (
               <div className="relative mr-2 text-blue-500 z-60 dark:text-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
               items-center bg-transparent dark:bg-transparent rounded-3xl inline-block">
                   <ul className="">
                        <li onClick={()=>setItem("Hot")} className="flex flex-col hover:bg-blue-100 items-center cursor-pointer border border-block px-4 py-2"><Flame /><span>Hot</span></li>
                        <li onClick={()=>setItem("New")} className="flex flex-col hover:bg-blue-100 items-center cursor-pointer border border-block px-4 py-2"><BadgePlus /><span>New</span></li>
                        <li onClick={()=>setItem("Rising")} className="flex flex-col hover:bg-blue-100 items-center cursor-pointer border border-block px-4 py-2"><CircleArrowOutUpLeft /><span>Rising</span></li>
                        <li onClick={()=>setItem("Top")} className="flex flex-col hover:bg-blue-100 items-center cursor-pointer border border-block px-4 py-2"><ArrowsUpFromLine /><span>Top</span></li>
                    </ul>
               </div>
            )}
        </div>
    )
}else{
    return(
        <div ref={ref} className="item-center text-center">
            <button
                onClick={() => setOpen(!open)}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-blue-500 dark:text-blue-500 mr-2 w-auto font-medium rounded-lg text-sm px-7 py-1.5
                bg-transparent dark:bg-transparent mb-2" // Added mb-2 for a small gap
                type="button">
                    {/** `${changeButtonVal(obj,true)}`*/}
                    {`${item}`}
                    {!open ? <AiOutlineDown/> : <AiOutlineUp/>} 
            </button>
            {open && (
               <div className="relative mr-2 text-blue-500 z-60 dark:text-blue-500 w-auto font-medium rounded-lg text-sm px-5 py-2.5 text-center 
               items-center bg-transparent dark:bg-transparent rounded-3xl inline-block">
                   <ul className="">
                        <li onClick={()=>setItem("card")} className="flex flex-col hover:bg-blue-100 items-center cursor-pointer border border-block px-4 py-2"><GalleryThumbnails /><span>card</span></li>
                        <li onClick={()=>setItem("classic")} className="flex flex-col hover:bg-blue-100 items-center cursor-pointer border border-block px-4 py-2"><Rows2 /><span>classic</span></li>
                        <li onClick={()=>setItem("compact")} className="flex flex-col hover:bg-blue-100 items-center cursor-pointer border border-block px-4 py-2"><Rows4 /><span>compact</span></li>
                    </ul>
               </div>
            )}
        </div>
    )
}
    
}