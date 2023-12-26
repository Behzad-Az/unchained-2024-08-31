// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string
  firstName: string
  lastName: string
  username: string
  email: string
  photo: string
}

export type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}

// ====== REPORT PARAMS
export type CreateReportParams = {
  userId: string
  report: {
    title: string
    description: string
    location: string
    infoDate: Date
    imgUrl: string
    price: string
    isFree: boolean
    url: string
    category: string
  }
  path: string
}

export type UpdateReportParams = {
  userId: string
  report: {
    _id: string
    title: string
    description: string
    location: string
    infoDate: Date
    imgUrl: string
    price: string
    isFree: boolean
    url: string
    category: string
  }
  path: string
}

export type DeleteReportParams = {
  reportId: string
  path: string
}

export type GetAllReportsParams = {
  query: string
  category: string
  limit?: number
  page: number
}

export type GetReportsByUserParams = {
  userId: string
  limit?: number
  page: number
}

export type GetRelatedReportsByCategoryParams = {
  categoryId: string
  reportId: string
  limit?: number
  page: number | string
}

export type Report = {
  _id: string
  title: string
  description: string
  price: string
  isFree: boolean
  imgUrl: string
  location: string
  infoDate: Date
  url: string
  creator: {
    _id: string
    firstName: string
    lastName: string
  }
  category: {
    _id: string
    name: string
  }
}

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string
}

// ====== Chatlog PARAMS
export type CreateChatlogParams = {
  ip: string
  sender: "user" | "gpt"
  content: string
  sessionRef: string
  messageRef: string
}

// ====== SUBSCRIBER PARAMS
export type CreateSubscriberParams = {
  email: string
}

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  reportTitle: string
  reportId: string
  price: string
  isFree: boolean
  buyerId: string
}

export type CreateOrderParams = {
  stripeId: string
  reportId: string
  buyerId: string
  totalAmount: string
  createdAt: Date
}

export type GetOrdersByReportParams = {
  reportId: string
  searchString: string
}

export type GetOrdersByUserParams = {
  userId: string | null
  limit?: number
  page: string | number | null
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}