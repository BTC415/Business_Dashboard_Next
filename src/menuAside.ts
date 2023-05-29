import {
  mdiTableAccount,
  mdiViewDashboard,
  mdiCommentQuoteOutline,
  mdiCrowd,
  mdiBagPersonal,
  mdiPencil,
  mdiCashSync,
  mdiReceiptTextCheck,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
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
    label: 'Give Feedback',
    icon: mdiCommentQuoteOutline,
    href: '/feedback'
  },
]

export default menuAside
