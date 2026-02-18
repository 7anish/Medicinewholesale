import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import Url from '../../Url';
import { useNavigate } from 'react-router-dom';

const Searchbar = ({ data, fun }) => {
    const navigate = useNavigate()
    const [Search, setsearch] = useState("")
    const [Open, setOpen] = useState(false)

    const filterData = data?.filter((item) => {
        return item.name.toLowerCase().includes(Search.toLowerCase())
    })

    const handlesearch = (e,searchquerry , key) => {
        if ( e.key == "Enter" || key=="anish" ){
            if(!(searchquerry.length == 0)){
                navigate(`/search?search=${searchquerry}`)   
            }
        }
    }
    return (
        <div className='w-full xl:w-fit flex sm:justify-end justify-center' >
            <div className='w-[95%] sm:w-fit relative'>
                <div className='flex items-center justify-between border rounded-2xl border-black   relative'>
                    <input
                        type="text"
                        className='w-[250px] outline-none pl-2 sm:focus:w-[300px] inputwidt rounded-l-2xl'
                        placeholder='Search Products'
                        value={Search}
                        onChange={(e) => setsearch(e.target.value)}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setOpen(false)}
                        onKeyDown={(e)=> handlesearch(e , Search)}
                    />
                    <div className=' bg-gray-200 py-2 px-5 rounded-r-2xl flex justify-end cursor-pointer'  onClick={(e)=>handlesearch(e, Search ,"anish")}>
                    <FaSearch className=' text-green-500 ' size={20}  />
                    </div>
                </div>
                {Open && (
                    Search.length == 0 ? 
                    ""
                    :
                    <div className='w-[300px] h-fit absolute bg-gray-50 top-[100%] rounded-xl py-2 overflow-hidden left-3 z-40 flex flex-col'>
                        {
                            filterData.length === 0 ?
                                ""
                                :
                                filterData.slice(0, 10).map((item, index) => (
                                    <div
                                        key={index}
                                        className={`text-black cursor-pointer p-1 bg-gray-50 hover:bg-gray-200`}
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                            setOpen(false)
                                            navigate(`/search?search=${item.name}`)
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                ))}
                    </div>
                )}
            </div>
        </div>

    )
}

export default Searchbar
