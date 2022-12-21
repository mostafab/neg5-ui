import AuthenticatedLayout from "@features/auth/container";

const TournamentPage = () => <div>Hello</div>;

TournamentPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);

export default TournamentPage;
