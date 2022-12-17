import { getServerSideUser } from "api/user";

import AppLayout from "components/common/layout/AppLayout";
import MyTournaments from "features/myTournaments/container";

const TournamentPage = () => <MyTournaments />;

TournamentPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export const getServerSideProps = async (ctx) => {
  const user = await getServerSideUser(ctx.req);
  if (!user) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {
      title: "Home | Neg 5",
      user,
    },
  };
};

export default TournamentPage;
