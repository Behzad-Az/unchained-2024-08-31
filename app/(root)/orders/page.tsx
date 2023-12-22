import Search from "@/components/shared/Search"
import { getOrdersByReport } from "@/lib/actions/order.actions"
import { IOrderItem } from "@/lib/mongodb/database/models/order.model"
import { formatDateTime, formatPrice } from "@/lib/utils"
import { SearchParamProps } from "@/types"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const OrdersPage = async({ searchParams }: SearchParamProps) => {
  const reportId = (searchParams?.reportId as string) || ''
  const searchText = (searchParams?.query as string) || ''

  const orders = await getOrdersByReport({ reportId, searchString: searchText })

  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left ">Orders</h3>
      </section>
      <section className="wrapper mt-8">
        <Search placeHolder="Search buyer name..." />
      </section>
      <section className="wrapper overflow-x-auto">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Event Tittle</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orders && orders.length === 0 ?
              (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">No orders found.</TableCell>
                </TableRow>
              ) :
              (
                <>
                  {orders.map((order: IOrderItem) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium text-primary-500">{order._id}</TableCell>
                      <TableCell>{order.reportTitle}</TableCell>
                      <TableCell>{order.buyer}</TableCell>
                      <TableCell>{formatDateTime(order.createdAt).dateOnly}</TableCell>
                      <TableCell className="text-right">{formatPrice(order.totalAmount)}</TableCell>
                  </TableRow>
                  ))}
                </>
              )
            }
          </TableBody>
        </Table>
      </section>
    </>
  )
}

export default OrdersPage