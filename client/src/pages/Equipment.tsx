import { useEffect, useState } from "react";
<<<<<<< HEAD
import { Table, Button, message, Space, Input, InputNumber } from "antd";

import AppLayout from "../components/AppLayout";
import ReusableModal from "../components/ReusableModal";
import { borrowEquipment } from "../services/borrowService";

import {
    addEquipment,
    getEquipment,
    deleteEquipment,
    updateEquipment,
} from "../services/equipmentService";
=======
import {Table, Button, message, Space, Modal,Input, InputNumber,} from "antd";
import AppLayout from "../components/AppLayout";
import { addEquipment, getEquipment, deleteEquipment, updateEquipment, } from "../services/equipmentService";
>>>>>>> main


function Equipment() {
    const [data, setData] = useState<any[]>([]);

    /* ADD */
    const [addOpen, setAddOpen] = useState(false);
    const [addForm, setAddForm] = useState<any>({
        equipment_code: "",
        equipment_name: "",
        category: "",
        quantity: 0,
        location: "",
    });

    /* EDIT */
    const [editOpen, setEditOpen] = useState(false);
    const [editForm, setEditForm] = useState<any>({});

    /* BORROW */
    const [borrowOpen, setBorrowOpen] = useState(false);
    const [borrowForm, setBorrowForm] = useState<any>({
        equipment_id: 0,
        borrower_name: "",
        quantity: 1,
    });

    /* LOAD */
    const load = async () => {
        const res = await getEquipment();
        setData(res);
    };

    useEffect(() => {
        load();
    }, []);

    /* DELETE */
    const remove = async (id: number) => {
        await deleteEquipment(id);
        message.success("Deleted");
        load();
    };

    /* ===================== ADD ===================== */

    const openAdd = () => setAddOpen(true);

    const closeAdd = () => {
        setAddOpen(false);
        setAddForm({
            equipment_code: "",
            equipment_name: "",
            category: "",
            quantity: 0,
            location: "",
        });
    };

    const handleAddChange = (field: string, value: any) => {
        setAddForm((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const submitAdd = async () => {
        await addEquipment(addForm);
        message.success("Added");
        closeAdd();
        load();
    };

    /* ===================== EDIT ===================== */

    const openEdit = (record: any) => {
        setEditForm(record);
        setEditOpen(true);
    };

    const closeEdit = () => {
        setEditOpen(false);
        setEditForm({});
    };

    const handleEditChange = (field: string, value: any) => {
        setEditForm((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const submitEdit = async () => {
        await updateEquipment(editForm.id, editForm);
        message.success("Updated");
        closeEdit();
        load();
    };

    /* ===================== BORROW ===================== */

    const openBorrow = (id: number) => {
        setBorrowForm({
            equipment_id: id,
            borrower_name: "",
            quantity: 1,
        });
        setBorrowOpen(true);
    };

    const closeBorrow = () => {
        setBorrowOpen(false);
        setBorrowForm({
            equipment_id: 0,
            borrower_name: "",
            quantity: 1,
        });
    };

    const handleBorrowChange = (field: string, value: any) => {
        setBorrowForm((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const submitBorrow = async () => {
        await borrowEquipment(borrowForm);

        message.success("Borrow successful");

        closeBorrow();
        load(); // refresh stock
    };

    /* ===================== TABLE ===================== */

    const columns = [
        {
            title: "Code",
            dataIndex: "equipment_code",
        },
        {
            title: "Name",
            dataIndex: "equipment_name",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Qty",
            dataIndex: "quantity",
        },
        {
            title: "Location",
            dataIndex: "location",
        },
        {
            title: "Action",
            render: (_: any, r: any) => (
                <Space>
                    <Button
                        size="small"
                        type="primary"
                        onClick={() => openEdit(r)}
                    >
                        Edit
                    </Button>

                    <Button
                        danger
                        size="small"
                        onClick={() => remove(r.id)}
                    >
                        Delete
                    </Button>

                    <Button
                        size="small"
                        onClick={() => openBorrow(r.id)}
                    >
                        Borrow
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <AppLayout>
            {/* HEADER */}
            <Button
                type="primary"
                onClick={openAdd}
                style={{ marginBottom: 16 }}
            >
                Add Equipment
            </Button>

            {/* TABLE */}
            <Table
                className="equipment-table"
                dataSource={data}
                rowKey="id"
                columns={columns}
            />

            {/* ================= ADD MODAL ================= */}
            <ReusableModal
                title="Add Equipment"
                open={addOpen}
                onCancel={closeAdd}
                onOk={submitAdd}
            >
                <Input
                    placeholder="Code"
                    value={addForm.equipment_code}
                    onChange={(e) =>
                        handleAddChange("equipment_code", e.target.value)
                    }
                />

                <Input
                    placeholder="Name"
                    value={addForm.equipment_name}
                    onChange={(e) =>
                        handleAddChange("equipment_name", e.target.value)
                    }
                />

                <Input
                    placeholder="Category"
                    value={addForm.category}
                    onChange={(e) =>
                        handleAddChange("category", e.target.value)
                    }
                />

                <InputNumber
                    style={{ width: "100%" }}
                    value={addForm.quantity}
                    onChange={(v) =>
                        handleAddChange("quantity", v)
                    }
                />

                <Input
                    placeholder="Location"
                    value={addForm.location}
                    onChange={(e) =>
                        handleAddChange("location", e.target.value)
                    }
                />
            </ReusableModal>

            {/* ================= EDIT MODAL ================= */}
            <ReusableModal
                title="Edit Equipment"
                open={editOpen}
                onCancel={closeEdit}
                onOk={submitEdit}
            >
                <Input
                    placeholder="Code"
                    value={editForm.equipment_code}
                    onChange={(e) =>
                        handleEditChange("equipment_code", e.target.value)
                    }
                />

                <Input
                    placeholder="Name"
                    value={editForm.equipment_name}
                    onChange={(e) =>
                        handleEditChange("equipment_name", e.target.value)
                    }
                />

                <Input
                    placeholder="Category"
                    value={editForm.category}
                    onChange={(e) =>
                        handleEditChange("category", e.target.value)
                    }
                />

                <InputNumber
                    style={{ width: "100%" }}
                    value={editForm.quantity}
                    onChange={(v) =>
                        handleEditChange("quantity", v)
                    }
                />

                <Input
                    placeholder="Location"
                    value={editForm.location}
                    onChange={(e) =>
                        handleEditChange("location", e.target.value)
                    }
                />
            </ReusableModal>

            {/* ================= BORROW MODAL ================= */}
            <ReusableModal
                title="Borrow Equipment"
                open={borrowOpen}
                onCancel={closeBorrow}
                onOk={submitBorrow}
            >
                <Input
                    placeholder="Borrower Name"
                    value={borrowForm.borrower_name}
                    onChange={(e) =>
                        handleBorrowChange("borrower_name", e.target.value)
                    }
                />

                <InputNumber
                    style={{ width: "100%" }}
                    min={1}
                    value={borrowForm.quantity}
                    onChange={(v) =>
                        handleBorrowChange("quantity", v)
                    }
                />
            </ReusableModal>
        </AppLayout>
    );
}

export default Equipment;