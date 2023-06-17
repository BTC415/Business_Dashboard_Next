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
        href: '/catalog',
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
        href: '/usermanage',
        label: 'User Management',
        icon: mdiTableAccount,
      },
      {
        label: 'Give Feedback',
        icon: mdiCommentQuoteOutline,
        target:"_blank",
        href: 'https://qjtaaeisshw.typeform.com/to/YXhQoiqC#store_id=94728&store_domain=mstshr&store_name=%D9%85%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1'
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
