
export default function SorryDiv({ message="" }) {


    return (
        <div className='text-center px-4 w-100 h-64 flex flex-col items-center justify-center'>
            <h6>{message}</h6>
        </div>
    )
}
