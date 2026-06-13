import { useEffect, useState } from "react";
import { Table, Button, message, Space, Input, InputNumber, Modal } from "antd";
import AppLayout from "../components/AppLayout";
import { borrowEquipment } from "../services/borrowService";
import { addEquipment, getEquipment, deleteEquipment, updateEquipment } from "../services/equipmentService";


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

    const [search, setSearch] = useState("");
    const load = async () => {
        const res = await getEquipment();
        setData(res);
    };

    useEffect(() => {
        load();
    }, []);

    /* DELETE */
    const remove = (id: number) => {
        Modal.confirm({
            title: "Delete Equipment",
            content: "Are you sure you want to delete this item?",
            okText: "Yes, Delete",
            cancelText: "No",
            okType: "danger",

            onOk: async () => {
                await deleteEquipment(id);
                message.success("Deleted");
                load();
            },
        });
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

    const validateAddForm = () => {
        const { equipment_code, equipment_name, category, quantity, location } = addForm;

        if (!equipment_code || !equipment_name || !category || !location) {
            message.error("Please fill in all required fields");
            return false;
        }

        if (quantity === null || quantity === undefined || quantity < 0) {
            message.error("Quantity must be valid");
            return false;
        }

        return true;
    };

    const validateBorrowForm = () => {
        const { borrower_name, quantity } = borrowForm;

        if (!borrower_name) {
            message.error("Please enter borrower name");
            return false;
        }

        if (quantity === null || quantity === undefined || quantity <= 0) {
            message.error("Quantity must be valid");
            return false;
        }

        return true;
    };

    const submitAdd = async () => {
        if (!validateAddForm()) return;

        try {
            await addEquipment(addForm);
            message.success("Added");
            closeAdd();
            load();
        } catch (err: any) {
            message.error(err.message);
        }
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

        if (!validateBorrowForm()) {
            return;
        }

        await borrowEquipment(borrowForm);

        message.success("Borrow successful");

        closeBorrow();
        load();
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
            render: (qty: number) => {
                const isLow = qty <= 5;

                return (
                    <span
                        style={{
                            color: isLow ? "red" : "inherit",
                            fontWeight: isLow ? "bold" : "normal",
                        }}
                    >
                        {qty} {isLow && "[LOW STOCK]"}
                    </span>
                );
            },
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
                        size="medium"
                        type="primary"
                        onClick={() => openEdit(r)}
                    >
                        Edit
                    </Button>

                    <Button
                        danger
                        size="medium"
                        onClick={() => remove(r.id)}
                    >
                        Delete
                    </Button>

                    <Button
                        size="medium"
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
            <h1>Equipments</h1>
            <br />
            {/* HEADER */}
            <Button
                className="btn-add"
                type="primary"
                onClick={openAdd}
                style={{ marginBottom: 16 }}
            >
                Add Equipment
            </Button>

            {/* TABLE */}
            <Input
                placeholder="Search by code, name, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    marginBottom: 16, width: 300, marginLeft: 730,
                    borderColor: "grey"
                }}
            />

            <Table
                className="equipment-table"
                dataSource={data.filter((item) => {
                    const keyword = search.toLowerCase();

                    return (
                        item.equipment_code?.toLowerCase().includes(keyword) ||
                        item.equipment_name?.toLowerCase().includes(keyword) ||
                        item.category?.toLowerCase().includes(keyword)
                    );
                })}
                rowKey="id"
                columns={columns}
                pagination={{ pageSize: 6 }}
            />

            {/* ================= ADD MODAL ================= */}
            <Modal
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


            </Modal>

            {/* ================= EDIT MODAL ================= */}
            <Modal
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
            </Modal>

            {/* ================= BORROW MODAL ================= */}
            <Modal
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
            </Modal>
        </AppLayout>
    );
}

export default Equipment;