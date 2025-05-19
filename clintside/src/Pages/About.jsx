import React from 'react'
import img from '../assets/pharmacy.png'
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const About = () => {
    return (
        <>
            <div class="sm:flex items-center max-w-screen-xl ">
                <div class="sm:w-1/2 p-10">
                    <div class="image object-center text-center">
                        <img src={img} className='scale-75' />
                    </div>
                </div>
                <div class="sm:w-1/2 p-5">
                    <div class="text">
                        <span class="text-gray-500 border-b-2 border-green-600 uppercase">About us</span>
                        <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">About <span class="text-green-600">Our Company</span>
                        </h2>
                        <p class="text-gray-700">
                            From essential medications to personal care items, we offer the right products for quicker recovery and better well-being. Trust us for quality health care essentials and stay supported on your path to wellness!
                            Lorem ipsum dolor sit amet medicine wholesale, consectetur adipisicing elit. Iure nam unde, itaque quis tempore corporis earum. Nemo quod, dignissimos officia distinctio soluta accusantium mollitia molestiae architecto qui adipisci quaerat nobis? Pariatur dolorum accusantium nesciunt aliquid quisquam neque enim iste velit suscipit, ad nulla in alias odit odio consectetur reprehenderit omnis?
                        </p>
                    </div>
                </div>
            </div>
            <div class="items-center pb-10">
                     <h2 class="w-full text-center font-bold text-3xl  sm:text-4xl">Get In <span class="text-green-600">Touch</span></h2>
                     <p class="w-full text-center text-md font-extralight py-2">Feel Free to contact us? Submit your querries on listed information</p>
                     <div className='w-full h-fit py-5 flex flex-wrap items-center justify-center gap-10 md:gap-20'>
                     <div className='w-[300px] h-[150px] bg-green-100 flex-col gap-3 flex items-center justify-center rounded-2xl text-black'>
                     <IoLocationSharp size={24} />
                     <p className='font-bold text-xl'>Kiet , Ghaziabad</p>
                     </div>
                     <div className='w-[300px] h-[150px] bg-green-500 flex-col gap-3 flex items-center justify-center rounded-2xl text-white'>
                     <FaPhoneAlt size={24} />
                     <p className='font-bold text-xl'>+91 6203821043</p>
                     </div>
                     <div className='w-[300px] h-[150px] bg-green-100 flex-col gap-3 flex items-center justify-center rounded-2xl text-black'>
                     <MdEmail size={24} />
                     <p className='font-bold text-xl'>anissh946@gmail.com</p>
                     </div>
                     </div>
            </div>
        </>
    )
}

export default About
