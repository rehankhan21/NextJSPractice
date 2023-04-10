import styles from "../styles/Home.module.css";

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
  return {
    props: {
      products: [
        {
          id: "p1",
          title: "Product 1",
        },
      ],
    },
  };
}
