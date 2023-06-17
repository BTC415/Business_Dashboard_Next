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
export type Customer = {
  _id: string
  FirstName: string
  LastName: string
  Email: string
  Phone: string
  Notes:string
  // OrderCount: string
  createdAt : string
  // OrderValue: string
}
export type User = {
  UserID: string
  SubAccountName: string
  RoleType: string
  CreatedOn: string
  LastLogin: string
  AccountStatus: string
}
export type Catalog = {
  _id:string
  ProductName:string
  cShopVisiblity:boolean
  Delivery:boolean
  ItemPrice:number
  Quantity:string //number
  // QtySold:number
  // TotalSold:number
  createdAt:string
}
export type Payout = {
  PayoutID:string
  DateRequested:string
  PayoutStatus:string
  AmountRequested:string
  PayoutFees:string
  NetPayable:string
}

export type StyleKey = 'white' | 'basic'

export type UserForm = {
  username: string
  email: string
}
