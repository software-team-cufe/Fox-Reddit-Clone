import {AiOutlineDown,AiOutlineUp} from "react-icons/ai"
import react, { useState } from "react";

export default function Dropdown(){
    const [open, setOpen] = useState(false);
    let obj = 0 ;
    const changeButtonVal =(val,boool) => {
        switch(val){
            case 0:
                obj = 0;
                if(boool){
                    return "Hot"
                }
                break;
            case 1:
                obj = 1;
                if(boool){
                    return "New"
                }
                break;
            case 2:
                obj = 2;
                if(boool){
                    return "Rising"
                }
                break;
            case 3:
                obj = 3;
                if(boool){
                    return "Top"
                }
                break;
            default:
                if(boool){
                    return "Hot"
                }
                return;
        }
    }

    return(
        <div>
            <button
                onClick={() => setOpen(!open)}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-blue-500 dark:text-blue-500 w-auto font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                items-center bg-transparent dark:bg-transparent rounded-3xl inline-block justify-between"
                type="button">
                    {/** `${changeButtonVal(obj,true)}`*/}
                    hot
                    {!open ? <AiOutlineDown className=" inline-block"/> : <AiOutlineUp className=" inline-block"/>} 
            </button>
            {open && (
                <div className="relative text-blue-500 dark:text-blue-500 w-auto font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                items-center bg-transparent dark:bg-transparent rounded-3xl inline-block">
                    <ul className="absolute">
                        <li className="relative border border-block px-4" onClick={changeButtonVal(0,false)}>Hot</li>
                        <li className="relative border border-block px-4" onClick={changeButtonVal(1,false)}>New</li>
                        <li className="relative border border-block px-4" onClick={changeButtonVal(2,false)}>Rising</li>
                        <li className="relative border border-block px-4" onClick={changeButtonVal(3,false)}>Top</li>
                    </ul>
                </div>
            )}

        </div>
    )
}