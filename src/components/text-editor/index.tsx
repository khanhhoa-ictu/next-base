"use client";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import styles from "./styles.module.scss";
import { uploadImagePost } from "@/service/manager";

interface TextEditorProps {
  onChange: (event: any, editor: any) => void;
  data?: string;
}
function customUploadAdapter(loader: any) {
  return {
    upload: async () => {
      const data = new FormData();
      const file = await loader.file;
      data.append("file-image", file);

      const response:any = await uploadImagePost(data);
      return {
        default: response.payload.url,
      };
    },
  };
}

function uploadPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return customUploadAdapter(loader);
  };
}

function TextEditor({ onChange, data }: TextEditorProps) {
  return (
    <div className={styles.textEditor}>
      <CKEditor
        editor={ClassicEditor as any}
        config={{
          extraPlugins: [uploadPlugin],
          image: {
            toolbar: [
              'imageTextAlternative', // Thêm mô tả thay thế cho hình ảnh
              'imageStyle:full', 
              'imageStyle:side', 
              '|',
              'resizeImage:25',  // Tùy chọn resize 25%
              'resizeImage:50',  // Tùy chọn resize 50%
              'resizeImage:75',  // Tùy chọn resize 75%
              'resizeImage:original' // Tùy chọn resize về kích thước gốc
            ],
            resizeUnit: 'px', // Đơn vị resize (px hoặc %)
          },
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "fontfamily",
            "fontsize",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "subscript",
            "superscript",
            "code",
            "-", // break point
            "|",
            "alignment",
            "imageInsert",
            "uploadImage",
            "blockQuote",
            "codeBlock",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
          ],
        }}
        data={data || ""}
        onChange={(event: any, editor: any) => onChange(event, editor)}
      />
    </div>
  );
}

export default TextEditor;
