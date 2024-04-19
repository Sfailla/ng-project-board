import { ApolloCache, DocumentNode, FetchResult } from '@apollo/client'

export function updateApolloCache<T, D>(
  query: DocumentNode,
  writeQueryData: (store: ApolloCache<T>, storeData: T, data: D) => void
) {
  return (store: ApolloCache<T>, { data }: FetchResult<D>) => {
    const storeData = store.readQuery<T>({ query })

    if (storeData && data) {
      writeQueryData(store, storeData, data)
    }
  }
}
