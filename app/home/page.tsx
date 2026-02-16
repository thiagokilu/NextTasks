import { cookies } from "next/headers";
import HomeClient from "./HomeClient";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return <div>Não autorizado</div>;
  }

  const userRes = await fetch("http://localhost:3333/users/me", {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });

  if (!userRes.ok) {
    return <div>Não autorizado</div>;
  }

  const user = await userRes.json();

  const tasksRes = await fetch("http://localhost:3333/users/tasks", {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });

  const tasks = await tasksRes.json();

  return <HomeClient user={user} tasks={tasks} />;
}
