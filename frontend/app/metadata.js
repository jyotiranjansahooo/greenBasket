// app/metadata.js

export const siteMetadata = {
  title: {
    default: "Green Basket",
    template: "%s | Green Basket",
  },

  description:
    "Green Basket is an online marketplace connecting customers directly with local farmers for fresh vegetables, fruits, and organic products.",

  keywords: [
    "green basket",
    "farm products",
    "organic vegetables",
    "fresh fruits",
    "farmer marketplace",
    "agriculture",
    "vegetables online",
    "farm to table",
  ],

  authors: [
    {
      name: "Your Name",
      url: "https://greenbasket.vercel.app",
    },
  ],

  creator: "Your Name",

  metadataBase: new URL("https://greenbasket.vercel.app"),

  openGraph: {
    title: "Green Basket",
    description: "Buy fresh vegetables and fruits directly from local farmers.",

    url: "https://greenbasket.vercel.app",

    siteName: "Green Basket",

    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Green Basket",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Green Basket",

    description: "Fresh products directly from local farmers.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      {
        url: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/icon.png",
        sizes: "180x180",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "e-commerce",
};
