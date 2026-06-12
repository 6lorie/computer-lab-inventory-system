import { useEffect, useState } from "react";
import { Table, Button, message, Tag, Input } from "antd";

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
                        size="medium"
                        onClick={() => handleReturn(r.id)}
                    >
                        Return
                    </Button>
                ) : (
                    <Button size="medium" disabled>
                        Done
                    </Button>
                ),
        },
    ];

    const [search, setSearch] = useState("");
    return (
        <AppLayout>
            <h1>Borrow Records</h1>
            <br />

            <Input
                placeholder="Search by code, name, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    marginBottom: 16, width: 300, marginLeft: 860,
                    borderColor: "grey"
                }}
            />
            
            <Table
                dataSource={data.filter((item) => {
                    const keyword = search.toLowerCase();

                    return (
                        item.equipment_code.toLowerCase().includes(keyword) ||
                        item.borrower_name.toLowerCase().includes(keyword) ||
                        item.equipment_name.toLowerCase().includes(keyword)
                    );
                })}
                rowKey="id"
                columns={columns}
                pagination={{pageSize:6}}
            />
        </AppLayout>
    );
}

export default BorrowRecords;