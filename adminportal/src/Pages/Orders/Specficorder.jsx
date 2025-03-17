import React, { useState, useEffect } from 'react'
import Url from '../../../Url';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Cookies } from 'react-cookie';

const Specficorder = () => {
  const cookie = new Cookies()
  const params = useParams()
  const [re, setre] = useState(true)
  const [order, setorder] = useState([])
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(false)
  useEffect(() => {
    setloading(true)
    const fetchdata = async () => {
      try {
        const { data } = await axios.get(`${Url}/api/v1/med/getorder/${params.id}`,
          {
            headers: {
              "Authorization": "Bearer " + cookie.get('lgthusr')
            }
          }
        )
        setloading(false)
        setorder(data)
      } catch (e) {
        setloading(false)
        seterror(true)
      }
    }
    fetchdata()
  }, [re])


  const handleupdate = async (status) => {
    const products = order?.orders?.map((item) => {
      return {
        id: item.productId._id,
        quantity: item.quantity
      }
    })
    try {
      const res = await axios.patch(`${Url}/api/v1/med/upadateorder/${params.id}`, {
        status: status,
        products: products
      },
        {
          headers: {
            "Authorization": "Bearer " + cookie.get('lgthusr')
          }
        }
      )

      if (res.status == 200) {
        Swal.fire({
          title: "Ordered Upadeted Sucessfully",
          icon: "success"
        })
        setre(!re)
        return;
      } else {
        Swal.fire({
          title: "Error In Updating Order",
          icon: "error"
        });
        return
      }
    } catch (e) {
      Swal.fire({
        title: "Error In Updating Order",
        icon: "error"
      });
    };
  }

  if (loading) {
    return (
      <div className="absolute right-0 top-[8vh]  md:w-[80vw] h-[90vh]  add-product-container p-4 sm:p-6 lg:p-8  shadow-md rounded-md ">
        <div className='w-full h-full flex items-center justify-center'>
          <div className="w-16 h-16 rounded-full animate-spin  border-x-4 border-solid border-gray-500 border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-4 absolute top-[8vh] w-[79vw] right-0'>
        <div className='w-full h-full flex items-center justify-center'>
          <h1>Error in Featching Products</h1>
        </div>
      </div>
    )

  }


  return (
    <div className="absolute right-0 top-[8vh] w-full  md:w-[80vw] h-fit  add-product-container p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl lg:text-3xl font-bold mb-4"></h1>
      <div className="w-full h-fit p-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-700 border border-gray-500 overflow-scroll scrollbar">
          <tr className='border border-gray-500'>
            <th scope="col" colSpan={4} className="px-6 py-3 border border-gray-500 text-center text-xl text-black text-wrap">
              Order Details
            </th>
          </tr>
          <tr className='border border-gray-500'>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Owner/Firm Name
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order?.name}
            </td>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Email
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order?.email}
            </td>
          </tr>
          <tr className='border border-gray-500'>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Phone Number
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order?.phoneNumber}
            </td>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Address
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order?.address}
            </td>
          </tr>
          <tr className='border border-gray-500'>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              City
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order?.city}
            </td>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Pincode
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order?.pincode}
            </td>
          </tr>
          <tr className='border border-gray-500'>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Drug Licence Number
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order?.druglcnumber}
            </td>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Food Licence Number
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order?.foodlcnumber}
            </td>
          </tr>
          <tr className='border border-gray-500'>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Land Mark
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order?.landmark}
            </td>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Order status
            </th>
            <td scope="col" className={`px-6 py-3 border border-gray-500 font-bold ${order?.OrderStatus === "Pending" ? 'text-yellow-500' : order.OrderStatus === "Delivered" ? 'text-green-600' : 'text-red-700'}`}>
              {order?.OrderStatus}
            </td>
          </tr>
          <tr className='border border-gray-500'>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Remark
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order?.remark}
            </td>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Delivery charges
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              ₹ {order?.delivery}
            </td>
          </tr>
        </table>
        <table className="w-full text-sm text-left rtl:text-right text-gray-700 border-0 border-t-0 border-gray-500 overflow-scroll scrollbar">
          <tr>
            <th colSpan={3} scope="col" className="px-6 py-3 border border-gray-500 text-xl font-bol text-right border-t-0">
              Total Billing Amount
            </th>
            <th scope="col" className="px-6 py-3 border border-gray-500 text-xl font-bold border-t-0">
              ₹ {order?.totalPrice}
            </th>
          </tr>
        </table>
        <table className="w-full text-sm text-gray-700  border  border-gray-500 border-t-0 overflow-scroll scrollbar">
          <tr>
            <th scope="col" className="px-6 py-3  border-gray-500  font-bol  border-t-0">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3 border border-gray-500  font-bold border-t-0">
              Size
            </th>
            <th scope="col" className="px-6 py-3  border-gray-500  font-bol  border-t-0">
              Mrp
            </th>
            <th scope="col" className="px-6 py-3 border border-gray-500  font-bold border-t-0">
              Unit Price
            </th>
            <th scope="col" className="px-6 py-3  border-gray-500  font-bol  border-t-0">
              Qunatity
            </th>
          </tr>
          {
            order.length == 0 ? "" :
              order?.orders?.map((product, index) => {
                return (
                  <tr key={index}>
                    <th scope="col" className="px-6 py-3 border border-gray-500  font-bol">
                      {product?.productId?.name}
                    </th>
                    <th scope="col" className="px-6 py-3 border border-gray-500  font-bold">
                      {product?.productId?.size}
                    </th>
                    <th scope="col" className="px-6 py-3 border border-gray-500  font-bol">
                      {product?.productId?.mrp}
                    </th>
                    <th scope="col" className="px-6 py-3 border border-gray-500  font-bold">
                      {product?.productId?.ourPrice}
                    </th>
                    <th scope="col" className="px-6 py-3 border border-gray-500  font-bold">
                      {product?.quantity}
                    </th>
                  </tr>
                )
              })
          }
        </table>
        {
          order.OrderStatus === "Pending" ?
            <>
              <div className='w-full h-fit flex justify-center sm:justify-end gap-5 px-5 mt-3'>
                <button className='bg-green-600 p-3 rounded-lg font-semibold' onClick={() => handleupdate("Delivered")}>Deliverd</button>
                <button className='bg-red-500 p-3 rounded-lg font-semibold' onClick={() => handleupdate("Cancled")}>Cancled</button>
              </div>
            </>
            :
            ""
        }
      </div>
    </div>
  )
}

export default Specficorder
