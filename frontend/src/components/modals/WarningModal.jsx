import { useContext, useEffect } from "react";
import { ThemeContext } from "../../themes";
import useApiCall from "../../hooks/useApiCall";

import Modal from ".";
import Text from "../Text";
import Button from "../Button";

export default function WarningModal({
    warningModal,
    setWarningModal,
    board,
    setBoard,
    getAllBoardsData
}) {
    const { loading, error, value: deletedboard, callApi: deleteboard } = useApiCall(`deleteBoard/${board?.id}`, 'DELETE')
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        if (deletedboard) {
            console.log(deletedboard)
            setWarningModal({ show: false })
            setBoard(null)
            getAllBoardsData()
        }
    }, [deletedboard])

    let target = {
        type: '',
        message: ''
    };
    if (warningModal.show) {
        switch (warningModal.target) {
            case 'board':
                target.type = 'board',
                    target.message = `Are you sure you want to delete the ‘${board.board_name}’ board? This action will remove all columns and tasks and cannot be reversed.`
                break;
            case 'task':
                target.type = 'task',
                    target.message = `Are you sure you want to delete the ‘${'task name'}’ task? This action will remove all subtasks and cannot be reversed.`
                break;

            default:
                break;
        }
    }

    return (
        <Modal
            modal={warningModal.show}
            action={() => setWarningModal({ show: false })}
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                rowGap: 24,
            }}
        >
            <Text
                variant="heading"
                size="l"
                text={`Delete this ${target.type}?`}
                color={theme.color.destructive}
            />
            <Text
                variant="body"
                size="l"
                text={`${target.message}`}
                color={theme.color.secondaryText}
            />
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    columnGap: 16
                }}
            >
                <Button
                    text="Delete"
                    variant="destructive"
                    style={{
                        width: '100%'
                    }}
                    onClick={() => deleteboard()}
                />
                <Button
                    text="Cancel"
                    variant="secondary"
                    style={{
                        width: '100%'
                    }}
                    onClick={() => setWarningModal({ show: false })}
                />
            </div>
        </Modal>
    )
}
