import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import Url from '../../Url';
import { Cookies } from 'react-cookie';


const InstantCheckOut = () => {
    const cookie = new Cookies()
    const[ isprocess, setisprocess ] = useState(false)
    const [paymentSelected, setPaymentSelected] = useState(false)
    const [name , setname]= useState("");
    const [email, setemail]= useState("");
    const [phoneNumber , setphoneNumber] = useState("")
    const navigate = useNavigate()
    const data = JSON.parse(sessionStorage.getItem('instantbuy'))
    
    useEffect(() => {
        try {
            const cartitem = JSON.parse(sessionStorage.getItem('instantbuy'))
            if(cartitem.length === 0){
                navigate('/')
            }else{
                const info = JSON.parse(localStorage.getItem('information')) || {
                    username : "",
                    usermail : "",
                    userphone : ""
                };
                setname(info.username);
                setemail(info.usermail);
                setphoneNumber(info.userphone)
            }

        }catch (e) {
            navigate('/')
        }
    },[])


    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (number) => {
        const re = /^\d{10}$/;
        return re.test(String(number));
    };


    const validatePincode = (number) => {
        const re = /^\d{6}$/;
        return re.test(String(number));
    };

    const checkothers = (value) => {
        return /^(?!\s*$).+/.test(value);
    };


    const handleSubmit = async (e)=>{
        e.preventDefault();
        setisprocess(true)
        const order = JSON.parse(sessionStorage.getItem('instantbuy'))
        const deatails = {
            name : e.target.name.value,
            email : e.target.email.value,
            phoneNumber : e.target.phoneNumber.value,
            address : e.target.address.value,
            city : e.target.city.value,
            pincode : e.target.pincode.value,
            landmark : e.target.landmark.value,
            remark : e.target.remark.value,
            delivery :  data.productpricee > 999 ? "0" : "50",  
            totalPrice : data.productpricee > 999 ? data.productpricee : ((+data.productpricee)+50),
            order : order,
            createdBy :   cookie.get('lgid') || undefined
        }
        if(!checkothers(e.target.name.value)){
            setisprocess(false)
            Swal.fire("plese enter a valid name")
            return
        }
        if (!validateEmail(e.target.email.value)) {
            setisprocess(false)
            Swal.fire("Please enter a valid email address.");
            return;
        }
        if (!validatePincode(e.target.pincode.value)) {
            setisprocess(false)
            Swal.fire("Please enter a valid Pincode");
            return;
        }
        if (!validatePhoneNumber(e.target.phoneNumber.value)) {
            setisprocess(false)
            Swal.fire("Please enter a valid phone number.");
            return;
        }
        if(!checkothers(e.target.address.value)){
            setisprocess(false)
            Swal.fire("Plese enter a Adderss")
            return
        }
        if(!checkothers(e.target.city.value)){
            setisprocess(false)
            Swal.fire("Plese enter a city")
            return
        }
        if (!paymentSelected) {
            setisprocess(false)
            Swal.fire("Please select a payment method")
            return
        }
        try{
            const res = await axios.post(`${Url}/api/v1/med/createorder` , deatails)

            if(res.status == 201){
                setisprocess(false)
                sessionStorage.setItem('cartitem' , JSON.stringify([]))
                Swal.fire({
                    title : "Ordered Placed Sucessfully",
                    icon : 'success'
                }).then(()=>{
                    window.location.href = '/'
                })
                return
            }
            else{
                setisprocess(false)
                Swal.fire({
                    title : "Bad Request",
                    icon : 'error'
                })
            }
        }catch(e){
            setisprocess(false)
            Swal.fire({
                title : "Unable tO place order",
                icon : 'error'
            })
        }
        return
    }
    return (
        <section className="bg-white py-8 antialiased  md:py-16">
            <form className="mx-auto max-w-screen-xl px-4 2xl:px-0" onSubmit={(e) =>handleSubmit(e)}>
                <ol className="items-center flex w-full  text-center text-sm font-medium text-gray-500  sm:text-base">
                    <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 ">
                        <span className="flex items-center after:mx-2 text-yellow-500 after:content-['/']  sm:after:hidden">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Checkout
                        </span>
                    </li>
                    <li className="flex shrink-0 items-center">
                        <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Ordered Completed
                    </li>
                </ol>
                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">Delivery Details</h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                                <div>
                                    <label for="your_name" className="mb-2 block text-sm font-medium text-gray-900 "> Your name* </label>
                                    <input name='name' type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Anish Kumar" required value={name} onChange={(e) => setname(e.target.value)}/>
                                </div>

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Your email* </label>
                                    <input name='email' type="email" id="your_email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="medicalholeshale@gmail.com" required value={email} onChange={(e) => setemail(e.target.value)}/>
                                </div>

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Your Phone Number* </label>
                                    <input type="text" name='phoneNumber' className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="991331xxx" required value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)}/>
                                </div>

                                

                               

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Address* </label>
                                    <input type="text" name='address'  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Muradnagar , Ghaziabad " required />
                                </div>

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> City* </label>
                                    <input type="text" name='city' className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Delhi" required />
                                </div>

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Pincode* </label>
                                    <input type="text" name='pincode' className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="822034" required />
                                </div>

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Landmark</label>
                                    <input type="text" name='landmark' className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Near some famous place"  />
                                </div>
                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Addition Remark </label>
                                    <input type="text" name='remark' className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Remark"  />
                                </div>
                                    
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">Payment Option<span className="text-red-500">*</span></h2>
                            <div className="w-full">
                                <label className={`block w-full rounded-lg border-2 p-4 text-sm cursor-pointer transition-all ${
                                    paymentSelected 
                                        ? 'border-green-500 bg-green-50' 
                                        : 'border-gray-300 bg-gray-50 hover:border-green-300'
                                }`}>
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="checkbox" 
                                            checked={paymentSelected}
                                            onChange={(e) => setPaymentSelected(e.target.checked)}
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                        />
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className={`font-semibold ${
                                            paymentSelected ? 'text-green-700' : 'text-gray-700'
                                        }`}>Cash on Delivery (COD)</span>
                                    </div>
                                    <p className="mt-2 text-gray-600 text-xs ml-7">Pay with cash when your order is delivered</p>
                                </label>
                            </div>
                        </div>

                            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md ">
                                <div className="flow-root">
                                    <div className="-my-3 divide-y divide-gray-200">
                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500 ">Qunatity</dt>
                                            <dd className="text-base font-medium ">{data.quantity}</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500 ">Delivery charges:</dt>
                                            <dd className="text-base font-medium ">₹&nbsp;{data.productpricee > 999 ? "0" : "50"}</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-bold text-gray-900">Total</dt>
                                            <dd className="text-base font-bold text-gray-900">₹&nbsp;{data.productpricee > 999 ? data.productpricee : ((+data.productpricee)+50) }</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 bg-green-600">
                                        {
                                            isprocess ? 
                                            <div className='w-6 h-6 border-r-4 border-white animate-spin rounded-[50%]'></div>
                                            :
                                            "Confirm Your Order"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </form>
                </section>
                )
}

export default InstantCheckOut
