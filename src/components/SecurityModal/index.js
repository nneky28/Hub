import React from "react"
import Modal from 'react-native-modal';
import { useSelector } from "react-redux";
import CreatePIN from "../../screens/Security/CreatePIN";
import ResetPIN from "../../screens/Security/ResetPIN";


const SecurityModal = () => {
    const [mode,setMode] = React.useState("CREATE_PIN")
    const isSecurityVisible = useSelector(state=>state.Config.isSecurityVisible)
    const onHide = () => {
        
    }
    const onModeChangeHandler = (type) => {
        setMode(type)
    }
    return(
        <Modal
            onModalHide={onHide}
            animationInTiming={500}
            animationOutTiming={10}
            backdropOpacity={0.2}
            animationIn="fadeInUp"
            animationOut="fadeInDown"
            swipeThreshold={0.3}
            style={{ justifyContent: 'flex-end', margin: 0 }}
            isVisible={isSecurityVisible}
        >
            { mode === "CREATE_PIN" ? <React.Fragment>
                <CreatePIN onModeChangeHandler={onModeChangeHandler} />
            </React.Fragment> : <ResetPIN onModeChangeHandler={onModeChangeHandler} />}
        </Modal>
    )
}

export default SecurityModal;