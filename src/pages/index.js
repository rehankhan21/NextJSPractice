// normally this import doesnt work on the client side
// but if used inside getStaticProps, next knows you are using it for server side coding
// nextjs specific imports
import fs from "fs/promises";
import path from "path";
import { useRef, useState } from "react";

// this makes it so we dont send a new request to the backend when we want to link to pages
// we remain in the same react app.
import Link from "next/link";

export default function Home(props) {
  const [feedbackItems, setFeedbackItems] = useState([]);

  // now we can expect to get a products key from our props
  const { products } = props;

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  }

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
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>

      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

// executes this func first to get the data for the above component.
// must always return an object with a props key
export async function getStaticProps(context) {
  // this now returns a promise with the data
  // process.cwd gives you the current working directory
  // process.cwd is the working directory then we add arguments to dive deeper into folders
  const filepath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filepath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    // not found gives you a 404 page
    return { notFound: true };
  }

  // revalidate tells nextjs that after x amount of time the page should be regenerated
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
