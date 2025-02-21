import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import DiscountShop from "../Components/DiscountShop";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { GoMoveToTop } from "react-icons/go";
import Url from "../../Url";

function ShopPage() {
  const [searchparams , setSearchparams] = useSearchParams();
  const [data, setdata] = useState([]);
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(true)
  const [btntext, setbtntext] = useState('Load More')
  const [lastindex, setlastindex] = useState((+searchparams.get('page')));
  const [firstindex , setfirstindex] = useState(+searchparams.get('page')-1);

  const forward = () => {
    setbtntext('Loading...')
    setfirstindex(lastindex)
    setlastindex(lastindex + 48)
    setbtntext('Load More');
    window.scrollTo(0,0);

    setSearchparams(searchparams => {
      searchparams.set('page', (+searchparams.get('page')) + 1 );
      return searchparams
    });
  }

  const backward = ()=>{
    setbtntext('Loading...')
    setlastindex(firstindex)
    setfirstindex(firstindex - 48)
    setbtntext('Load More');
    window.scrollTo(0,0);

    console.log(firstindex , lastindex);
    setSearchparams(searchparams => {
      searchparams.set('page', (+searchparams.get('page')) - 1 );
      return searchparams
    });
  }

  useEffect(() => {
    const fetchdata = async () => {
      setloading(true)
      try {
        let url = ""
        if (searchparams.get('category') && searchparams.get('subcategory')) {
          url = `category=${searchparams.get('category')}&subcategory=${searchparams.get('subcategory')}`
        }
        else if (searchparams.get('category')) {
          url = `category=${searchparams.get('category')}`
        }
        const { data } = await axios.get(`${Url}/api/v1/med/getproduct?${url}`)
        setdata(data);
        console.log(data.length)
        setloading(false)
      } catch (e) {
        seterror(true)
        setloading(false)
      }
    }
    fetchdata()
  }, [])

  console.log()
  if (error) {
    return (
      <>
        <DiscountShop />
        <section className="sm:pb-10 bg-[#eef4f4]">
          <div className="flex flex-wrap bg-white justify-between items-center px-2 sm:px-8 ">
            <h1 className="text-3xl text-green-500 leading-relaxed tracking-wider font-semibold px-2 py-2 text-center capitalize">
              {/* {`All Products / ${searchparams.get('category').split('-')[0]+ " " +((searchparams.get('category')).split('-')[1] ? (searchparams.get('category')).split('-')[1] : ""  )  || ""} / ${searchparams.get('subcategory').split('-')[0]+ " " +((searchparams.get('subcategory')).split('-')[1] ? (searchparams.get('subcategory')).split('-')[1] : ""  )  || ""}`} */}
              Products
            </h1>
          </div>
          <div className="w-full h-[80vh] flex items-center justify-center">
            <h1 className="text-3xl text-green-500 leading-relaxed tracking-wider font-bold px-2 py-2 text-center capitalize font-poppins"> Error While Fetching Product !!!</h1>
          </div>
        </section>
      </>
    )
  }
  return (
    <div className="">
      <DiscountShop />
      <div className='w-12 h-12 rounded-full  bg-green-600 fixed bottom-10 right-3 sm:right-10 flex items-center justify-center cursor-pointer z-50' onClick={(e) => window.scroll(0,0)}>
                      <GoMoveToTop className='text-2xl   font-extrabold' />
      </div>

      {
        loading ?
          <section className="sm:pb-10 bg-[#eef4f4]">
            <div className="flex flex-wrap justify-between items-center px-2 sm:px-8  bg-white">
              <h1 className="text-3xl text-green-500 leading-relaxed tracking-wider font-semibold px-2 py-2 text-center capitalize">
                Products
              </h1>
            </div>
            <div className="w-full h-[80vh] flex items-center justify-center">
              <div class="w-16 h-16 rounded-full animate-spin 
                    border-x-4 border-solid border-green-500 border-t-transparent"></div>
            </div>
          </section>
          :

          data.length === 0 ? 
          <section className="sm:pb-10 bg-[#eef4f4]">
            <div className="flex flex-wrap bg-white justify-between items-center px-2 sm:px-8 ">
              <h1 className="text-3xl text-green-500 leading-relaxed tracking-wider font-semibold px-2 py-2 text-center capitalize">
                {/* {`All Products / ${searchparams.get('category').split('-')[0]+ " " +((searchparams.get('category')).split('-')[1] ? (searchparams.get('category')).split('-')[1] : ""  )  || ""} / ${searchparams.get('subcategory').split('-')[0]+ " " +((searchparams.get('subcategory')).split('-')[1] ? (searchparams.get('subcategory')).split('-')[1] : ""  )  || ""}`} */}
                Products
              </h1>
            </div>
            <div className="w-full h-[80vh] flex items-center justify-center">
            <h1 className="text-3xl text-green-500 leading-relaxed tracking-wider font-bold px-2 py-2 text-center capitalize font-poppins">No such Product Found</h1>
            </div>
          </section>
          :
          <section className="sm:pb-10 bg-[#eef4f4]">
            <div className="flex flex-wrap bg-white justify-center pb-4 sm:justify-between items-center px-2 sm:px-8 ">
              <h1 className="text-3xl text-green-500 leading-relaxed tracking-wider font-semibold px-2 py-2 text-center capitalize">
                {/* {`All Products / ${searchparams.get('category').split('-')[0]+ " " +((searchparams.get('category')).split('-')[1] ? (searchparams.get('category')).split('-')[1] : ""  )  || ""} / ${searchparams.get('subcategory').split('-')[0]+ " " +((searchparams.get('subcategory')).split('-')[1] ? (searchparams.get('subcategory')).split('-')[1] : ""  )  || ""}`} */}
                Products
              </h1>
            </div>
            <section className="flex justify-start flex-wrap sm:flex-nowrap">
              <div className="w-full right-0">
                <div className="w-full sm:px-10 flex flex-wrap justify-center items-center gap-2 sm:gap-10 py-5 sm:py-10">
                  {
                    data.slice(( firstindex*48), (lastindex *48))?.map((item, index) => {
                      return <ProductCard key={item.index} name={item.name} index={index} id={item.id} cat={item.category} subcat={item.subcategory} img={item.imageurl} actualprice={item.mrp} discountprice={item.ourPrice} companyname={item.companyName} size={item.size} heart={"yes"}  range={item.range} />
                    })
                  }
                </div>
              </div>
            </section>
            <div className="w-[90%] mx-auto h-20 ">
            {
              firstindex != 0 ?
                <div className='sm:w-[150px] h-fit p-1 flex rounded-xl  bg-gray-300 font-bold transition-all duration-500    cursor-pointer justify-center items-center py-2 mx-auto my-5 float-left' onClick={() => backward()}>
                  <button className='w-full h-full text-sm sm:text-lg'>Back</button>
                </div>
                :
                ""
            }
            {
              lastindex*48 < data.length ?
                <div className='sm:w-[150px] h-fit p-1 flex rounded-xl  bg-gray-300 font-bold transition-all duration-500    cursor-pointer justify-center items-center py-2 mx-auto my-5 float-right' onClick={() => forward()}>
                  <button className='w-full h-full text-sm sm:text-lg'>Next</button>
                </div>
                :
                ""
            }
            </div>
          </section>
      }
    </div>
  );
}

export default ShopPage;
