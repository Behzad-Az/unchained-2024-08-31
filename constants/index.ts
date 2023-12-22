export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create New Report",
    route: "/reports/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
]

export const reportDefaultValues = {
  title: "",
  description: "",
  location: "",
  infoDate: new Date(),
  imgUrl: "",
  category: "",
  price: "",
  isFree: false,
  url: "",
}

export const testimonials: { submitter: string, content: string }[] = [
  {
    submitter: "Baba Raja, Coquitlam Home Buyer in 2021",
    content: "I obtained my own mortgage pre-approval, shortlisted the properties, attended the open-houses, and finally decided to place an offer. My realtor wasn’t even available to view the house that I finally selected. I really only needed my agent’s services to prepare the purchase offer. But now, [insert name] allows me to prepare and submit offers that are legally and professionally equivalent to an offer prepared by a registered real estate agent."
  },
  {
    submitter: "Angela Nickle, Richmond Home Buyer in 2023",
    content: "Before [insert name], I missed out on so many opportunities because I felt ashamed that my offer was too low, or because I felt guilty that I would squander my realtor’s time and reputation. Now, with [insert name], I can submit an offer independently on any property that I like for whatever price or terms that make me comfortable. I am buying the home for me, so my priorities come first."
  },
  {
    submitter: "Ben Azampour, Renovation General Contractor in Vancouver, 2023",
    content: "I submitted my first [insert name] offer in about 5 minutes. The same offer via my real estate agent used to take hours - if not days - mostly because of waiting, back and forth emails, and mistakes."
  },
]

export const mockChatLog: { content: string, sender: "gpt" | "user" }[] = [
  {
    content: "Ask me anything about 909 Mainland Street!",
    sender: "gpt"
  },
  // {
  //   content: "Tell me about the amenities",
  //   sender: "user"
  // },
  // {
  //   content: "The building has a gym, a party room with a pool table, a bike room and plenty of underground storage lockers. But to get to the lockers, or any of the lower parkade levels for that matter, you’ll have to navigate the narrow spiral pathway like you’re shooting a music video for Tokyo Drift.",
  //   sender: "gpt"
  // },
  // {
  //   content: "What about the bylaws?",
  //   sender: "user"
  // },
  // {
  //   content: "Only long-term rentals over are allowed. Short-term rentals less than 90 days are forbidden. There is no restriction on the number of rentals. Up to two pets are also allowed.",
  //   sender: "gpt"
  // },
  // {
  //   content: "Tell me about the major issues",
  //   sender: "user"
  // },
  // {
  //   content: "There is ongoing exterior repair work that has of course run way over schedule, but the council is already discussing another $890K of repairs to the parkade. And then of course there are the three elevators, one of which seems to be under repair every other day. If one elevator is down, and it's a moving day, just stay home or plan a long-dreaded wait",
  //   sender: "gpt"
  // }
]