export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create New Report',
    route: '/reports/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
]

export const reportDefaultValues = {
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