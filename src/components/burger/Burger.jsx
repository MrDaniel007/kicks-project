import React from 'react'
import { Link } from 'react-router-dom'
import "./Burger.scss"

export default function Burger({ isOpen, onClose }) {
    if(isOpen === false){
        return null
    }
    return (
        <nav className={`nav ${isOpen === true ? "active" : ""}`}>
            <Link className='New-rubik' to="/" onClick={onClose}>New Drops <p className='rubik'></p></Link>
            <Link className='link-header' to="/men" onClick={onClose}>Men</Link>
            <Link className='link-header2' to="/women" onClick={onClose}>Women</Link>
        </nav>
    )
}
