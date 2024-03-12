"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { locales } from "@/i18n";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();
  const t = useTranslations("layout");

  const switchLocale = (locale: string) => {
    if (!locales.includes(locale)) {
      return;
    }
    router.push(pathName, { locale });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light">{t(`locales.${locale}`)}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {locales.map(locale => (
          <DropdownItem key={locale} onClick={() => switchLocale(locale)}>
            {t(`locales.${locale}`)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
