
import NoData from "@/components/no-data";
import moment from "moment";
import { useState } from "react";
import Loading from "@/components/loading";
import styles from '../styles.module.scss'
import { getPostDetail } from "@/service/postDetail";
import { IPost } from "@/types/managerType";
import Comment from "../components/Comment";
import ListComment from "../components/ListComment";

async function PostDetail({params}:any) {
  const { slug } = params;

  const {payload:postDetail}:any = await getPostDetail(String(slug));
//   const handleSubmitComment = async () => {
//     if (!postDetail?.id) return;
//     const newComment: IAddComment = {
//       user_id: profile?.id,
//       post_id: postDetail?.id,
//       content: commentUser.trim(),
//     };
//     if (!profile?.id) {
//       message.destroy();
//       message.error("chức năng bình luận chỉ có thể sử dụng bởi thành viên");
//       return;
//     }

//     if (checkScript(newComment.content)) {
//       message.destroy();
//       message.error("bình luận thất bại");
//       return;
//     }
//     if (!newComment.content) {
//       message.destroy();
//       message.error("khung bình luận không thể để trống");
//       return;
//     }
//     try {
//       await addComment(newComment);
//       fetchComment();
//     } catch (error) {
//       handleErrorMessage(error);
//     }
//     setContentUser("");
//   };

//   const handleDeleteComment = async (id: number) => {
//     try {
//       await deleteComment(id);
//       fetchComment();
//     } catch (error) {
//       handleErrorMessage(error);
//     }
//   };
//   if (props?.error) {
//     return <NoData />;
//   }
  return (
    <div className={styles.container}>
      {!postDetail && <Loading />}
     
      <div className={styles.containerDetail}>
        <div className={styles.detail}>
          <div className={styles.dateTime}>
            <p>
              {moment(postDetail?.reg_date).format("DD/MM/YYYY")} - By Smile
            </p>
          </div>
          <div className={styles.detailContent}>
            <div
              dangerouslySetInnerHTML={{ __html: `${postDetail?.content}` }}
              className={styles.detailContents}
            ></div>
          </div>
        </div>

        <div className={styles.production}></div>
      </div>
      <div className={styles.commentContainer}>
        <Comment postDetail = {postDetail} />
        <ListComment postDetail = {postDetail} />
      </div>
    </div>
  );
}

export default PostDetail;

