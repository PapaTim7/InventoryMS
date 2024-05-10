export type ProductConditionT =  'high' | 'medium' | 'low';

export type ProductT = {
  id: string
  name: string
  condition: ProductConditionT
  descriptionShort: string
  price: number
  quantity: number
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