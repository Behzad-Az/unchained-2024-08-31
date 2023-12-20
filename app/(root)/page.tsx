import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllReports } from "@/lib/actions/report.actions";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  
  const reports = await getAllReports({
    query: "",
    category: "",
    page: 1,
    // limit: 6
  })

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid gird-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Self-serve tools for Vancouver homebuyers</h1>
            <p className="p-regular-20 md:p-regular-24">Real-estate isn't complicated. Yet, a multi-billion dollar industry pretends that it is.</p>
            <p className="p-regular-20 md:p-regular-24">We created self-serve data and AI tools to unchain Vancouverites from the industry.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#reports">Explore Now</Link>
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
      <section id="reports" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trusted by <br /> Thousands of Users</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          Category
        </div>
        <Collection
          data={reports?.data}
          emptyTitle="No reports found"
          emptyStateSubText="Come back later"
          collectionType="All_Reports"
          limit={6}
          page={1}
          totalPages={reports?.totalPages}
        />
      </section>
    </>
  );
};
