// normally this import doesnt work on the client side
// but if used inside getStaticProps, next knows you are using it for server side coding
// nextjs specific imports
import fs from "fs/promises";
import path from "path";

// this makes it so we dont send a new request to the backend when we want to link to pages
// we remain in the same react app.
import Link from "next/link";

export default function Home(props) {
  // now we can expect to get a products key from our props
  const { products } = props;

  return (
    <div>
      <h1>hello world</h1>
      <ul>
        <li>
          <Link replace href="/portfolio">
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
      </ul>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

// executes this func first to get the data for the above component.
// must always return an object with a props key
export async function getStaticProps() {
  // this now returns a promise with the data
  // process.cwd gives you the current working directory
  // process.cwd is the working directory then we add arguments to dive deeper into folders
  const filepath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filepath);
  const data = JSON.parse(jsonData);

  // revalidate tells nextjs that after x amount of time the page should be regenerated
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
