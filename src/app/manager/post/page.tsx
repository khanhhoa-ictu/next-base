import { Button, Table } from "antd";

import { useState } from "react";
import { IPost } from "@/types/managerType";
import styles from './style.module.scss'
import { handleErrorMessage } from "@/lib/utils";
import CustomModal from "@/components/Modal/CustomModal";
import Loading from "@/components/loading";
import AddPost from "./components/add-post";
import EditPost from "./components/edit-post";
import { getPostManager } from "@/service/manager";
import { cookies } from "next/headers";

async function PostManager() {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const {payload}:any = await getPostManager(token?.value || '')
//   const [isOpenModal, setIsOpenModal] = useState({
//     add: false,
//     edit: false,
//     delete: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [id, setId] = useState<number>();
//   const handleDelete = async (id: number) => {
//     setIsOpenModal({ ...isOpenModal, delete: true });
//     setId(id);
//   };

  
//   const [listPost, setListPost] = useState([])
//   const handleOkAdd = async (data: IPost) => {
//     try {
//     //   await addPost(data);
//       setIsOpenModal({ ...isOpenModal, add: false });
//     } catch (error) {
//       handleErrorMessage(error);
//     }
//   };

//   const handleOkEdit = async (data: IPost) => {
//     let newData = { ...data, id: id };

//     try {
//       setLoading(true);
//     //   await editPost(newData);
//       setIsOpenModal({ ...isOpenModal, edit: false });
//     } catch (error) {
//       handleErrorMessage(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditPost = (id: number) => {
//     setIsOpenModal({ ...isOpenModal, edit: true });
//     setId(id);
//   };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (record: any) => {
        return (
          <div
            key={record}
            className="color-blue font-medium cursor-pointer break-word"
          >
            {/* <Button onClick={() => handleEditPost(record)}>Sửa</Button>
            <Button onClick={() => handleDelete(record)}>Xóa</Button> */}
          </div>
        );
      },
    },
  ];
//   const handleOkDelete = async () => {
//     if (!id) return;
//     setLoading(true);
//     try {
//     //   await deletePost(id);
//     } catch (error) {
//       handleErrorMessage(error);
//     } finally {
//       setIsOpenModal({ ...isOpenModal, delete: false });
//       setLoading(false);
//     }
//   };
  return (
      <div className="ml-[250px]">
        {/* {loading && <Loading />} */}
        <div className="container-manager">
          <div className={styles.postContainer}>
            <div className={styles.addPost}>
            <AddPost/>
              {/* <Button
                className={styles.add}
                onClick={() => setIsOpenModal({ ...isOpenModal, add: true })}
              >
                Thêm bài viết
              </Button> */}
            </div>
            <Table dataSource={payload} columns={columns} rowKey="id" />
          </div>
        </div>

        {/* <AddPost
          isModalVisible={isOpenModal.add}
          handleOk={handleOkAdd}
          handleCancel={() => setIsOpenModal({ ...isOpenModal, add: false })}
        />
        {id && (
          <EditPost
            isModalVisible={isOpenModal.edit}
            handleOk={handleOkEdit}
            handleCancel={() => setIsOpenModal({ ...isOpenModal, edit: false })}
            id={id}
          />
        )} */}

        {/* <CustomModal
          isOpen={isOpenModal.delete}
          handleOk={handleOkDelete}
          handleCancel={() => setIsOpenModal({ ...isOpenModal, delete: false })}
          title={"Xóa bài viết"}
        >
          Bạn có muốn xóa bài viết không
        </CustomModal> */}
      </div>
  );
}

export default PostManager;