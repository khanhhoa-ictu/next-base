import { Roles } from "@/lib/constants";
import Profile from "./Profile";
import styles from './styles.module.scss';
import RoleItem from "./components/RoleItem";
import { Button } from "antd";

async function AboutMe() {
  return (
    <div className={styles.aboutPage}>
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContact}>
        <div className={styles.image}>
          
        </div>
        <div className={styles.contact}>
          <h1 className="text-lg font-bold">Lo Khanh Hoa</h1>
          <p className="text-[#a5a5fc] text-base">kiara96.shippo@gmail.com</p>
        </div>
      </div>
      <div className={styles.aboutDetail}>
        <div className={styles.description}>
          <h1>About Me</h1>
          <div className="flex gap-[6px] flex-col">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae cupiditate reprehenderit vitae officia tempora</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque modi tempora placeat ab ipsum similique dolores vitae, unde corporis, accusamus quos!</p>
          </div>
        
        </div>
        <div className={styles.media}>
          <div className={styles.role}>
            <h3 className="text-lg font-bold mb-3">Last Roles</h3>
            <div className="flex flex-col gap-2">
              {
                Roles.map((item)=> <RoleItem role={item}/>)
              }
            </div>
          </div>
          <div className={styles.mediaLink}></div>
        </div>
      </div>
     
    </div>
    </div>
  );
}

export default AboutMe;
