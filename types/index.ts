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

// ====== BUILDING REPORT PARAMS
export type CreateBuildingReportParams = {
  userId: string
  buildingReport: {
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

export type UpdateBuildingReportParams = {
  userId: string
  buildingReport: {
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

export type DeleteBuildingReportParams = {
  buildingReportId: string
  path: string
}

export type GetAllBuildingReportsParams = {
  query: string
  category: string
  limit?: number
  page: number
}

export type GetBuildingReportsByUserParams = {
  userId: string
  limit?: number
  page: number
}

export type GetRelatedBuildingReportsByCategoryParams = {
  category: string
  buildingReportId: string
  limit?: number
  page: number | string
}

export type BuildingReport = {
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

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  buildingReportTitle: string
  buildingReportId: string
  price: string
  isFree: boolean
  buyerId: string
}

export type CreateOrderParams = {
  stripeId: string
  buildingReportId: string
  buyerId: string
  totalAmount: string
  createdAt: Date
}

export type GetOrdersByBuildingReportParams = {
  buildingReportId: string
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