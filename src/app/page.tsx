import HomeItem from "@/components/home-item";
import { getAllPost } from "@/service/manager";
import { IPost } from "@/types/managerType";
import styles from "./styles.module.scss";
import { Suspense } from "react";
import Loading from "@/components/loading";
const initPage = {
  page: 1,
};
async function Home() {
  // const ListAllPost: any = await getAllPost({ page: 1 });
  // console.log(ListAllPost)
  // const handleChangePage = (page: number, pageSize: number) => {
  //   const newPage = {
  //     page,
  //   };
  //   setPage(newPage);
  // };

  return (
    <Suspense fallback={<Loading/>}>
    <div className={styles.container}>
      <div className={styles.homeContainer}>
        <div className={styles.carousel}>{/* <Carouse /> */}</div>
        
        <div className={styles.articleContainer}>
       
          {/* <div className="mt-[40px]">
            {ListAllPost.payload?.listPost.map((item: IPost) => (
              <HomeItem item={item} key={item?.id} />
            ))}
          </div> */}
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
    </Suspense>
  );
}

export default Home;
