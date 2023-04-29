function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

// doesnt need getStaticPath cause this already runs on the server
export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
