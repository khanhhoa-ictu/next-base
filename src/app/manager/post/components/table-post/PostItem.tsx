"use client";
import CustomModal from "@/components/Modal/CustomModal";
import { handleErrorMessage } from "@/lib/utils";
import { deletePost, editPost } from "@/service/manager";
import { Button } from "antd";
import React, { useState } from "react";
import EditPost from "../edit-post";
import { IPost } from "@/types/managerType";

interface PostItemProps {
  post: any;
}

function PostItem(props: PostItemProps) {
  const { post } = props;
  const [isOpenModal, setIsOpenModal] = useState({
    edit: false,
    delete: false,
  });
  const [loading, setLoading] = useState(false);
  const handleOkDelete = async () => {
    setLoading(true);
    try {
      await deletePost(post.id);
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setIsOpenModal({ ...isOpenModal, delete: false });
      setLoading(false);
    }
  };

  const handleOkEdit = async (data: IPost) => {
    let newData = { ...data, id: post.id };

    try {
    //   setLoading(true);
      await editPost(newData);
      setIsOpenModal({ ...isOpenModal, edit: false });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <tr>
      <td className="text-center">{post.title}</td>

      <td>
        <div className="text-center">
          <Button
            onClick={() => setIsOpenModal({ ...isOpenModal, edit: true })}
          >
            update
          </Button>
          <Button
            onClick={() => setIsOpenModal({ ...isOpenModal, delete: true })}
          >
            delete
          </Button>
        </div>
      </td>
      <CustomModal
        isOpen={isOpenModal.delete}
        handleOk={handleOkDelete}
        handleCancel={() => setIsOpenModal({ ...isOpenModal, delete: false })}
        title={"Xóa bài viết"}
        loading={loading}
      >
        Bạn có muốn xóa bài viết không
      </CustomModal>
      {isOpenModal.edit && (
        <EditPost
          isModalVisible={isOpenModal.edit}
          handleOk={handleOkEdit}
          handleCancel={() => setIsOpenModal({ ...isOpenModal, edit: false })}
          id={post.id}
        />
      )}
    </tr>
  );
}

export default PostItem;
