"use client"
import { IPost } from '@/types/managerType'
import React, { useState } from 'react'
import HomeItem from '.'

function ListPost() {
  const [listPostAll, setListPostAll] = useState([])

  return (
    <div className="mt-[40px]">
    {listPostAll?.map((item: IPost) => (
      <HomeItem item={item} key={item?.id} />
    ))}
  </div>
  )
}

export default ListPost