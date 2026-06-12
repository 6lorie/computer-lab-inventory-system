import { Modal } from "antd";

function ReusableModal({
    title,
    open,
    onCancel,
    onOk,
    children,
}: any) {
    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            onOk={onOk}
            okText="Save"
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {children}
            </div>
        </Modal>
    );
}

export default ReusableModal;