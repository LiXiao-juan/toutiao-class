import storage from '@/utils/storage'
const ART = 'NEWS_ART'
export const getART = () => storage.get(ART)

export const setART = (id) => storage.set(ART, id)

export const removeART = () => storage.remove(ART)
