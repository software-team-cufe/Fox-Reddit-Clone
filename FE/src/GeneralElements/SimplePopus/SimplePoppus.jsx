import { X } from "lucide-react";
import { useState } from 'react';

function SimplePoppus({ setIsOpenFalse }) {
    const [visiableX, setvisiableX] = useState(false)
    return (
        <div>

            <div className=" flex gap-x-0 gap-y-0 fixed bottom-0 left-1/2 transform -translate-x-1/2 drop-shadow-2xl w-max h-max bg-white rounded-2xl shadow-2xl"
                onMouseEnter={() => { setvisiableX(true); }}
                onMouseLeave={() => { setvisiableX(false); }}
            >

                <div className="bg-orange-500 rounded-l-2xl w-4 h-16 " />
                {visiableX && <button onClick={setIsOpenFalse} type="button" className="p-1 bg-orange-500 mx-0  h-16 text-black bg-transparent hover:bg-gray-200  w-8  justify-center items-center  ">
                    <X color="black" />
                </button>
                }
                <div className="bg-orange-500 h-16  w-4 mx-0  " />

                {/* <h3 className="p-4 text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 ">
                    Add Social Link
                </h3> */}
            </div>


        </div>
        // </div >
    )
}

export default SimplePoppus