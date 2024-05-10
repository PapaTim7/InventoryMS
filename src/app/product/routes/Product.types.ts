export type ProductQuantityT =  'high' | 'medium' | 'low';

export type ProductT = {
  id: string
  name: string
  quantity: ProductQuantityT
  descriptionShort: string
  price: number
  imagePreview: string
}

export type ProductFullT = ProductT & {
  descriptionFull: string
  imageFull: string
}

export type ProductDetailsDialogPropsT = {
  isDialogOpen: boolean
  onClose: () => void
  onActionClick: () => void
  onDeleteClick: () => void
  productDetails?: ProductFullT 
}