

import Modal from "."

export default function TaskModal({
    modal,
    setModal
}) {
    return (
        <Modal
            modal={modal === 'taskmodal'}
            action={() => {
                if (modal === 'taskmodal') setModal('')
            }}
        >
            <div>task modal</div>
        </Modal>
    )
}
