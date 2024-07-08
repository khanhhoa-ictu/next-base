import React from 'react'
import styles from './styles.module.scss'
import { IRole } from '@/types/about'
import Image from 'next/image'

interface RoleItemProps {
    role:IRole
}

function RoleItem(props:RoleItemProps) {
    const {role} = props
  return (
    <div className="flex gap-3">
        <div className="w-[40px] h-[40px]">
            <Image src={role.image} alt="" className='w-full h-full' />
        </div>
        <div>
            <h5>{role.title}</h5>
            <p>{role.description}</p>
        </div>
    </div>
  )
}

export default RoleItem