import { useRouter } from "next/router";

export default function ClientProjectsPage(params) {
  const router = useRouter();

  function loadProjectHandler() {
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "projecta" },
    });
  }

  return (
    <div>
      <h1>The ClientProjectsPage</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}
