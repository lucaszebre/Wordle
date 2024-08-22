import type { Metadata } from "next";

import { Pricing } from "@/components/Pricing";

export const metadata: Metadata = {
  title: "Donate with embedded Checkout | Next.js + TypeScript Example",
};

export default function DonatePage(): JSX.Element {
  return (
    <div className="page-container">
     
      {/* <CheckoutForm uiMode="hosted" /> */}
      <Pricing />
    </div>
  );
}