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
]

export default menuAside
