export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Upload Building Report',
    route: '/buildingreports/upload',
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
  imageUrl: '',
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}