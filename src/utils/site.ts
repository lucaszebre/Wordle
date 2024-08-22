import { type NavItem, type NavItemFooter } from "@/types"

const links = {
  github:
    "",
  twitter: "https://twitter.com/pjborowiecki",
  linkedin: "https://www.linkedin.com/in/pjborowiecki",
  discord: "",
  authorsWebsite: "https://pjborowiecki.com",
  authorsGitHub: "https://github.com/pjborowiecki",
  openGraphImage: "https://saasyland.com/images/opengraph-image.png",
}

export const siteConfig = {
  name: "LetterEasy",
  description:"Writing motivation letter not gonna a problem anymore!",
  links,
  url: "https://saasyland.com",
  ogImage: links.openGraphImage,
  author: "pjborowiecki",
  hostingRegion: "fra1",
  keywords: ["SaaS", "Next.js", "app"],
  navItems: [
    // {
    //   title: "About",
    //   href: "/about",
    // },
    // {
    //   title: "Features",
    //   href: "/features",
    // }
    // ,
    // {
    //   title: "Pricing",
    //   href: "/pricing",
    // }
    // ,
    // {
    //   title: "FAQ",
    //   href: "/faq",
    // },
    // {
    //   title: "Docs",
    //   href: "/docs",
    // },
    // {
    //   title: "Blog",
    //   href: "/blog",
    // },
  ] satisfies NavItem[],
  navItemsMobile: [],
  navItemsFooter: [
    {
      title: "Company",
      items: [
        {
          title: "About",
          href: "/about",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
        {
          title: "Terms",
          href: "/tos",
          external: false,
        },
        {
          title: "Careers",
          href: "/careers",
          external: false,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          title: "Docs",
          href: "/docs",
          external: false,
        },
        {
          title: "FAQ",
          href: "/faq",
          external: false,
        },
        {
          title: "Blog",
          href: "/blog",
          external: false,
        },
        {
          title: "Contact",
          href: "/contact",
          external: false,
        },
      ],
    },
    {
      title: "Inspiration",
      items: [
        // {
        //   title: "Shadcn",
        //   href: "https://ui.shadcn.com/",
        //   external: true,
        // },
        // {
        //   title: "Taxonomy",
        //   href: "https://tx.shadcn.com/",
        //   external: true,
        // },
        // {
        //   title: "Skateshop",
        //   href: "https://skateshop.sadmn.com/",
        //   external: true,
        // },
        // {
        //   title: "Acme Corp",
        //   href: "https://acme-corp.jumr.dev/",
        //   external: true,
        // },
      ],
    },
  ] satisfies NavItemFooter[],
}
