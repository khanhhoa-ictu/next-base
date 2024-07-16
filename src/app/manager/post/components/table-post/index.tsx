import React from "react";
import PostItem from "./PostItem";

interface TablePostProps {
  dataSource: any;
}

function TablePost(props: TablePostProps) {
  const { dataSource } = props;

  return (
    <div>
      <table className="w-full">
      <tbody>
        <tr>
          <th>title</th>
          <th>action</th>
        </tr>
        
          {dataSource.map((item: any) => {
            return <PostItem post={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablePost;
