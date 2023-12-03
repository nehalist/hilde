import { AdminLayout } from "~/components/Layout/AdminLayout";
import { GetServerSideProps } from "next";

const Admin = () => {
  return <AdminLayout>Hello there</AdminLayout>;
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/admin/seasons",
      permanent: false,
    },
  };
};
