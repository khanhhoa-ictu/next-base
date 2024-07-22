import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Loading from "../../components/loading";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './styles.module.scss'

function AboutMe() {
  const about = {
    thumbnail: 'https://res.cloudinary.com/smile159/image/upload/v1642153205/ghnqckvl0qmrphsoixb0.jpg',
    title: 'title',
    content: 'content',
    facebook: 'https://www.facebook.com/khanh.hoa.3998263/',
    instal: 'https://www.instagram.com/khanh.hoa.3998263/',
    youtube: 'https://www.youtube.com/channel/UC1-11-11-11-11-11',
    linkedin: 'https://www.linkedin.com/in/khanh-hoa-010a00199'
  }
  return (
    <>
      {/* <Particle /> */}
      <div className={styles.container}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutContent}>
            <div className={styles.thumb}>
              <Image src={about?.thumbnail} alt="" width={370} height={500} />
            </div>
            <div className={styles.textContent}>
              <h3>{about?.title}</h3>
              <div className={styles.aboutBio}>
                <p>{about?.content}</p>
              </div>

              <ul className={styles.aboutSocial}>
                <li>
                  <Link href={{ pathname: about.facebook }} target={"_blank"}>
                    <FacebookOutlined />
                  </Link>
                </li>
                <li>
                  <Link href={{ pathname: about.instal }} target={"_blank"}>
                    <InstagramOutlined />
                  </Link>
                </li>
                <li>
                  <Link href={{ pathname: about.youtube }} target={"_blank"}>
                    <YoutubeOutlined />
                  </Link>
                </li>
                <li>
                  <Link href={{ pathname: about.linkedin }} target={"_blank"}>
                    <LinkedinOutlined />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutMe;
