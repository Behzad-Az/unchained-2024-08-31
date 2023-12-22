"use client"

import Carousel from "nuka-carousel"
import { testimonials } from "@/constants"

const SliderItem = ({ submitter, content }: { submitter: string, content: string}) => (
  <div className="px-10 sm:px-16 lg:px-[150px] xl:px-[250px] flex flex-col justify-center h-full pb-10">
    <p className="text-center p-regular-18 md:p-regular-20 font-semibold">" {content} "</p>
    <p className="p-regular-12 md:p-regular-16 text-center text-base mt-5">{submitter}</p>
  </div>
);

const TestimonialSlider = () => {
  return (
    <section id="testimonials" className="w-full bg-yellow-500 bg-dotted-pattern bg-contain py-8 px-2 sm:px-8">
      <Carousel 
        wrapAround
        defaultControlsConfig={{
          nextButtonText: ">",
          nextButtonStyle: {
            borderRadius: 40,
            width: 40,
            height: 40,
            padding: 0,
            fontSize: 20
          },
          prevButtonText: "<",
          prevButtonStyle: {
            borderRadius: 40,
            width: 40,
            height: 40,
            padding: 0,
            fontSize: 20
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