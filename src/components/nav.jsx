import { NavLink } from "react-router-dom"
import { useState } from "react"
export default function Navbar(){

    const [openNav , setOpenNav] = useState(false)

    const handleOpenNav = () => {
        setOpenNav(!openNav)
    }
    return(
        <nav>
            <div className="nav__header">
                <div className="nav__logo">
                    <img src="./images/nav_logo.webp" alt="nav__logo" width="50" height="50" />
                </div>
                <div className="menu__btn" onClick={handleOpenNav}>
                    <i class="ri-menu-line"></i>
                </div>
            </div>
            <ul className={`nav__links ${ openNav ? 'open' : '' }`} onClick={handleOpenNav}>
                <li>
                    <NavLink to='/' className="NavLink"> الرئيسية</NavLink>
                </li>
                <li>
                    <NavLink to='/contact' className="NavLink"> تواصل معنا</NavLink>
                </li>
                <li>
                    <NavLink to='/articles' className="NavLink"> المقالات</NavLink>
                </li>
                <li>
                    <NavLink to='/appointement' className="NavLink"> طلب استشارة</NavLink>
                </li>
            </ul>
        </nav>
    )
}