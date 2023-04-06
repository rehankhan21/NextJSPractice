import styles from "../styles/Home.module.css";

// this makes it so we dont send a new request to the backend when we want to link to pages
// we remain in the same react app.
import Link from "next/link";

export default function Home() {
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
    </div>
  );
}
