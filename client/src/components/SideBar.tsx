import { Menu } from "antd";
import { DashboardOutlined, DesktopOutlined, FileTextOutlined, BookOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  
  return (
     <div
      style={{
        height: "100%",
        background: "var(--panel)"
      }}
    >

      {/* Logo */}
      <div
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "bold"
        }}
      >
        Com Lab Inventory 
      </div>
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["dashboard"]}
      style={{
        height: "100%",
        background: "var(--panel)",
        border: "none",
        
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
        {
            key: "borrow-records",
            icon: <BookOutlined/>,
            label: "Borrow Records",
            onClick: () => navigate("/borrow-records")
        }
      ]}
    />
    </div>
  );
}

export default SideBar;