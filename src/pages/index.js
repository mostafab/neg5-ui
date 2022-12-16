import LoginPage from "features/login/container";
import { getServerSideUser } from "api/user";

const IndexPage = () => <LoginPage />;

export const getServerSideProps = async (ctx) => {
  const user = await getServerSideUser(ctx.req);
  if (user) {
    return {
      redirect: {
        destination: "/tournaments",
      },
    };
  }
  return {
    props: {
      title: "Welcome to Neg 5",
    },
  };
};

export default IndexPage;
