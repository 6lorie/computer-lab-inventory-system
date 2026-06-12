import { useEffect, useState } from "react";
import {Table, Button, message, Space, Modal,Input, InputNumber,} from "antd";
import AppLayout from "../components/AppLayout";
import { addEquipment, getEquipment, deleteEquipment, updateEquipment, } from "../services/equipmentService";

function Equipment() {
    const [data, setData] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<any>({});

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [addForm, setAddForm] = useState<any>({
        equipment_code: "",
        equipment_name: "",
        category: "",
        quantity: 0,
        location: "",
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

    /* EDIT */
    const startEdit = (record: any) => {
        setEditingId(record.id);
        setEditForm({ ...record });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleEditChange = (field: string, value: any) => {
        setEditForm((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const saveEdit = async (id: number) => {
        await updateEquipment(id, editForm);
        message.success("Updated");
        cancelEdit();
        load();
    };

    /* ADD */
    const openAdd = () => setIsAddOpen(true);

    const closeAdd = () => {
        setIsAddOpen(false);
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

    /* TABLE COLUMNS */
    const columns = [
        {
            title: "Code",
            dataIndex: "equipment_code",
            render: (_: any, r: any) =>
                editingId === r.id ? (
                    <Input
                    className="table-input"
                        value={editForm.equipment_code}
                        onChange={(e) =>
                            handleEditChange("equipment_code", e.target.value)
                        }
                    />
                ) : (
                    r.equipment_code
                ),
        },
        {
            title: "Name",
            dataIndex: "equipment_name",
            render: (_: any, r: any) =>
                editingId === r.id ? (
                    <Input
                    className="table-input"
                        value={editForm.equipment_name}
                        onChange={(e) =>
                            handleEditChange("equipment_name", e.target.value)
                        }
                    />
                ) : (
                    r.equipment_name
                ),
        },
        {
            title: "Category",
            dataIndex: "category",
            render: (_: any, r: any) =>
                editingId === r.id ? (
                    <Input
                    className="table-input"
                        value={editForm.category}
                        onChange={(e) =>
                            handleEditChange("category", e.target.value)
                        }
                    />
                ) : (
                    r.category
                ),
        },
        {
            title: "Qty",
            dataIndex: "quantity",
            render: (_: any, r: any) =>
                editingId === r.id ? (
                    <InputNumber
                    className="table-input"
                        value={editForm.quantity}
                        onChange={(v) => handleEditChange("quantity", v)}
                        style={{ width: "100%" }}
                    />
                ) : (
                    r.quantity
                ),
        },
        {
            title: "Location",
            dataIndex: "location",
            render: (_: any, r: any) =>
                editingId === r.id ? (
                    <Input
                        className="table-input"
                        value={editForm.location}
                        onChange={(e) =>
                            handleEditChange("location", e.target.value)
                        }
                    />
                ) : (
                    r.location
                ),
        },
        {
            title: "Action",
            render: (_: any, r: any) =>
                editingId === r.id ? (
                    <Space>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => saveEdit(r.id)}
                        >
                            Save
                        </Button>
                        <Button size="small" onClick={cancelEdit}>
                            Cancel
                        </Button>
                    </Space>
                ) : (
                    <Space>
                        <Button
                            size="small"
                            type="primary"
                            onClick={() => startEdit(r)}
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
                    </Space>
                ),
        },
    ];

    return (
        <AppLayout>
            <Button type="primary" onClick={openAdd} style={{ marginBottom: 16 }}>
                Add Equipment
            </Button>

            <Table
                className="antd-table"
                dataSource={data}
                rowKey="id"
                columns={columns}
            />

            <Modal
                title="Add Equipment"
                open={isAddOpen}
                onCancel={closeAdd}
                onOk={submitAdd}
                okText="Save"
            >
                <div className="equipment-form">
                    <Input
                        className="table-input"
                        placeholder="Code"
                        value={addForm.equipment_code}
                        onChange={(e) =>
                            handleAddChange("equipment_code", e.target.value)
                        }
                    />
                    <Input
                    className="table-input"
                        placeholder="Name"
                        value={addForm.equipment_name}
                        onChange={(e) =>
                            handleAddChange("equipment_name", e.target.value)
                        }
                    />
                    <Input
                    className="table-input"
                        placeholder="Category"
                        value={addForm.category}
                        onChange={(e) =>
                            handleAddChange("category", e.target.value)
                        }
                    />
                    <InputNumber
                    className="table-input"
                        style={{ width: "100%" }}
                        value={addForm.quantity}
                        onChange={(v) => handleAddChange("quantity", v)}
                    />
                    <Input
                    className="table-input"
                        placeholder="Location"
                        value={addForm.location}
                        onChange={(e) =>
                            handleAddChange("location", e.target.value)
                        }
                    />
                </div>
            </Modal>
        </AppLayout>
    );
}

export default Equipment;