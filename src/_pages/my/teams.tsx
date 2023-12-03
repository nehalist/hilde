import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/_pages/api/auth/[...nextauth]";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { trpc } from "~/utils/trpc";
import { TeamModal } from "~/components/Elements";
import { ProfileLayout } from "~/components/Layout/ProfileLayout";

const MyTeams = () => {
  const teams = trpc.teams.list.useQuery();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  console.log(teams.data);

  return (
    <>
      <NextSeo title={undefined} />
      <Button color="success" onClick={onOpen}>
        Create new Team
      </Button>
      <TeamModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      <Table>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>bar</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {(teams?.data || []).map(team => (
            <TableRow key={team.id}>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.description}</TableCell>
              <TableCell>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

MyTeams.getLayout = page => <ProfileLayout>{page}</ProfileLayout>;

export default MyTeams;

export const getServerSideProps: GetServerSideProps = async context => {
  // TODO: requires auth

  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
};
