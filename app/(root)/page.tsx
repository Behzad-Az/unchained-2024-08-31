import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import TestimonialSlider from "@/components/shared/TestimonialSlider";
import { getAllReports } from "@/lib/actions/report.actions";
import Image from "next/image";
import Link from "next/link";
import ChatBox from "@/components/shared/ChatBox";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter";

export default async function HomePage({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1
  const query = (searchParams?.query as string) || ""
  const category = (searchParams?.category as string) || ""

  const reports = await getAllReports({
    query,
    category,
    page,
    limit: 6
  })

  return (
    <>
      <section className="bg-dotted-pattern bg-contain py-5 md:py-10 bg-yellow-500">
        <div className="wrapper grid gird-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Self-Serve AI Tools for the Modern Homebuyer</h1>
            <p className="p-regular-20 md:p-regular-24">
              Today's homebuying demands quick decisions but the information needed for those decisions remains slow and inaccessible. It's time to modernize the homebuying experience.
            </p>
            <p className="p-regular-20 md:p-regular-24">
              We create self-serve AI tools to provide modern homebuyers relevant, unbiased and factual datapoints quickly.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#demo">Explore Now</Link>
            </Button>
          </div>
          <Image 
            src="/assets/images/hero-demo.png" 
            alt="hero"
            width={1000} 
            height={1000} 
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section id="demo" className="bg-dotted-pattern bg-contain py-5 md:py-10 bg-primary-50">
        <div className="wrapper grid gird-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Condo Whisperer</h1>
            <h3 className="h3-bold">Demo it here. No login required.</h3>
            <p className="p-regular-20 md:p-regular-24">
              As a homebuyer, resident, or curious Vancouverite, you should stay informed about what's happening inside the city's condos. We created an AI Chatbox to tell the unbiased, relevant and accurate story of every building.
            </p>
            <p className="p-regular-20 md:p-regular-24">
              Today's sample building is 909 Mainland Street. Use our AI Chatbot to learn everything you need about this building.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="/sign-in">Login for full access</Link>
            </Button>
          </div>
          <ChatBox />
        </div>
      </section>
      {/* <section className="bg-dotted-pattern bg-contain py-5 md:py-10 bg-primary-50">
        <div className="wrapper grid gird-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Walton AI</h1>
            <h3 className="h3-bold">Demo it here. No login required.</h3>
            <p className="p-regular-20 md:p-regular-24">
              Today's sample condo is 909 Mainland Street in Vancouver. Use our AI Chatbot to learn everything you need about this building.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#reports">Login for full access</Link>
            </Button>
          </div>
          <ChatBox />
        </div>
      </section> */}
      <section id="reports" className="wrapper my-8 flex flex-col gap-8 md:gap-12 bg-primary-50">
        <h2 className="h2-bold">Get your AI powered condo summary report for only $5</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search placeHolder="Search by address..." />
          <CategoryFilter />
        </div>
        <Collection
          data={reports?.data}
          emptyTitle="No reports found"
          emptyStateSubText="Come back later"
          collectionType="All_Reports"
          limit={6}
          page={page}
          totalPages={reports?.totalPages}
        />
      </section>
      <TestimonialSlider />
    </>
  );
};
