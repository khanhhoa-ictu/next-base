import ButtonLogout from "@/components/ButtonLogout";
import { getAccountNodeServer } from "@/service/accout";

export default async function Home() {

  const {payload} = await getAccountNodeServer();
  return (
    <main >
      <h1>Home Page</h1>
      <h2>Account Info</h2>
      <pre>{payload?.email}</pre>
      <p>Check the console for more details.</p>
      <ButtonLogout />
    </main>
  );
}
