import { NavLink } from "react-router-dom";
import { FaFacebookSquare, FaYoutubeSquare, FaInstagramSquare } from 'react-icons/fa';
export default function FooterPro(){
    return(  <footer className='footerStyle tfp-page footerAling'>
    <div className='col-12 text-center styleLi'>


        <NavLink to='/inicio' className='footerText ' ><FaFacebookSquare /> </NavLink>
        <NavLink to='/inicio' className='footerText ' ><FaYoutubeSquare /> </NavLink>
        <NavLink to='/inicio' className='footerText ' ><FaInstagramSquare /> </NavLink>

    </div>
    <div className='col-12 text-center '><NavLink to='/inicio' className='footerText'>¿Quienes Somos?</NavLink></div>
    <div className='col-12 text-center footerText'>Todos Flotan Pro. 🎈</div>

</footer>)
}