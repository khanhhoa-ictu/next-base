import React from "react";
import styles from './styles.module.scss'
import { IDashCount } from "@/types/managerType";
interface DashCountProps {
  item: IDashCount;
}
function DashCount(props: DashCountProps) {
  const { item } = props;
  return (
    <div
      className={styles.dashItem}
      style={{ backgroundColor: item.backgroundColor }}
    >
      <div className={styles.count}>
        <h4>{item.count}</h4>
        <h5>{item.title}</h5>
      </div>
      <div className={styles.dashImg}>{item.icon}</div>
    </div>
  );
}

export default DashCount;