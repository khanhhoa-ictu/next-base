'use client'
import React, { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { Button, message } from 'antd';
import { checkScript, handleErrorMessage } from '@/lib/utils';
import useProfile from '@/hook/useProfile';
import { IAddComment } from '@/types/Post';
import { addComment } from '@/service/postDetail';
import styles from '../styles.module.scss'
interface CommentProps {
    postDetail?: any
}
function Comment(props: CommentProps) {
    const { postDetail } = props;
    const {profile} = useProfile();
    console.log(profile)
    const [commentUser, setContentUser] = useState("");
    const handleSubmitComment = async () => {
        if (!postDetail?.id) return;
        const newComment: IAddComment = {
          user_id: profile?.id,
          post_id: postDetail?.id,
          content: commentUser.trim(),
        };
        console.log(newComment)
        if (checkScript(newComment.content)) {
          message.destroy();
          message.error("bình luận thất bại");
          return;
        }
        if (!newComment.content) {
          message.destroy();
          message.error("khung bình luận không thể để trống");
          return;
        }
        try {
          await addComment(newComment);
        } catch (error) {
            console.log(error)
          handleErrorMessage(error);
        }
        setContentUser("");
      };
  return (
    <div className={styles.comment}>
    <h2>Leave a Reply</h2>
    <TextArea
      value={commentUser}
      onChange={(e) => setContentUser(e.target.value)}
      className={styles.textArea}
      maxLength={300}
    />
    <div className={styles.submitComment}>
      <Button onClick={handleSubmitComment}>Bình Luận</Button>
    </div>
  </div>
  )
}

export default Comment