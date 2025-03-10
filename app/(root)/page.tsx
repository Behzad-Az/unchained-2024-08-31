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
import { Separator } from "@/components/ui/separator";
import { headers } from "next/headers";

export default async function HomePage({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1
  const query = (searchParams?.query as string) || ""
  const category = (searchParams?.category as string) || ""

  const reports = await getAllReports({
    query,
    category,
    page,
    limit: 3
  })

  const header = headers()
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  return (
    <>
      <section className="bg-dotted-pattern bg-contain py-5 md:py-10 bg-yellow-500 xl:px-5">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Self-Serve AI Tools for the Modern Homebuyer</h1>
            <p className="p-regular-18 md:p-regular-24">
              Today's homebuying demands quick decisions but the information needed for those decisions remains slow and inaccessible.
            </p>
            <p className="p-regular-18 md:p-regular-24">
              We create self-serve AI tools to provide homebuyers relevant, unbiased and factual datapoints quickly and directly for a modernized homebuying experience.
            </p>
            <Button size="lg" asChild className="button w-full md:w-fit">
              <Link href="#condo-whisperer">👇🏻 Explore Free Live Demos 👇🏻</Link>
            </Button>
          </div>
          <div className="flex w-full flex-center">
            <Image 
              src="/assets/images/hero-demo.png" 
              alt="hero"
              width={1000} 
              height={1000} 
              className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
            />
          </div>
        </div>
      </section>
      <Separator />
      <section id="condo-whisperer" className="bg-dotted-pattern bg-contain py-5 md:py-10 bg-primary-50 xl:px-5">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Condo Whisperer</h1>
            <h3 className="h3-bold">Ask questions about a condo as if you had a friend living there.</h3>
            <p className="p-regular-18 md:p-regular-20">
              As a homebuyer, resident, or curious Vancouverite, you should stay informed about what's happening inside the city's condos. We created an AI Chatbox to tell the unbiased, relevant and accurate story of every building.
            </p>
            <p className="p-regular-18 md:p-regular-20">
              <Link href="#chatbox" className="text-primary-500 font-semibold">Today's free live demo</Link> is 909 Mainland Street. Ask your questions from our AI Chatbot to learn everything you need about this building. No login required.
            </p>
            <Button size="lg" asChild className="button w-full md:w-fit">
              <Link href="/subscribe">Access Full ChatBot</Link>
            </Button>
          </div>
          <ChatBox clientIp={ip} />
        </div>
      </section>
      <Separator />
      <section id="one-pager" className="wrapper py-8 flex flex-col gap-8 md:gap-12 bg-dotted-pattern bg-contain xl:px-5">
        <h1 className="h1-bold">1-Pager</h1>
        <h3 className="h3-bold">AI generated fact sheets for your condo buying decision.</h3>
        <p className="p-regular-18 md:p-regular-20">
          Our AI analyzes thousands of strata documents and user questions daily to summarize the latest relevant building facts in plain language on a concise one-pager.
        </p>
        <Button size="lg" asChild className="button w-full md:w-fit">
          <Link href="/subscribe">Browse All 1-Pagers</Link>
        </Button>
        <div className="ring-1 ring-offset-8 rounded ring-gray-300 flex flex-col gap-8 bg-white">
          <p className="p-medium-20 text-center">Preview</p>
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <Search placeHolder="Search by address..." />
            <CategoryFilter />
          </div>
          <Collection
            data={reports?.data}
            emptyTitle="No reports found"
            emptyStateSubText="Come back later"
            collectionType="All_Reports"
            limit={3}
            page={page}
            totalPages={reports?.totalPages}
          />
        </div>
      </section>
      <Separator />
      <section id="lifesaver" className="bg-dotted-pattern bg-contain py-5 md:py-10 bg-primary-50 xl:px-5">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Lifesaver 2.0</h1>
            <h3 className="h3-bold">Know what to check when you view the condo.</h3>
            <p className="p-regular-18 md:p-regular-20">
              Over 50 simple checklist items compiled by 100s of inspectors, contractors and investors to avoid future “how did we miss this” moments.
            </p>
            <Button size="lg" asChild className="button w-full md:w-fit">
              <Link href="/subscribe">Get Your Free Copy</Link>
            </Button>
          </div>
          <Image 
            src="/assets/images/documents.jpeg" 
            alt="hero"
            width={1000} 
            height={1000} 
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] rounded-xl"
          />
        </div>
      </section>
      <Separator />
      <TestimonialSlider />
      <Separator />
      <section id="our-story" className="bg-dotted-pattern bg-contain py-5 md:py-10 bg-primary-50 xl:px-5">
        <div className="wrapper flex flex-col justify-center gap-8">
          <h1 className="h1-bold">Our Story</h1>
          <p className="p-regular-18 md:p-regular-20">
            In 2017, my partner and I purchased our first one-bedroom condo in Vancouver. Then in 2023, we sold our one-bedroom, and upsized into a two-bedroom to grow our family. The same frustrating questions crossed our minds in both transaction. Why are the condo documents so disorganized? Why are they so long? How do we know we understood everything important?
          </p>
          <p className="p-regular-18 md:p-regular-20">
            We asked around our family and friends, and soon realized that most of our peers felt the same way! So we set out on leveraging data and AI technologies to create self-serve tools to help average Vancouverites navigate the homebuying experience on their own better, quicker, and more conveniently than before.
          </p>
          <Button size="lg" asChild className="button w-full md:w-fit">
            <Link href="/subscribe">Join Now</Link>
          </Button>
        </div>
      </section>
    </>
  );
};
