import { Menu } from "antd";
import { DashboardOutlined, DesktopOutlined, FileTextOutlined,} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  
  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["dashboard"]}
      style={{
        
        height: "100%",
        background: "var(--panel)",
        borderRight: "1px solid var(--border)",
      }}
      items={[
        {
          key: "dashboard",
          icon: <DashboardOutlined />,
          label: "Dashboard",
          onClick: () => navigate("/dashboard"),
        },
        {
          key: "equipment",
          icon: <DesktopOutlined />,
          label: "Equipment",
          onClick: () => navigate("/equipment"),
        },
        {
          key: "reports",
          icon: <FileTextOutlined />,
          label: "Reports",
          onClick: () => navigate("/reports"),
        },
      ]}
    />
  );
}

export default SideBar;