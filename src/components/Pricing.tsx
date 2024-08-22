"use server"
import { auth } from "@/auth";
import { Button } from "./ui/button";

export const Pricing = async () => {

    const session = await auth()
    return (
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for ambitious like you</h2>
      </div>
      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for getting interview</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">$5</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>10 tokens/lettres</span>
                  </li>
                  
              </ul>
              <Button asChild variant={'secondary'} className="text-white bg-black focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:text-black dark:focus:ring-primary-900"><a href={`https://buy.stripe.com/test_dR6aH7acveFg5rOcMQ?prefilled_email=${session?.user?.email}`} target="_blank">Get started</a></Button>
          </div>
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold">Pro</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">If you want a jobs quickly</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">$8</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>25 tokens/lettres</span>
                  </li>
                  
              </ul>
              <Button asChild variant={'secondary'} className="text-white bg-black focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:text-black dark:focus:ring-primary-900"><a href={`https://buy.stripe.com/test_6oE02t84nbt43jGdQT?prefilled_email=${session?.user?.email}`} target="_blank">Get started</a></Button>
          </div>
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h3 className="mb-4 text-2xl font-semibold">Expert</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">If you want a jobs quickly</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">$15</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>50 tokens/lettres</span>
                  </li>
                  
              </ul>
              <Button asChild variant={'secondary'} className="text-white bg-black focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:text-black dark:focus:ring-primary-900"><a href={`https://buy.stripe.com/test_14k9D3ckD7cO9I45kl?prefilled_email=${session?.user?.email}`} target="_blank">Get started</a></Button>
          </div>
      </div>
  </div>
</section> 
      </div>
    );
  };