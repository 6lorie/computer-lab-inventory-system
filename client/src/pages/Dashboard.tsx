import { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "antd";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import AppLayout from "../components/AppLayout";
import { getEquipment } from "../services/equipmentService";


function Dashboard() {
    const [data, setData] = useState<any[]>([]);

    async function load() {
        const res = await getEquipment();
        setData(res);
    }

    useEffect(() => {
        load();
    }, []);

    const totalEquipment = data.length;

    const totalQuantity =
        data.reduce(
            (sum, item) => sum + Number(item.quantity || 0),
            0
        );

    const totalAvailable =
        data.reduce(
            (sum, item) => sum + Number(item.available || 0),
            0
        );

    const used =
        totalQuantity - totalAvailable;

    const categories = Object.values(
        data.reduce((acc: any, item: any) => {
            if (!acc[item.category]) {
                acc[item.category] = {
                    name: item.category,
                    value: 0,
                };
            }

            acc[item.category].value += item.quantity;

            return acc;
        }, {})
    );

    const pie = [
        {
            name: "Available",
            value: totalAvailable,
        },
        {
            name: "Used",
            value: used,
        },
    ];

    return (
        <AppLayout>

            <div className="dashboard">

                {/* CARDS */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Card className="dash-card">
                            <h3>Total Equipment</h3>
                            <h1>{totalEquipment}</h1>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card className="dash-card">
                            <h3>Total Quantity</h3>
                            <h1>{totalQuantity}</h1>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card className="dash-card">
                            <h3>Available</h3>
                            <h1>{totalAvailable}</h1>
                        </Card>
                    </Col>
                </Row>

                {/* CHARTS */}
                <Row gutter={16} style={{ marginTop: 20 }}>

                    <Col span={14}>
                        <Card className="dash-card">

                            <h3>Equipment by Category</h3>

                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >
                                <BarChart data={categories}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />

                                    <Bar
                                        dataKey="value"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>

                        </Card>
                    </Col>

                    <Col span={10}>
                        <Card className="dash-card">

                            <h3>Availability</h3>

                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >
                                <PieChart>

                                    <Pie
                                        data={pie}
                                        dataKey="value"
                                        outerRadius={100}
                                    >

                                        <Cell fill="#1677ff" />

                                        <Cell fill="#ff4d4f" />

                                    </Pie>

                                    <Tooltip />

                                </PieChart>
                            </ResponsiveContainer>

                        </Card>
                    </Col>

                </Row>

                {/* TABLE */}

                <Card
                    className="dash-card"
                    style={{ marginTop: 20 }}
                >

                    <h3>Recent Equipment</h3>

                    <Table
                        pagination={false}
                        dataSource={data.slice(0, 5)}
                        rowKey="id"
                        columns={[
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
                        ]}
                    />

                </Card>

            </div>

        </AppLayout>
    );
}

export default Dashboard;