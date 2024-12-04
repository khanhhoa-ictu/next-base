import NoData from "@/components/no-data";
import moment from "moment";
import { useState } from "react";
import Loading from "@/components/loading";
import styles from "../styles.module.scss";
import { getPostDetail } from "@/service/postDetail";
import { IPost } from "@/types/managerType";
import Comment from "../components/Comment";
import ListComment from "../components/ListComment";
import { revalidateTag } from "next/cache";

async function PostDetail({ params }: any) {
  const { slug } = params;

  const { payload: postDetail }: any = await getPostDetail(String(slug));
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
        <Comment
          postDetail={postDetail}
        />
        <ListComment postDetail={postDetail} />
      </div>
    </div>
  );
}

export default PostDetail;
