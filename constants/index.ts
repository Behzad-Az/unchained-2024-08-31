export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Building',
    route: '/buildings/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
]

export const buildingDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}