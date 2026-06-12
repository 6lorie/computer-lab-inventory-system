import { useEffect, useState } from "react";
import { Table, Button, message, Tag } from "antd";

import AppLayout from "../components/AppLayout";
import {
    getBorrowRecords,
    returnEquipment,
} from "../services/borrowService";

function BorrowRecords() {
    const [data, setData] = useState<any[]>([]);

    const load = async () => {
        const res = await getBorrowRecords();
        setData(res);
    };

    useEffect(() => {
        load();
    }, []);

    const handleReturn = async (id: number) => {
        await returnEquipment({ borrow_id: id });

        message.success("Returned successfully");

        load();
    };

    const columns = [
        {
            title: "Equipment",
            render: (_: any, r: any) =>
                `${r.equipment_code} - ${r.equipment_name}`,
        },
        {
            title: "Borrower",
            dataIndex: "borrower_name",
        },
        {
            title: "Qty",
            dataIndex: "quantity",
        },
        {
            title: "Borrowed",
            dataIndex: "borrowed_date",
        },
        {
            title: "Returned",
            dataIndex: "returned_date",
            render: (v: any) => (v ? v : "-"),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: string) => (
                <Tag color={status === "Returned" ? "green" : "orange"}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "Action",
            render: (_: any, r: any) =>
                r.status === "Borrowed" ? (
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => handleReturn(r.id)}
                    >
                        Return
                    </Button>
                ) : (
                    <Button size="small" disabled>
                        Done
                    </Button>
                ),
        },
    ];

    return (
        <AppLayout>
            <h2>Borrow Records</h2>

            <Table
                dataSource={data}
                rowKey="id"
                columns={columns}
            />
        </AppLayout>
    );
}

export default BorrowRecords;