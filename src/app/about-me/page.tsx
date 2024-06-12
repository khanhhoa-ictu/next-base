import { getAccountSever } from "@/service/accout";
import { cookies } from "next/headers";
import Profile from "./Profile";

async function AboutMe() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')
  const data = await getAccountSever(token?.value);
  return (
    <div>
      <div>AboutMe</div>
      <Profile />
    </div>
  );
}

export default AboutMe;
