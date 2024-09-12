import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import AboutImage from "@/assets/images/aboutImage.jpg"
import Image from "next/image";
import { getAbout } from "@/service/manager";

async function AboutMe() {
  const {payload:about}:any = await getAbout()
  console.log(about)
  return (
    <div className="sm:p-[85px] pt-[45px] p-[25px] 2xl:px-[125px]">
      <h1 className="text-5xl font-bold text-black mb-6 px-3">Our Mission</h1>
      <div className="flex text-left w-full 2xl:gap-10 gap-2">
        <div className="md:basis-[60%] px-3 flex flex-col basic-[100%]">
          <div >
            <h2 className="text-[32px] text-[#50c297] mb-4 sm:mt-10 mt-4">
              {about.title}
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {about.content}
            </p>
          </div>
          <div className="flex justify-end mr-6">
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
        <div className="basis-[40%] shrink-0 px-3 md:flex justify-center hidden">
          <div className="lg:w-[400px] lg:h-[400px] w-[250px] h-[250px]">
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
