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
    submitter: "Angela Nickle, Richmond Condo Buyer in 2023",
    content: "Condo Whisperer is great! In my house serach, every time I found an interesting listing, Condo Whisperer would answer my questions about the condominium's maintenance issues, financial performance and bylaws. In a couple of minutes, I would feel empowered as though I had read the entire condo docs - a process that used to take hours if not days."
  },
  {
    submitter: "Chris Lyth, Coquitlam Condo Buyer in 2023",
    content: "I obtained my own mortgage pre-approval, shortlisted my properties, and began my search. I attended the open-house for what is now my home but unfortunately my realtor wasn't available on the open-house date. When viewing the unit by myself, I used Lifesaver 2.0 as my viewing checklist to ensure I check all the critical details. It gave me the confidence to proceed with my offer and to secure my dream home."
  },
  {
    submitter: "Ben Azampour, Renovation General Contractor in Vancouver, 2023",
    content: "I am amazed by the accuracy of the information that 21.R.E. provides. I decided to validate 21.R.E.'s information on my condo. Their AI is exceptional at picking out the important information, discarding the irrelevant stuff, and summarizing everything in plain English. Highly recommend their 1-Pagers if you plan on placing an offer on a condo!"
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