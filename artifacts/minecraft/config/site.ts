import { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Yojit Gaming Pro",
  description:
    "The official website for all things Yojit Gaming Pro.",
  url: "https://ygp.vercel.app",
  ogImage: "https://ygp.vercel.app/og.jpg",
  links: {
    twitter: "https://twitter.com/realYGP",
    github: "https://github.com/Yojit-Gaming-Pro",
  },
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Server",
      href: "/server",
    },
    {
      title: "Mods",
      href: "/mods",
    },
  ],
}
