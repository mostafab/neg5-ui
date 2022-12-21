import AuthenticatedLayout from "@features/auth/container";
import MyTournaments from "@features/myTournaments/container";

const MyTournamentsPage = () => <MyTournaments />;

MyTournamentsPage.getLayout = (page) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
);

export const getServerSideProps = async () => {
  return {
    props: {
      title: "Home | Neg 5",
    },
  };
};

export default MyTournamentsPage;
