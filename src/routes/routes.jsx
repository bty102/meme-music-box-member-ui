import { Fragment } from "react"
import LoginPage from "../features/auth/pages/LoginPage"
import MyInfoPage from "../features/auth/pages/MyInfoPage"
import MainLayout from "../layouts/MainLayout/MainLayout"
import RoomListPage from "../features/room/pages/RoomListPage"
import RoomDetailPage from "../features/room/pages/RoomDetailPage"
import RoomBookingPage from "../features/room/pages/RoomBookingPage"
import InvoiceListPage from "../features/invoice/pages/InvoiceListPage"
import InvoiceDetailPage from "../features/invoice/pages/InvoiceDetailPage"
import BookingListPage from "../features/booking/pages/BookingListPage"
import BookingDetailPage from "../features/booking/pages/BookingDetailPage"
import ProductListPage from "../features/product/pages/ProductListPage"

const publicRoutes = [
    {path: '/login', page: LoginPage, layout: Fragment},
]

const privateRoutes = [
    {path: '/me', page: MyInfoPage, layout: MainLayout},
    {path: '/rooms', page: RoomListPage, layout: MainLayout},
    {path: '/rooms/detail/:id', page: RoomDetailPage, layout: MainLayout},
    {path: '/rooms/booking/:roomId', page: RoomBookingPage, layout: MainLayout},
    {path: '/invoices', page: InvoiceListPage, layout: MainLayout},
    {path: '/invoices/detail/:invoiceId', page: InvoiceDetailPage, layout: MainLayout},
    {path: '/bookings', page: BookingListPage, layout: MainLayout},
    {path: '/bookings/detail/:bookingId', page: BookingDetailPage, layout: MainLayout},
    {path: '/products', page: ProductListPage, layout: MainLayout},
]

export { publicRoutes, privateRoutes }