import { useEffect, useState } from "react";
import { Card, Col, Row, Table, Select } from "antd";
import { columns_reports } from "../data/data";

import { BarChart, Bar, XAxis,
    YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import AppLayout from "../components/AppLayout";
import { getEquipment } from "../services/equipmentService";

function Dashboard() {
    const [data, setData] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    async function load() {
        const res = await getEquipment();
        setData(res);
    }

    useEffect(() => {
        load();
    }, []);

    
    const selectedItem =
    data.find((item) => item.id === selectedId) ||
    data[3];

    const categories = Object.values(
        data.reduce((acc: any, item: any) => {
            if (!acc[item.category]) {
                acc[item.category] = {
                    name: item.category,
                    value: 0,
                };
            }

            acc[item.category].value += Number(item.quantity || 0);

            return acc;
        }, {})
    );

    const pie = selectedItem
        ? [
              {
                  name: "Available",
                  value: Number(selectedItem.available || 0),
              },
              {
                  name: "Used",
                  value:
                      Number(selectedItem.quantity || 0) -
                      Number(selectedItem.available || 0),
              },
          ]
        : [];

    return (
        <AppLayout>
            <h1>Dashboard</h1>

            <div className="dashboard">
                {/* CHARTS */}
                <Row gutter={16} style={{ marginTop: 20 }}>
                    {/* BAR CHART */}
                    <Col span={14}>
                        <Card className="dash-card">
                            <h3>Equipment by Category</h3>

                            <ResponsiveContainer width="100%" height={300}>
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

                    {/* PIE CHART */}
                    <Col span={10}>
                        <Card className="dash-card">
                            <h3>Availability per Item</h3>

                            <Select
                                placeholder="Select equipment"
                                style={{ width: "100%", marginBottom: 15 }}
                                onChange={(value) => setSelectedId(value)}
                                allowClear
                            >
                                {data.map((item) => (
                                    <Select.Option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.equipment_name}
                                    </Select.Option>
                                ))}
                            </Select>

                            {selectedItem ? (
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={pie}
                                            dataKey="value"
                                            outerRadius={90}
                                        >
                                            <Cell fill="#1677ff" />
                                            <Cell fill="#ff4d4f" />
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <p>Select an item to view availability</p>
                            )}
                        </Card>
                    </Col>
                </Row>

                {/* TABLE */}
                <Card className="dash-card" style={{ marginTop: 20 }}>
                    <h3>Recent Equipment</h3>
                    <br />

                    <Table
                        pagination={{ pageSize: 5 }}
                        dataSource={data}
                        rowKey="id"
                        columns={columns_reports}
                    />
                </Card>
            </div>
        </AppLayout>
    );
}

export default Dashboard;