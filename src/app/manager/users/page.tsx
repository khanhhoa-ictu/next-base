import TableUser from "./components/TableUser";
import styles from "./styles.module.scss";
import { getUser } from "@/service/manager";
async function UserManager() {
  const data = await getUser();
  return (
    <div className="manager">
      <div className="container-manager">
        <div className={styles.postContainer}>
          <TableUser dataSource={data.payload} />
        </div>
      </div>
    </div>
  );
}

export default UserManager;
