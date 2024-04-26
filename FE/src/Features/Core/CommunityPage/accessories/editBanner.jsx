import React, { useState, useRef } from "react";
import { X, ChevronDown, ChevronRight, ChevronLeft, CloudUpload, Trash2 } from "lucide-react";

export default function EditModal({ onClose = () => { }, optionheader = "Community appearance" }) {
    const handleClose = () => {
        onClose();
    };
    const [isShifted, setIsShifted] = useState(false);
    const [OptionHeader, setOptionHeader] = useState(optionheader);

    const editOptions = [
        "Avatar",
        "Banner",
    ];
    const handleShift = () => {
        setIsShifted(!isShifted);
    };

    const [dragging, setDragging] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef();

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setImageFile(e.dataTransfer.files[0]);
        }
    };

    const submitImage = () => {
        //backend call to upload image
    };

    return (
        <div className={`z-40 fixed p-4 pb-6 md:w-[382px] w-screen bg-white border border-opacity-10 border-black rounded-xl bottom-0 left-16 shadow-2xl transition duration-500 ease-in-out transform ${isShifted ? (() => { switch(OptionHeader) {case "Avatar": case "Banner": return "translate-y-48"; default: return "translate-y-32"} })() : ''} overflow-hidden max-h-[1000px] h-fit`}>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {(OptionHeader != "Community appearance" && !isShifted) ? <button onClick={() => { setImageFile(null); setOptionHeader("Community appearance"); }} className="p-2 rounded-full hover:bg-gray-300 bg-gray-200">
                        <ChevronLeft className={`${isShifted ? "rotate-180" : ""} w-4 h-4`} /></button> : <></>}
                    <span className="text-lg ml-2 font-bold">{OptionHeader}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <button onClick={handleShift} className="p-2 rounded-full hover:bg-gray-300 bg-gray-200">
                        <ChevronDown className={`${isShifted ? "rotate-180" : ""} w-4 h-4`} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-300 bg-gray-200" onClick={handleClose}>
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <hr className="my-4 mx-2 border-gray-400" />
            {OptionHeader === "Community appearance" ? (
                <div className="flex flex-col gap-2">
                    {editOptions.map((option, index) => (
                        <button key={index} onClick={() => setOptionHeader(option)} className="text-sm rounded-lg flex justify-between p-2 hover:bg-gray-200">
                            <span>{option}</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    ))}
                </div>
            ) : (
                (() => {
                    switch (OptionHeader) {
                        case "Avatar":
                        case "Banner":
                            return <div className="flex flex-col gap-2 items-center justify-center"><div className={`${imageFile ? 'bg-white' : 'p-1 bg-gray-200'} w-full rounded-2xl h-36 ${dragging ? 'border-blue-500' : 'border-gray-500'}`} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleClick}>
                                {!imageFile ? (
                                    <div>
                                        <CloudUpload className="w-6 mt-10 mx-auto text-gray-400" />
                                        <p className="text-gray-400 text-sm mx-auto text-center">Drag and drop or click to upload</p>
                                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} style={{ display: 'none' }} />
                                    </div>)
                                    : (<img src={URL.createObjectURL(imageFile)} alt="uploaded" className={`mx-auto object-cover ${OptionHeader == "Avatar" ? "rounded-full w-36 h-36" : "rounded-2xl w-full h-full"}`} />)}
                            </div>
                                {imageFile ? <div className="flex mx-auto gap-2 justify-between">
                                    <button onClick={() => setImageFile(null)} className="bg-gray-200 mt-3 text-sm px-2 py-1 mx-auto w-fit rounded-full hover:bg-gray-300"><Trash2 className="w-4 h-4" /></button>
                                    <button onClick={() => setImageFile(null)} className="bg-gray-200 mt-3 text-sm px-2 py-1 mx-auto w-fit rounded-full hover:bg-gray-300">Submit</button></div> : <></>}
                            </div>;
                        default:
                            return <div>Default content</div>;
                    }
                })()
            )}
        </div>
    );
}