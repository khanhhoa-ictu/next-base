"use client";
import CustomModal from "@/components/Modal/CustomModal";
import { handleErrorMessage } from "@/lib/utils";
import { deleteUser } from "@/service/manager";
import { Button } from "antd";
import React, { useState } from "react";

interface PostItemProps {
  user: any;
}

function UserItem(props: PostItemProps) {
  const { user } = props;
  const [isOpenModal, setIsOpenModal] = useState({
    edit: false,
    delete: false,
  });
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    try {
      await deleteUser(user.id);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <tr>
      <td className="text-center">{user.username}</td>

      <td>
        <div className="text-center">
          <Button
            onClick={() => setIsOpenModal({ ...isOpenModal, delete: true })}
          >
            delete
          </Button>
        </div>
      </td>
      <CustomModal
        isOpen={isOpenModal.delete}
        handleOk={handleDeleteUser}
        handleCancel={() => setIsOpenModal({ ...isOpenModal, delete: false })}
        title={"Xóa người dùng"}
        loading={loading}
      >
        Bạn có muốn xóa bài viết không
      </CustomModal>
    </tr>
  );
}

export default UserItem;
