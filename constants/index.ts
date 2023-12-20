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
  category: '',
  price: '',
  isFree: false,
  url: '',
}