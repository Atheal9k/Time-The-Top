export interface Coin {
  id: string
  coinSet: {
    pictureId: number | undefined
    price: number
  }
}
