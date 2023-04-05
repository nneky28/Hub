export type TextWithIconProps = { text : string,icon : string, fill : string}
export type SelectionModalProps = {
    isVisible : boolean,
    onHide : () => void
    navigation : () => void
}