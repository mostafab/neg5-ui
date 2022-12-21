import AuthenticatedLayout from "@features/auth/container";

const TournamentPage = () => "Hello";

TournamentPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);

export default TournamentPage;


