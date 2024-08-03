import { getAccount } from "@/service/accout";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import AboutImage from "@/assets/images/aboutImage.jpg"
import Image from "next/image";

async function AboutMe() {
  const {payload:about}:any = await getAccount()
  return (
    <div className="p-[85px] pt-[45px]">
      <h1 className="text-5xl font-bold text-black mb-6 px-3">Our Mission</h1>
      <div className="flex text-left w-full gap-2">
        <div className="basis-[60%] px-3">
          <div>
            <h2 className="text-[32px] text-[#50c297] mb-4 mt-10">
              {about.title}
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {about.content}
            </p>
          </div>
          <div className="flex justify-end">
            <ul className="flex gap-4">
              <li className="cursor-pointer list-none">
                <Link className="text-[24px] text-[#333] hover:opacity-60" href={{ pathname: about.facebook }} target={"_blank"}>
                  <FacebookOutlined />
                </Link>
              </li>
              <li className="cursor-pointer list-none">
                <Link className="text-[24px] text-[#333] hover:opacity-60" href={{ pathname: about.instal }} target={"_blank"}>
                  <InstagramOutlined />
                </Link>
              </li>
              <li className="cursor-pointer list-none">
                <Link className="text-[24px] text-[#333] hover:opacity-60" href={{ pathname: about.youtube }} target={"_blank"}>
                  <YoutubeOutlined />
                </Link>
              </li>
              <li className="cursor-pointer list-none">
                <Link className="text-[24px] text-[#333] hover:opacity-60" href={{ pathname: about.linkedin }} target={"_blank"}>
                  <LinkedinOutlined />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="basis-[40%] shrink-0 px-3 flex justify-center">
          <div className="w-[400px] h-[400px]">
            <Image
              src={AboutImage}
              alt="Our Mission"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
