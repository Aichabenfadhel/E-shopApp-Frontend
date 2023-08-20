import React from 'react'
import Layout from '../components/Layout/Layout'
import {BiSupport,BiPhoneCall,BiMailSend} from "react-icons/bi"

const Contact = () => {
  return (
    <Layout title={"Contact us-E-Shop"}>
      <div className='row contactus'>
         <div className='col-md-6'>
           <img
            src="https://www.qiagen.com/-/media/project/qiagen/qiagen-home/about-qiagen-website/related-content/technical-questions-contact-us.jpg"
            alt='contactus'
            style={{width:"100%"}}
           />
         </div>
         <div className='col-md-4'>
          <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
          <p className='text-justify mt-2'>
            Any query and info about product feel free to call anytime 24/7 available
          </p>
          <p className='mt-3'>
            <BiMailSend/> : www.contact@e-shop.com 
          </p>
          <p className='mt-3'>
            <BiPhoneCall/> : +216 75 448 123
          </p>
          <p className='mt-3'>
            <BiSupport/> : 180-555-888 (free)
          </p>
         </div>
      </div>
    </Layout>
  )
}

export default Contact