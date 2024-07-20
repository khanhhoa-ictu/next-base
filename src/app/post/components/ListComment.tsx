import React from 'react'
import styles from '../styles.module.scss'
import { IComment } from '@/types/post'
import { getComment } from '@/service/postDetail'
import CommentItem from './CommentItem'

interface ListCommentProps {
    postDetail : any
}
async function ListComment(props: ListCommentProps) {
    const { postDetail } = props
    const {payload:comment}:any = await getComment(postDetail.id)
  return (
    <div className={styles.listComment}>
    {comment?.map((item: IComment) => (
      <CommentItem
        item={item}
        key={item?.id}
      />
    ))}
  </div>
  )
}

export default ListComment