import { useEffect, useState } from "react";
import { Table, Button, message, Space } from "antd";
import AppLayout from "../components/AppLayout";
import "../styles/antd.css";
import "../styles/index.css";

import {
    getEquipment,
    deleteEquipment,
    updateEquipment,
} from "../services/equipmentService";

function Equipment() {
    const [data, setData] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<any>({});

    /* LOAD DATA */
    async function load() {
        const res = await getEquipment();
        setData(res);
    }

    useEffect(() => {
        load();
    }, []);

    /* DELETE */
    async function remove(id: number) {
        await deleteEquipment(id);
        message.success("Deleted");
        load();
    }

    /* START EDIT */
    function startEdit(record: any) {
        setEditingId(record.id);
        setEditForm({ ...record });
    }

    /* CANCEL EDIT */
    function cancelEdit() {
        setEditingId(null);
        setEditForm({});
    }

    /* HANDLE INPUT CHANGE */
    function handleChange(field: string, value: any) {
        setEditForm((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    }

    /* SAVE EDIT */
    async function saveEdit(id: number) {
        await updateEquipment(id, editForm);
        message.success("Updated");
        setEditingId(null);
        load();
    }

    return (
        <AppLayout>
            {/* ADD BUTTON (for future modal) */}
            <Button type="primary" style={{ marginBottom: 16 }}>
                Add Equipment
            </Button>

            <Table
                className="antd-table"
                dataSource={data}
                rowKey="id"
                columns={[
                    {
                        title: "Code",
                        dataIndex: "equipment_code",
                        render: (_: any, record: any) =>
                            editingId === record.id ? (
                                <input id="input-table"
                                    value={editForm.equipment_code}
                                    onChange={(e) =>
                                        handleChange(
                                            "equipment_code",
                                            e.target.value
                                        )
                                    }
                                />
                            ) : (
                                record.equipment_code
                            ),
                    },
                    {
                        title: "Name",
                        dataIndex: "equipment_name",
                        render: (_: any, record: any) =>
                            editingId === record.id ? (
                                <input id="input-table"
                                    value={editForm.equipment_name}
                                    onChange={(e) =>
                                        handleChange(
                                            "equipment_name",
                                            e.target.value
                                        )
                                    }
                                />
                            ) : (
                                record.equipment_name
                            ),
                    },
                    {
                        title: "Category",
                        dataIndex: "category",
                        render: (_: any, record: any) =>
                            editingId === record.id ? (
                                <input id="input-table"
                                    value={editForm.category}
                                    onChange={(e) =>
                                        handleChange("category", e.target.value)
                                    }
                                />
                            ) : (
                                record.category
                            ),
                    },
                    {
                        title: "Quantity",
                        dataIndex: "quantity",
                        render: (_: any, record: any) =>
                            editingId === record.id ? (
                                <input id="input-table"
                                    type="number"
                                    value={editForm.quantity}
                                    onChange={(e) =>
                                        handleChange("quantity", e.target.value)
                                    }
                                />
                            ) : (
                                record.quantity
                            ),
                    },
                    {
                        title: "Location",
                        dataIndex: "location",
                        render: (_: any, record: any) =>
                            editingId === record.id ? (
                                <input id="input-table"
                                    value={editForm.location}
                                    onChange={(e) =>
                                        handleChange("location", e.target.value)
                                    }
                                />
                            ) : (
                                record.location
                            ),
                    },

                    /* ACTION COLUMN */
                    {
                        title: "Action",
                        render: (_: any, record: any) =>
                            editingId === record.id ? (
                                <Space>
                                    <Button
                                        type="primary"
                                        size="small"
                                        onClick={() => saveEdit(record.id)}
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
                                        type="primary"
                                        size="small"
                                        onClick={() => startEdit(record)}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        danger
                                        size="small"
                                        onClick={() => remove(record.id)}
                                    >
                                        Delete
                                    </Button>
                                </Space>
                            ),
                    },
                ]}
            />
        </AppLayout>
    );
}

export default Equipment;