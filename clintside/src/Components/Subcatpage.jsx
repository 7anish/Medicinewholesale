import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Url from '../../Url'
const Subcatpage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [catdata, setcatdata] = useState([])
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchcat = async () => {
            setloading(true)
            try {
                const { data } = await axios.get(`${Url}/api/v1/med/getcategory?category=${params.id}`)
                setcatdata(data)
                setloading(false)
            } catch (e) {
                seterror(true)
                setloading(false)
            }
        }
        fetchcat()
    }, [])

    const handleclick = (route) => {
        if (route.split("/")[1] == "all") {
            navigate(`/products?category=${route.split("/")[0]}&page=1`)
        }
        else {
            navigate(`/products?category=${route.split("/")[0]}&subcategory=${route.split("/")[1]}&page=1`)
        }
    }
    if (error) {
        return (
            <div className="w-full h-fit rounded-3xl flex flex-col justify-between items-center py-7 px-4">
                <div className="w-full h-[20%] flex flex-col justify-center items-center">
                    <h1 className="font-palyfair text-2xl md:text-4xl lg:text-5xl font-bold text-green-600" data-aos="fade-up"><span className="text-4xl md:text-5xl lg:text-6xl">S</span>hop By Category</h1>
                </div>
                <h1 className='text-3xl font-bold font-poppins text-center py-20 text-green-600'>Error in fetchin Category !!!</h1>
            </div>
        )
    }
    return (
        loading ?
            (
                <div className="w-full h-fit rounded-3xl flex flex-col justify-between items-center py-7 px-4">
                    <div className="w-full h-[20%] flex flex-col justify-center items-center">
                        <h1 className="font-palyfair text-2xl md:text-4xl lg:text-5xl font-bold text-green-600" data-aos="fade-up"><span className="text-4xl md:text-5xl lg:text-6xl">S</span>hop By Category</h1>
                        <div className='my-20 flex items-center justify-center'>
                            <div class="w-16 h-16 rounded-full animate-spin 
                    border-x-4 border-solid border-green-500 border-t-transparent"></div>
                        </div>
                    </div>
                </div>
            )
            :
            <div className="w-full h-fit rounded-3xl flex flex-col justify-between items-center py-7 px-4">
                <div className="w-full h-[20%] flex flex-col justify-center items-center">
                    <h1 className="font-palyfair text-2xl md:text-4xl lg:text-5xl font-bold text-green-600" data-aos="fade-up"><span className="text-4xl md:text-5xl lg:text-6xl">S</span>hop By Category</h1>
                </div>
                {
                    catdata?.map((item) => {
                        return (
                            <>
                                <h1 className="w-full text-center md:text-left sm:px-16 font-palyfair text-2xl md:text-3xl lg:text-3xl  font-bold text-black capitalize" data-aos="fade-up" id={item.category}>{(item.category).split('-').join(' ')}</h1>
                                <div className='w-full h-fit   flex flex-wrap items-center justify-center sm:justify-start gap-4 p-4 sm:p-2 mb-5  sm:pl-20' id='services'>
                                    {
                                        item.subcat.map((subitem, index) => {
                                            return (
                                                <div key={index} className={`rounded-xl cursor-pointer flex flex-col flex-wrap items-center  justify-center p-3 hover:scale-105 duration-300 bg-blue-200`} onClick={() => handleclick(subitem.route)}>
                                                    <div className='w-[110px] sm:w-[200px] h-[80px] flex flex-col  justify-between items-center gap-2'>
                                                        <ion-icon name={subitem.icon} class='text-3xl xl:text-4xl'></ion-icon>
                                                        <h1 className='text-xl font-semibold text-center capitalize'>{(subitem.name).split('-').join(' ')}</h1>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </div>
    )
}

export default Subcatpage
