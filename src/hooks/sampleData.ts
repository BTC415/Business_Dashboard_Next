import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const convSAR = arr => arr.map(elem => ("SAR " + elem.toFixed(2)))
export const useOrders = () => {
  const { data, error } = useSWR('/app/data-sources/orders.json', fetcher)

  return {
    orders: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
export const useCustomers = () => {
  // const { data, error } = useSWR('/app/data-sources/customers.json', fetcher)
  const { data, error } = useSWR('/api/v1/customer', fetcher)

  return {
    customers: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
export const useUsers = () => {
  const { data, error } = useSWR('/app/data-sources/users.json', fetcher)

  return {
    users: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
export const useCatalog = () => {
  // const { data, error } = useSWR('/app/data-sources/catalogue.json', fetcher)
  const { data, error } = useSWR('/api/v1/catalog', fetcher)

  return {
    catalog: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
export const usePayouts = () => {
  const { data, error } = useSWR('/app/data-sources/payouts.json', fetcher)

  return {
    payouts: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
export const useSampleClients = () => {
  const { data, error } = useSWR('/app/data-sources/clients.json', fetcher)

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSampleTransactions = () => {
  const { data, error } = useSWR('/app/data-sources/history.json', fetcher)

  return {
    transactions: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
