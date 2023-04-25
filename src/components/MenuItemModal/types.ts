
export type MenuBodyListItem = {
    text : string
    icon? : React.ReactNode
  }
  
export type MenuItemModalProps = {
    isVisible : boolean
    onHide : () => void
    onPressHandler : (param : MenuBodyListItem) => void
    list : MenuBodyListItem[]
    title? : string
    type? : string
    loading? : boolean
}