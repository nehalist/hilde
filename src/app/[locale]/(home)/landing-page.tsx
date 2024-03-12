"use client";

import { Container } from "@/components/container";
import { getProviders } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FaChartLine, FaHistory, FaTrophy } from "react-icons/fa";
import { GrAchievement } from "react-icons/gr";

interface LandingPageProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

function Hero() {
  const t = useTranslations("landingPage");

  return (
    <header className="py-20 sm:py-32 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.rich("header", {
              gradient: text => <span className="hilde">{text}</span>,
            })}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t("subheader")}
          </p>
          <p className="mt-2 text-sm leading-8 text-gray-600">
            {t.rich("subheader2", {
              link: text => (
                <a
                  href="https://github.com/nehalist/hilde"
                  rel="noreferrer"
                  className="text-indigo-600"
                >
                  {text}
                </a>
              ),
            })}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start tracking
            </a>
            <a
              href="#"
              className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Read the blog
            </a>
          </div>
        </div>
        {/*<div className="mt-16 flow-root sm:mt-24">*/}
        {/*  <img*/}
        {/*    src="https://placehold.co/500x300?text=Slide+1"*/}
        {/*    alt="App screenshot"*/}
        {/*    width={2432}*/}
        {/*    height={1442}*/}
        {/*    className="rounded-md shadow-2xl ring-1 ring-gray-900/10 z-0 relative"*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </header>
  );
}

function Features() {
  const features = [
    {
      icon: FaHistory,
      name: "Track your scores",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet scelerisque turpis a iaculis.",
    },
    {
      icon: FaTrophy,
      name: "Leagues",
      description: "Fobar",
    },
    {
      icon: FaChartLine,
      name: "Ranking system",
      description: "Fobar",
    },
    {
      icon: GrAchievement,
      name: "Achievements",
      description: "Fobar",
    },
  ];

  return (
    <section className="bg-default-100 z-10 relative py-20 border-t border-b dark:border-gray-700">
      <Container>
        <div className="grid grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-green-400">
              What can Hilde do for you?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
              Features
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              impedit perferendis suscipit eaque, iste dolor cupiditate
              blanditiis ratione.
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-200 lg:max-w-none">
              {features.map(feature => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900 dark:text-gray-50">
                    <feature.icon
                      className="absolute left-1 top-1 h-5 w-5 text-green-600"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <div className="mt-16 flow-root sm:mt-24">
              <img
                src="https://placehold.co/500x300?text=Slide+1"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10 z-0 relative"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function LandingPage({ providers }: LandingPageProps) {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}
