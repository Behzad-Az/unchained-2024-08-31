export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Building Report',
    route: '/buildingreports/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
]

export const buildingReportDefaultValues = {
  title: '',
  description: '',
  location: '',
  infoDate: new Date(),
  imgUrl: '',
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}