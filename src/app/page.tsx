import ListPost from "@/components/home-item/ListPost";
import { useState } from "react";
import styles from "./styles.module.scss";
import { getAllPost } from "@/service/manager";
import { getAccount } from "@/service/accout";
const initPage = {
  page: 1,
};
async function Home() {
  const ListAllPost = await getAccount();
  console.log(ListAllPost)
  // const handleChangePage = (page: number, pageSize: number) => {
  //   const newPage = {
  //     page,
  //   };
  //   setPage(newPage);
  // };

  return (
     
      <div className={styles.container}>
        <div className={styles.homeContainer}>
          <div className={styles.carousel}>
            {/* <Carouse /> */}
          </div>
          <div className={styles.articleContainer}>
           <ListPost/>
          </div>
          <div className={styles.pagination}>
            {/* {listPostAll.length ==0 ? null : (
              <Pagination
                current={1}
                total={10}
                // onChange={handleChangePage}
                pageSize={10}
              />
            )} */}
          </div>
        </div>
      </div>
  );
}

export default Home;