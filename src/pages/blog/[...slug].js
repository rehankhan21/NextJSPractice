import { useRouter } from "next/router";

export default function BlogPostsPage() {
  const router = useRouter();

  //... is a catch all pathname, and puts it in an array of paths.

  console.log(router.pathname);
  console.log(router.query);

  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
}
