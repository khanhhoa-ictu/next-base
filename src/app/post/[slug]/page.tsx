import NoData from "@/components/no-data";
import moment from "moment";
import { useState } from "react";
import Loading from "@/components/loading";
import styles from "../styles.module.scss";
import { getPostDetail } from "@/service/postDetail";
import { IPost } from "@/types/managerType";
import Comment from "../components/Comment";
import ListComment from "../components/ListComment";
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { slug: string }
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const { payload: postDetail }: any = await getPostDetail(String(slug));
 
  return {
    title: postDetail.title + ' | Smile',
  }
}

async function PostDetail({ params, searchParams }: Props) {
  const { payload: postDetail }: any = await getPostDetail(String(params.slug));

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
