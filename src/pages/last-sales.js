import { useEffect, useState } from "react";
import useSWR from "swr";

// gets props from getStaticProps
function LastSalesPage(props) {
  // we can use pregeneration to set intial states with data
  // sales will not be undefined now
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);

  // requires url as param
  // by defualt is uses the fetch api, like below
  // built in error handling
  const { data, error } = useSWR(
    "https://nextevents-8aaf1-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     // add .json for firebase api request
  //     fetch("https://nextevents-8aaf1-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  //   if (isLoading) {
  //     return <p>...Loading</p>;
  //   }

  //   if (!sales) {
  //     return <p>No Data Yet</p>;
  //   }

  if (error) {
    return <p>failed to load</p>;
  }

  if (!data && !sales) {
    return <p>...Loading</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

// cant user hooks in getStaticProps
export async function getStaticProps() {
  //   return fetch(
  //     "https://nextevents-8aaf1-default-rtdb.firebaseio.com/sales.json"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = [];
  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       return { props: { sales: transformedSales }, revalidate: 10 };
  //     });
  const response = await fetch(
    "https://nextevents-8aaf1-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales }, revalidate: 10 };
}

export default LastSalesPage;
