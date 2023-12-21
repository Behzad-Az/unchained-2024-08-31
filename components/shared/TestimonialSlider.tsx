"use client"

import Carousel from "nuka-carousel"
import { testimonials } from "@/constants"

const SliderItem = ({ submitter, content }: { submitter: string, content: string}) => (
  <div className="px-16 lg:px-[150px] xl:px-[250px] flex flex-col justify-center h-full pb-10">
    <p className="text-center text-lg font-semibold">" {content} "</p>
    <p className="text-center text-base mt-5">{submitter}</p>
  </div>
);

const TestimonialSlider = () => {
  return (
    <section className="w-full bg-primary-50 bg-dotted-pattern bg-contain py-8 px-8">
      <Carousel 
        wrapAround
        defaultControlsConfig={{
          nextButtonText: ">",
          nextButtonStyle: {
            borderRadius: 50,
            width: 50,
            height: 50,
            padding: 0,
            fontSize: 30
          },
          prevButtonText: "<",
          prevButtonStyle: {
            borderRadius: 50,
            width: 50,
            height: 50,
            padding: 0,
            fontSize: 30
          },
          pagingDotsStyle: {
            marginRight: 5,
            marginLeft: 5
          },
        }}
      >
        {
          testimonials.map((item, index) => <SliderItem key={index} submitter={item.submitter} content={item.content} />)
        }
      </Carousel>
    </section>
  )
}

export default TestimonialSlider