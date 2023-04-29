import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // fallback content
  if (!loadedProduct) {
    return <p>...loading</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filepath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filepath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  // params is a keyword that comes from context in nextjs
  const { params } = context;

  // similar to useRouter and getting the params from router.query
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// this tells nextjs which instance of the dynamic path we use generate
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    // pregenerating all the pages is not optimal
    // set to true and decide to only pregenerate some pages
    // only generates pages when needed, unless specified above
    // when using fallback we need to make sure to use a fallback state
    // can set fallback to 'blocking', this makes it so you dont need fallback state
    fallback: true,
  };
}

export default ProductDetailPage;
