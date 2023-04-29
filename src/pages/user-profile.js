function UserProfilePage(props) {
  return <h1>{props.userName}</h1>;
}

export default UserProfilePage;

// gets called for every incoming request for this page
// this clashes with getStaticProps, so you only should use one or the other
// we get access to the full request object from context, req, res
// for highly dynamic data
export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      userName: "Max",
    },
  };
}
