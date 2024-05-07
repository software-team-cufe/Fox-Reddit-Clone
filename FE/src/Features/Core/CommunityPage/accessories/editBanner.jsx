import React, { useState, useRef } from "react";
import { X, ChevronDown, ChevronRight, ChevronLeft, CloudUpload, Trash2 } from "lucide-react";
import { userAxios } from "@/Utils/UserAxios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Spinner from '@/GeneralElements/Spinner/Spinner';

export default function EditModal({ onClose = () => { }, optionheader = "Community appearance" }) {
    const handleClose = () => {
        onClose();
    };
    const [isShifted, setIsShifted] = useState(false);
    const [OptionHeader, setOptionHeader] = useState(optionheader);
    const { community } = useParams();
    
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
    const [imageDisplay, setImagedisplay] = useState(null);
    const [submittingReq, setSubmittingReq] = useState(false);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file', { position: 'top-center' });
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setImagedisplay(file);
        setImageFile(objectUrl);

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

    const submitImage = async () => {
        setSubmittingReq(true);
        toast.info('Uploading image...', { position: 'top-center' });
        let reqType = "";
        if (OptionHeader == "Avatar") {
            reqType = 'upload_sr_icon';
        }
        else if (OptionHeader == "Banner") {
            reqType = 'upload_sr_banner';
        }
    
        const reader = new FileReader();
        reader.readAsDataURL(imageDisplay);
        reader.onloadend = async function () {
            const base64Image = reader.result;
            try {
                await userAxios.post(`${community}/api/${reqType}`, { image: base64Image })
                    .then(() => {
                        onClose(false);
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } finally {
                setSubmittingReq(false);
            }
        }
    };

    return (
        <div className={`z-40 fixed p-4 pb-6 md:w-[382px] w-screen bg-white border border-opacity-10 border-black rounded-xl bottom-0 left-0 md:left-16 shadow-2xl transition duration-500 ease-in-out transform ${isShifted ? (() => { switch (OptionHeader) { case "Avatar": case "Banner": return "translate-y-48"; default: return "translate-y-32" } })() : ''} overflow-hidden max-h-[1000px] h-fit`}>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {(OptionHeader != "Community appearance" && !isShifted) ? <button id="comAppearanceBackwards" role="comAppearanceBackwards" onClick={() => { setImageFile(null); setOptionHeader("Community appearance"); }} className="p-2 rounded-full hover:bg-gray-300 bg-gray-200">
                        <ChevronLeft className={`w-4 h-4`} /></button> : <></>}
                    <span id="commAppearanceHeader" role="commAppearanceHeader" className="text-lg ml-2 font-bold">{OptionHeader}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <button id="commAppearanceShift" role="commAppearanceShift" onClick={handleShift} className="p-2 rounded-full hover:bg-gray-300 bg-gray-200">
                        <ChevronDown role="commAppearanceSymbolFlip" className={`${isShifted ? "rotate-180" : ""} w-4 h-4`} />
                    </button>
                    <button role="commAppearanceClose" id="commAppearanceClose" className="p-2 rounded-full hover:bg-gray-300 bg-gray-200" onClick={handleClose}>
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <hr className="my-4 mx-2 border-gray-400" />
            {OptionHeader === "Community appearance" ? (
                <div className="flex flex-col gap-2">
                    {editOptions.map((option, index) => (
                        <button id={`commAppearance${option}`} role={`commAppearance${option}`} key={index} onClick={() => setOptionHeader(option)} className="text-sm rounded-lg flex justify-between p-2 hover:bg-gray-200">
                            <span>{option}</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className={`${imageFile ? 'bg-white' : 'p-1 bg-gray-200'} w-full rounded-2xl h-36 ${dragging ? 'border-blue-500' : 'border-gray-500'}`} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleClick}>
                        {!imageFile ? (
                            <div role={`commAppearance${OptionHeader}Upload`}>
                                <CloudUpload className="w-6 mt-10 mx-auto text-gray-400" />
                                <p className="text-gray-400 text-sm mx-auto text-center">Drag and drop or click to upload</p>
                                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} style={{ display: 'none' }} />
                            </div>
                        ) : (
                            <img role={`commAppearance${OptionHeader}Image`} src={imageFile} alt="uploaded" className={`mx-auto object-cover ${OptionHeader == "Avatar" ? "rounded-full w-36 h-36" : "rounded-2xl w-full h-full"}`} />)}
                    </div>
                    {imageFile ? <div className="flex mx-auto gap-2 justify-between">
                        <button onClick={() => setImageFile(null)} className="bg-gray-200 mt-3 text-sm px-2 py-1 mx-auto w-fit rounded-full hover:bg-gray-300" role="commAppearanceBannerRemove" id="commAppearanceBannerRemove"><Trash2 className="w-4 h-4" /></button>
                        <button className="bg-gray-200 mt-3 text-sm px-2 py-1 mx-auto w-fit rounded-full hover:bg-gray-300" onClick={() => submitImage()} role="commAppearanceAvatarSubmit" id="commAppearanceAvatarSubmit">{submittingReq ? <Spinner></Spinner> : "Submit"}</button></div> : <></>}
                </div>)}
        </div>
    );
}