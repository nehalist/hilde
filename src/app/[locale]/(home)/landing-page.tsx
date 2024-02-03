"use client";

import { useTranslations } from "next-intl";
import Slider from "react-slick";
import { useTheme } from "next-themes";
import { Login } from "@/app/[locale]/(home)/login";
import { getProviders } from "next-auth/react";

function Stats() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">User</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              1.310
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Hero() {
  const t = useTranslations("landingPage");

  return (
    <div className="relative isolate pt-14">
      <div className="py-24 sm:py-14 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {t("header")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t("subheader")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src="https://placehold.co/2432x1442"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LandingPageProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

export function LandingPage({ providers }: LandingPageProps) {
  const t = useTranslations("landingPage");
  const { theme } = useTheme();

  const slides = [
    {
      title: "Easy UI",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://placehold.co/500x300?text=Slide+1",
    },
    {
      title: "Second slide",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://placehold.co/500x300?text=Slide+2",
    },
    {
      title: "Third slide",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://placehold.co/500x300?text=Slide+3",
    },
  ];

  return (
    <>
      <div className="container mx-auto max-w-5xl px-6 mt-40 grid grid-cols-4 gap-5">
        <div className="col-span-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.rich("header", {
              gradient: text => <span className="hilde">{text}</span>,
            })}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t("subheader")}
          </p>
          <div className="my-6">
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              arrows={false}
              autoplay={true}
              autoplaySpeed={5000}
            >
              {slides.map((slide, index) => (
                <div key={index} className="px-4 pt-0 pb-4 text-center">
                  <span className="mb-2 inline-block text-default-500 text-sm">
                    foobar...
                  </span>
                  <img
                    src={slide.image}
                    alt="App screenshot"
                    width={500}
                    height={300}
                    className="rounded-md shadow-lg ring-1 ring-gray-900/10"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <p className="mt-10 text-sm leading-8 text-gray-600">
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
        </div>
        <div className="col-span-2">
          <Login providers={providers} />
        </div>
      </div>
      {/*<Hero />*/}
      {/*<Stats />*/}
    </>
  );
}
