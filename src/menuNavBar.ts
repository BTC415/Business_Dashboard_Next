import {
  mdiMenu,
  mdiTableAccount,
  mdiViewDashboard,
  mdiCommentQuoteOutline,
  mdiCrowd,
  mdiBagPersonal,
  mdiPencil,
  mdiCashSync,
  mdiReceiptTextCheck,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiGithub,
  mdiVuejs,
} from '@mdi/js'
import { MenuNavBarItem } from './interfaces'

const menuNavBar: MenuNavBarItem[] = [
  {
    icon: mdiMenu,
    label: 'Menu',
    menu: [
      {
        href: '/dashboard',
        icon: mdiViewDashboard,
        label: 'Dashboard',
      },
      {
        href: '/orders',
        label: 'Orders',
        icon: mdiBagPersonal,
      },
      {
        href: '/customers',
        label: 'Customers',
        icon: mdiCrowd,
      },
      {
        href: '/catalogue',
        label: 'Catalogue',
        icon: mdiPencil,
      },
      {
        href: '/payouts',
        label: 'Payouts',
        icon: mdiCashSync,
      },
      {
        href: '/invoices',
        label: 'Tax Invoice',
        icon: mdiReceiptTextCheck,
      },
      {
        href: '/profile',
        label: 'User Management',
        icon: mdiTableAccount,
      },
      {
        isDivider: true,
      },
      {
        label: 'Give Feedback',
        icon: mdiCommentQuoteOutline,
        href: '/feedback',
      },
    ],
  },
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'Profile',
        href: '/profile',
      },
      {
        icon: mdiCogOutline,
        label: 'Settings',
      },
      {
        icon: mdiEmail,
        label: 'Messages',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        isLogout: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    icon: mdiLogout,
    label: 'Log out',
    isDesktopNoLabel: true,
    isLogout: true,
  },
]

export default menuNavBar
