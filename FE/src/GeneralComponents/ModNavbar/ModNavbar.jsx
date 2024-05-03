import React from 'react'
import { modNavbarItems } from './items'
import { Link, useParams, useSearchParams } from 'react-router-dom'

export default function ModNavbar() {
    const params = useParams();
    console.log(params);
    return (
        <div className='p-4'>
            {
                modNavbarItems.map((e, idx) => <div key={idx}>
                    <p className=' text-sm font-semibold '>{e.collectionName}</p>
                    <div className='my-4 pl-4'>
                        {
                            e.items.map((x, index) =>
                                <Link className='flex px-4 py-3 hover:bg-gray-200 rounded-md text-gray-500 items-center gap-2' key={index} to={`/r/${params.community}/about${x.link}`}>
                                    <x.icon className=' text-inherit'/>
                                    <p className=' text-inherit'>{x.name}</p>
                                </Link>)
                        }
                    </div>
                </div>)
            }
        </div>
    )
}
