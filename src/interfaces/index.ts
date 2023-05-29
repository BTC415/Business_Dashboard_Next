export type UserPayloadObject = {
  name: string
  email: string
  avatar: string
}

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey =
  | 'white'
  | 'light'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'waiting'
  | 'failed'
  | 'dashboard'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

export type BgKey = 'purplePink' | 'pinkRed'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info' | 'failed' | 'waiting'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Payment = 'Pending payment' | 'Paid'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string
  date: string
  type: TransactionType
  business: string
}

export type Client = {
  id: number
  avatar: string
  login: string
  name: string
  company: string
  city: string
  progress: number
  created: string
  created_mm_dd_yyyy: string
}
export type Order = {
  id: string
  customer: string
  salesAgent: string
  date: string
  payment: Payment
  orderAmt: number
  orderAmtVAT: number
  totalAmt: number
  zbooniFee: number
  zbooniFeeVAT: number
  total: number
  val: number
  eligable?: boolean
}
export type User = {
  id: string
  FirstName: string
  LastName: string
  Email: string
  Phone: string
  OrderCount: string
  DateCreated: string
  OrderValue: string
}
export type Catalogue = {
  ProductName:string
  cShopVisiblity:boolean
  ItemPrice:number
  Quantitiy:string //number
  QtySold:number
  TotalSold:number
  DateCreated:"Dec 8, 2022"
}

export type StyleKey = 'white' | 'basic'

export type UserForm = {
  username: string
  email: string
}
