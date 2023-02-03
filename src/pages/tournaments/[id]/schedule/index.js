import { useRouter } from "next/router";

import TournamentPublicView from "@components/tournaments/public/TournamentPublicView";

const TournamentPublicPage = () => {
  const router = useRouter();
  return <TournamentPublicView tournamentId={router.query.id} />;
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default TournamentPublicPage;
