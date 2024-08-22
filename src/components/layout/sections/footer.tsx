import { Separator } from "@/components/ui/separator";
import { ChevronsDownIcon, Mailbox } from "lucide-react";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="flex flex-row justify-between w-full ">
          <div className="col-span-full xl:col-span-2">
            <Link href="#" className="flex font-bold items-center">
              <Mailbox width={40} height={40} />

            </Link>
          </div>
          <div className="flex flex-row justify-between w-[30%]" >
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-lg">Contact</h3>
              <div>
                <Link href="#" className="opacity-60 hover:opacity-100">
                  Github
                </Link>
              </div>

              <div>
                <Link href="#" className="opacity-60 hover:opacity-100">
                  Twitter
                </Link>
              </div>

              <div>
                <Link href="#" className="opacity-60 hover:opacity-100">
                  Instagram
                </Link>
              </div>
            </div>

        

            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-lg">Help</h3>
              <div>
                <Link href="#" className="opacity-60 hover:opacity-100">
                  Contact Us
                </Link>
              </div>

              <div>
                <Link href="#" className="opacity-60 hover:opacity-100">
                  FAQ
                </Link>
              </div>

              <div>
                <Link href="#" className="opacity-60 hover:opacity-100">
                  Feedback
                </Link>
              </div>
            </div>
            </div>
          

         
        </div>

   
      </div>
    </footer>
  );
};
