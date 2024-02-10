"use client";

import { useTranslations } from "next-intl";
import Slider from "react-slick";
import { useTheme } from "next-themes";
import { getProviders } from "next-auth/react";
import { Login } from "@/app/[locale]/(home)/login";

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
    </>
  );
}
