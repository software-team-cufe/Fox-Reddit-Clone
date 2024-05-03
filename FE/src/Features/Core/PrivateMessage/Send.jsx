import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify'
import { userAxios } from "@/Utils/UserAxios";
function Send() {
    const [Username, setUsername] = useState('user');
    const [NoUser, setNoUser] = useState(false);
    const [MessageValue, setMessageValue] = useState('');
    const [EmptyUser, setEmptyUser] = useState(false);
    const [EmptySub, setEmptySub] = useState(false);
    const [EmptyMess, setEmptyMess] = useState(false);
    const [ReceiverValue, setReceiverValue] = useState('');
    const [SubValue, setSubValue] = useState('');

    const [ToolBar, setToolBar] = useState([['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'direction': 'rtl' }],                         // text direction
    ])

    const handleSend = async () => {
        setEmptyMess(false);
        setEmptySub(false);
        setEmptyUser(false);
        if (ReceiverValue.length === 0) {
            setEmptyUser(true);
            return;
        }
        else setEmptyUser(false);
        if (SubValue.length === 0) {
            setEmptySub(true);
            return;
        }
        else
            setEmptySub(false);

        if (MessageValue.length === 0) {
            setEmptyMess(true);
            return;
        }
        else {
            setEmptyMess(false);
            console.log('true mess')
        }

        try {
            //Check if the user exists
            const res = await userAxios.get(`/api/username_available?username=${ReceiverValue}`);
            if (!(res.data === "Available")) {

            }
            else
                setNoUser(true);
        } catch (error) {
            // console.log(error.res.data)
            setNoUser(false);
            const newMess = {
                subject: SubValue, text: MessageValue,
                toUsername: ReceiverValue
            }
            const send = await userAxios.post('message/compose/',
                newMess);
            console.log('after send')
            console.log(send)
            toast.success("Your message was sent successfully");
            setMessageValue('');
            setSubValue('');
            setReceiverValue('');
        }
    }


    return (
        <div className=' flex bg-[#0f080416] h-[650px]'>
            <div className='m-2 rounded-xl w-full sm:ml-24 bg-[#fff6f1] p-4 sm:min-w-max'>
                <div className='text-lg my-2'>from</div>
                <div className='text-lg my-2 font-bold border 
                w-full p-2 rounded bg-white '>{Username}</div>

                <div className='text-lg my-2 mt-5 '>to</div>
                {/* check if user exsits */}
                <input value={ReceiverValue}
                    onChange={() => { setReceiverValue(event.target.value) }}
                    type="text" className='text-lg font-bold
                 border w-full p-2 rounded focus:outline-none
                  focus:border-black ' placeholder='Username' />
                {NoUser &&
                    <p className='text-sm text-red-500'>
                        that user doesn't exist</p>}
                {EmptyUser &&
                    <p className='text-sm text-red-500'>
                        Please enter a username</p>}

                <div className='text-lg my-2 mt-5 '>Subject</div>
                <input value={SubValue} onChange={() => { setSubValue(event.target.value) }}
                    className=' border w-full p-2 
                 rounded focus:outline-none focus:border-black' type="text" />
                {EmptySub && <p className='text-sm text-red-500'>
                    Please enter a subject</p>}

                <div className='text-lg my-2 mt-5 '>Message</div>
                <ReactQuill
                    value={MessageValue}
                    onChange={(value) => { setMessageValue(value) }}
                    modules={{
                        toolbar: {
                            container: ToolBar
                        },
                    }}
                />
                {EmptyMess &&
                    <p className='text-sm text-red-500'>
                        Please enter a message</p>}
                <button onClick={handleSend}
                    className='text-lg my-2 mt-5 rounded-full border bg-[#935226dc] 
                 text-white hover:bg-[#edc6b2] hover:text-slate-900 p-4'>
                    Send</button>
            </div>
            <div className='w-full h-max sm:block hidden mx-24'>
                <div className='  h-12 mt-3  bg-[#935226dc] 
                 text-white py-3 px-6 rounded-lg'>Rulses</div>
                <div className='  h-full mt-3 bg-[#fff6f1] 
                 text-black py-3 px-6 rounded-lg'>
                    <p className='my-1 text-lg 
                     '> 1. Remember the human</p>
                    <hr className='w-[90%] mx-4' />
                    <p className='my-1 text-lg 
                    '> 2. Respect the privacy of others</p>
                    <hr className='w-[90%] mx-4' />
                    <p className='my-1 text-lg 
                     '> 3. Do not share or encourage the sharing of sexual, abusive,
                        or suggestive content involving minors.</p>
                    <hr className='w-[90%] mx-4' />
                    <p className='my-1 text-lg 
                    '> 4. Keep it legal, and avoid posting illegal
                        content or soliciting or facilitating
                        illegal or prohibited transactions.</p>
                    <hr className='w-[90%] mx-4' />
                    <p className='my-1 text-lg 
                    '> 5. Don’t break the site or do
                        anything that interferes with normal
                        use of Fox.
                    </p>
                    <hr className='w-[90%] mx-4' /></div>
            </div>

        </div>
    )
}

export default Send