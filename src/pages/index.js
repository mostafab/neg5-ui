import LoginPage from "features/login/container";

import { wrapper } from "store";
import { getServerSideUser } from "api/user";

const IndexPage = () => <LoginPage />;

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch, getState }) => {
    return async (ctx) => {
      const user = await getServerSideUser(ctx.req);
      if (user) {
        return {
          redirect: {
            destination: "/tournaments",
          },
        };
      }
    };
  }
);

export default IndexPage;
