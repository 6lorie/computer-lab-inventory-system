import { Layout } from "antd";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";

const { Sider, Content } = Layout;

function AppLayout({ children }: any) {
  return (
    <Layout style={{ minHeight: "100vh" }}>

      {/* Sidebar */}
      <Sider width={220} >
        <Sidebar />
      </Sider>

      {/* Main Area */}
      <Layout>

        {/* Topbar */}
        
        <Layout >
          <Topbar />
        </Layout>

        {/* Page Content */}
        <Content
          style={{
            margin: 20,
            padding: 20,
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            minHeight: "80vh",
          }}
        >
          {children}
        </Content>

      </Layout>

    </Layout>
  );
}

export default AppLayout;