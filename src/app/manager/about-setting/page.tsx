'use client'
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input/Input";
import TextArea from "antd/lib/input/TextArea";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from './styles.module.scss'
import { handleErrorMessage, imgMaxSize } from "@/lib/utils";
import Loading from "@/components/loading";
import { getAbout, getEditAbout, setAvatarAbout } from "@/service/manager";
import { IAbout } from "@/types/managerType";
import noAvatar from '@/assets/images/no-avatar.png'

 function AboutSetting() {
  const Ref = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState('')
  const [form] = useForm();

  const handleSubmit = async (payload: IAbout) => {
    setLoading(true);
    try {
      await getEditAbout(payload);
      message.success("thay đổi thông tin thành công");
    } catch (error) {
        console.log(error)
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const typeFile = ["image/png", "image/jpeg", "image/gif"];

  const handleChangeAvatar = async (event: any) => {
    if (!typeFile.includes(event.target.files[0].type)) {
      message.destroy();
      message.error("file chỉ có thể là .png .jpg .gif");
      return;
    }
    if (event.target.files[0].size > imgMaxSize) {
      message.destroy();
      message.error("file upload chỉ có thể dưới 5M");
      return;
    }
    let data = new FormData();
    data.append("file", event.target.files[0]);
    console.log('data',data)
    if (!event.target.files[0]) return;
    try {
      setLoading(true);
      await setAvatarAbout(data);
      message.success("thay đổi ảnh đại diện thành công");
      message.destroy();
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };
  const getDetailAbout = async() =>{
    try {
        const data:any = await getAbout();
        console.log(data)
        form.setFieldsValue(data.payload);
        setThumbnail(data.payload?.thumbnail)
    } catch (error) {
        handleErrorMessage(error)
    }
  }
  useEffect(() => {
    getDetailAbout()
  }, []);
  return (
      <div className="manager ml-[250px]">
        {loading && <Loading />}
        <div className="container-manager">
          <div className={styles.aboutContainer}>
            <div className={styles.avatar}>
              <div className={styles.img}>
                <Image
                  src={thumbnail || noAvatar}
                  alt=""
                  width={120}
                  height={120}
                />
                <div
                  className={styles.changeImage}
                  onClick={() => Ref.current.click()}
                >
                  <UploadOutlined />
                </div>
                <input
                  name="file"
                  id="file"
                  type="file"
                  className={styles.file}
                  ref={Ref}
                  onChange={handleChangeAvatar}
                />
              </div>
            </div>
            <Form onFinish={handleSubmit} form={form}>
              <Form.Item labelCol={{ span: 24 }} label="title" name="title">
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="facebook"
                name="facebook"
              >
                <Input />
              </Form.Item>
              <Form.Item labelCol={{ span: 24 }} label="instal" name="instal">
                <Input />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                label="linkedin"
                name="linkedin"
              >
                <Input />
              </Form.Item>
              <Form.Item labelCol={{ span: 24 }} label="youtube" name="youtube">
                <Input />
              </Form.Item>
              <Form.Item labelCol={{ span: 24 }} label="content" name="content">
                <TextArea />
              </Form.Item>
              <Button htmlType="submit" type="primary">
                Thay Đổi
              </Button>
            </Form>
          </div>
        </div>
      </div>
  );
}

export default AboutSetting;