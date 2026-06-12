import AppLayout from "../components/AppLayout";
import { Typography } from "antd";

const { Title } = Typography;

function Dashboard() {
  return (
    <AppLayout>
      <Title style={{ color: "var(--text-h)" }}>
        Dashboard
      </Title>

      <p>Welcome to Computer Lab Inventory System</p>
    </AppLayout>
  );
}

export default Dashboard;