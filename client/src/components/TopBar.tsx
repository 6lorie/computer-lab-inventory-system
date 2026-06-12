import { Layout, Dropdown, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../services/authStorage";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

function TopBar() {
  const navigate = useNavigate();

  const items = [
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        logout();
        navigate("/");
      },
    },
  ];

  return (
    <Header
      style={{
        
        background: "var(--panel)",
        
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 20,
      }}
    >
      
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Avatar
          style={{
            backgroundColor: "var(--accent)",
            cursor: "pointer",
          }}
          icon={<UserOutlined />}
        />
      </Dropdown>
    </Header>
  );
}

export default TopBar;