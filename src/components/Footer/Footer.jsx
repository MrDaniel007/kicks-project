import React from 'react'
import "./Footer.scss"
import minikicks from "../../assets/svg/mini-kicks.svg"
import plus from "../../assets/svg/plus.svg"
import facebook from "../../assets/svg/facebook.svg"
import instagram from "../../assets/svg/instagram.svg"
import twitter from "../../assets/svg/twitter.svg"
import tiktok from "../../assets/svg/tiktok.svg"
import kicks from "../../assets/image/kicks.png"

function Footer() {
  return (
    <div data-aos="zoom-in" data-aos-delay="400" className='footer'>
      <div className='footer-top'>
        <div className='footer-inside'>
        <h2 className='footer-discount'>Join our KicksPlus Club & get 15% off</h2>
        <p className='footer-p'>Sign up for free! Join the community.</p>
     <div className='footer-inp-btn'><input className='footer-input' type="text" placeholder='Email address'/> <button className='footer-btn'><h4 className='footer-h4'>Submit</h4></button></div>   </div>
      <div className='footer-imagese'>  <img className='footer-img' src={minikicks} alt="" />
        <img className='footer-plus' src={plus} alt="" />
        </div>                                           
        <div className='footer-bottom'>
   <div className='about-us'>
    <h2 className='footer-h2'>About us</h2>
    <p className='footer-p2'>We are the biggest hyperstore in the universe. <br /> We got you all cover with our exclusive <br />collections and latest drops.</p>
   </div>
   <div className='categories'>
<h3 className='footer-h3'>Categories</h3>
<div className='footer-ul'>
  <ul className='ul-boss'>
    <li className='li'>Runners</li>
   <li className='li'>Sneakers</li>
   <li className='li'>Basketball</li>
   <li className='li'>Outdoor</li>
   <li className='li'>Golf</li>
   <li className='li'>Hiking</li> 
  </ul>
</div>
   </div>
   <div className='company'>
  <h3 className='footer-h3-2'>Company</h3>
  <ul className='company-ul'>
    <li className='li-2'>About</li>
    <li className='li-2'>Contact</li>
    <li className='li-2'>Blogs</li>
  </ul>
   </div>
   <div className='follow-us'>
    <h3 className='footer-h3-3'>Follow us </h3>
    <div className='footer-imgs'>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><img className='f-img' src={facebook} alt="" /> </a>  
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <img className='f-img' src={instagram} alt="" /></a>
     <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> <img className='f-img' src={twitter} alt="" /></a>
      <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"><img className='f-img' src={tiktok} alt="" /></a>
      
      </div>
   </div>
   <img className='big-kicks' src={kicks} alt="" />
        </div>

      </div>
     <p className='footer-final'> © All rights reserved | Made with ❤️ by Visiata Systems International</p>
    </div>
  )
}

export default Footer
