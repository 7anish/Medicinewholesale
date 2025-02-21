import React from 'react'
import Hero from '../Components/Hero'
import BrowseByCat from '../Components/BrowseByCat'
import FeaturedProd from '../Components/FeaturedProd'
import Contact from '../Components/Contact'
function HomePage() {
  
return (
    <div className='font-poppins'>
      <Hero/>
      <BrowseByCat />
      <FeaturedProd />
      <Contact />
    </div>
  )
}

export default HomePage