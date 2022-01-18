import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: {name: 'cil-speedometer'},

  },
  {
    title: true,
    name: 'Manage'
  },
  {
    name: 'Authors',
    url: '/authors',
    iconComponent: {name: 'cil-people'}
  },
  {
    name: 'Book types',
    url: '/types',
    iconComponent: {name: 'cil-lan'}
  },
  {
    name: 'Books',
    url: '/books',
    iconComponent: {name: 'cil-book'}
  },
];
