import LoginPage from "features/login/container";

import { wrapper } from 'store';
import client from 'api/_client';

const IndexPage = () => <LoginPage />;

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch, getState }) => {
    return async (ctx) => {
      console.log(ctx.req.cookies);
    };
  }
);

export default IndexPage;
