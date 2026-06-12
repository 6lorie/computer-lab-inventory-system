import { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import AppLayout from "../components/AppLayout";

import {
    getEquipment,
    deleteEquipment
} from "../services/equipmentService";

function Equipment() {

const [data, setData] = useState([]);

async function load() {
    const res =
    await getEquipment();

    setData(res);
}

async function remove(id: number) {
    await deleteEquipment(id);
    message.success("Deleted");
    load();
}

useEffect(() => {
    load();
}, []);

return (
    <AppLayout>

        <Button
            type="primary"
            style={{ marginBottom: 16 }}
        >
            Add Equipment
        </Button>

        <Table
            dataSource={data}
            rowKey="id"
            columns={[
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
                    title: "Quantity",
                    dataIndex: "quantity",
                },
                {
                    title: "Location",
                    dataIndex: "location",
                },
                {
                    title: "Action",
                    render: (_, record: any) => (
                        <Button danger onClick={() => remove(record.id)}>
                            Delete
                        </Button>
                    )
                }
            ]}
        />

    </AppLayout>
);

}

export default Equipment;