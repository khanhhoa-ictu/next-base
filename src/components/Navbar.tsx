import Link from 'next/link'
import React from 'react'
import ButtonLogout from './ButtonLogout'

function Navbar() {
  return (
    <ul>
        <li><Link href='/login' >Login</Link></li>
        <li><Link href='/register'>Register</Link></li>
        <li><ButtonLogout/></li>
    </ul>
  )
}

export default Navbar