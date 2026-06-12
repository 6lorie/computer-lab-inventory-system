import { useEffect, useState } from "react";
import { Card, Row, Col, Table } from "antd";

import AppLayout from "../components/AppLayout";
import { getEquipment } from "../services/equipmentService";

import "../styles/reports.css";
import {columns_reports} from "../data/data";

function Reports() {
    const [data, setData] = useState<any[]>([]);

    async function load() {
        const res = await getEquipment();
        setData(res);
    }

    useEffect(() => { load();}, []);

    const totalEquipment = data.length;

    const totalQuantity = data.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
    );

    const totalAvailable = data.reduce(
        (sum, item) => sum + Number(item.available || 0),
        0
    );

    const totalCategories =
        new Set(data.map((x) => x.category)).size;

    return (
        <AppLayout>
          <h1>Reports</h1>
          <br />
            <div className="report-page">

                <Row gutter={16}>
                    <Col span={6}>
                        <Card className="report-card">
                            <h3>Total Equipment</h3>
                            <h1>{totalEquipment}</h1>
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card className="report-card">
                            <h3>Total Quantity</h3>
                            <h1>{totalQuantity}</h1>
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card className="report-card">
                            <h3>Available</h3>
                            <h1>{totalAvailable}</h1>
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card className="report-card">
                            <h3>Categories</h3>
                            <h1>{totalCategories}</h1>
                        </Card>
                    </Col>
                </Row>

                <Table
                    className="report-table"
                    style={{ marginTop: 20 }}
                    dataSource={data}
                    rowKey="id"
                    columns={columns_reports}
                    pagination={{pageSize:5}}
                />

            </div>
        </AppLayout>
    );
}

export default Reports;