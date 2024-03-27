import React from 'react'

function Profileicon({ imageSrc, altText, isOnline }) {
    return (
        <div className='w-fit h-fit' style={{ position: 'relative' }}>
            <img className='w-10 h-10 mt-2 rounded-full ' src={imageSrc} alt={altText} />
            {isOnline && (
                <div className="border absolute m-[1px] border-white bg-green-400 rounded-full h-2 w-2 right-[1px] bottom-1" />
            )}
        </div>
    );
}
//mmm
export default Profileicon