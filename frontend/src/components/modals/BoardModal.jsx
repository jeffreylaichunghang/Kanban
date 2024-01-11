import { useContext } from "react";
import { ThemeContext } from "../../themes";

import Modal from ".";
import Text from "../Text";

export default function BoardModal({
    board
}) {
    return (
        <Modal>
            <Text
                variant="heading"
                size="l"
                text="Add New Board"
            />
        </Modal>
    )
}
