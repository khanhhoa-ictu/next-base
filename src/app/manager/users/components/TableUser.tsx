import React from "react";
import UserItem from "./UserItem";
interface TablePostProps {
  dataSource: any;
}
function TableUser(props: TablePostProps) {
  const { dataSource } = props;

  return (
    <div>
      <table className="w-full">
        <tbody>
          <tr>
            <th>username</th>
            <th>action</th>
          </tr>

          {dataSource.map((item: any) => {
            return <UserItem user={item} key={item.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableUser;
