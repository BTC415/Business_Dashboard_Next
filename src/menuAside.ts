import {
  mdiTableAccount,
  mdiViewDashboard,
  mdiCommentQuoteOutline,
  mdiLock,
  mdiAlertCircle,
  mdiCrowd,
  mdiBagPersonal,
  mdiViewList,
  mdiPencil,
  mdiCashSync,
  mdiReceiptTextCheck,
  mdiVuejs,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiViewDashboard,
    label: 'Dashboard',
  },
  {
    href: '/tables',
    label: 'Orders',
    icon: mdiBagPersonal,
  },
  {
    href: '/forms',
    label: 'Customers',
    icon: mdiCrowd,
  },
  {
    href: '/ui',
    label: 'Catalogue',
    icon: mdiPencil,
  },
  {
    href: '/responsive',
    label: 'Payouts',
    icon: mdiCashSync,
  },
  {
    href: '/',
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
