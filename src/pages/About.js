import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About us-E-Shop"}>
            <div className='row contactus'>
         <div className='col-md-6'>
           <img
            src="https://blog.advesa.com/wp-content/uploads/2019/11/about-us-page.png"
            alt='aboutus'
            style={{width:"100%"}}
           />
         </div>
         <div className='col-md-4'>
          <h1 className='bg-dark p-2 text-white text-center'>ABOUT US</h1>
          <p className='text-justify mt-2'>
            gcgcfchgchgcgchcgcfcghcghcghcgcgv
            gvhgvgvhjvhjbhjbhbhbjbjkhjgjbjvgb
            fgcghvhjbbhbhvbjbhjbjhvghchgcvgvchgv
            hgvgvghvhvhbbbbbbbbcfcxfcgvnbvjhbjj
          </p>
         </div>
      </div>
    </Layout>
  )
}

export default About