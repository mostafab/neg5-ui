import AuthenticatedLayout from "@features/auth/container";
import WithTournamentAccess from "@features/tournamentPermissions/container";
import TournamentRootView from "@components/tournaments/TournamentRootView";

const TournamentPage = () => (
  <WithTournamentAccess>
    <TournamentRootView />
  </WithTournamentAccess>
);

TournamentPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default TournamentPage;
