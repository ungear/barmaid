const storageName = 'barmaid-favorite-drinks'

export function getFavoriteDrinkIds(){
  return JSON.parse(localStorage.getItem(storageName)) || []
}

export function setFavoriteDrinkIds(idArray){
  localStorage.setItem(storageName, JSON.stringify(idArray))
}