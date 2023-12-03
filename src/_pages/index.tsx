import { NextSeo } from "next-seo";
import { trpc } from "~/utils/trpc";
import { MatchTable } from "~/components/Elements";
import { MatchCreationForm } from "~/components/Form";
import { useStore } from "~/utils/store";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/_pages/api/auth/[...nextauth]";
import {Navbar, NavbarContent} from '@nextui-org/react';

const Home = () => {
  // const matches = trpc.matches.list.useQuery({
  //   limit: 5,
  //   season: selectedSeason,
  // });
  const { data: session } = useSession();

  return (
    <>
      <NextSeo title={undefined} />
      {session ? (
        <>
          <MatchCreationForm />
          {/*{matches.data && matches.data.length > 0 && (*/}
          {/*  <div className="mt-12">*/}
          {/*    <div className="text-center">*/}
          {/*      <h3 className="text-gray-400 uppercase text-sm my-2">*/}
          {/*        Recent Matches*/}
          {/*      </h3>*/}
          {/*    </div>*/}
          {/*    <MatchTable matches={matches.data} />*/}
          {/*  </div>*/}
          {/*)}*/}
        </>
      ) : (
        <div className="overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
              <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better workflow</p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                    iste dolor cupiditate blanditiis ratione.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                    {/*{features.map((feature) => (*/}
                    {/*  <div key={feature.name} className="relative pl-9">*/}
                    {/*    <dt className="inline font-semibold text-gray-900">*/}
                    {/*      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />*/}
                    {/*      {feature.name}*/}
                    {/*    </dt>{' '}*/}
                    {/*    <dd className="inline">{feature.description}</dd>*/}
                    {/*  </div>*/}
                    {/*))}*/}
                  </dl>
                </div>
              </div>
              <div className="sm:px-6 lg:px-0">
                <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
                  <div
                    className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                    aria-hidden="true"
                  />
                  <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                    <img
                      src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                      alt="Product screenshot"
                      width={2432}
                      height={1442}
                      className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
};
