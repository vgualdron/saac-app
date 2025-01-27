import { useCommonStore } from './common'
import { useCollectionStore } from './collection'

export function resetAllStores() {
  const useCommon = useCommonStore()
  const useCollection = useCollectionStore()

  useCommon.$reset()
  useCollection.$reset()
  console.log('LogOut!')
}
