'use client'
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from './styles.module.scss'

interface TextEditorProps {
  onChange: (event: any, editor: any) => void;
  data?: string;
}

function TextEditor({ onChange, data }: TextEditorProps) {
  return (
    <div className={styles.textEditor}>
      <CKEditor
        editor={ClassicEditor}
        config={{
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