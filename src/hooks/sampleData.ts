import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useOrders = () => {
  const { data, error } = useSWR('/app/data-sources/orders.json', fetcher)

  return {
    orders: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
export const useCustomers = () => {
  const { data, error } = useSWR('/app/data-sources/customers.json', fetcher)

  return {
    customers: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
export const useCatalogue = () => {
  const { data, error } = useSWR('/app/data-sources/catalogue.json', fetcher)

  return {
    catalogue: data?.data ?? [],
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
