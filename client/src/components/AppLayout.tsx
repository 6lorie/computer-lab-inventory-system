import { Layout } from "antd";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";


const { Sider, Content } = Layout;

function AppLayout({ children }: any) {
  return (
    <Layout>

      {/* Sidebar */}
      <Sider width={220} >
        <Sidebar />
      </Sider>

      {/* Main Area */}
      <Layout style={{background:"var(--bg)"}}>

        {/* Topbar */}
        
        <Layout >
          <Topbar />
        </Layout>

        {/* Page Content */}
        <Content
          style={{
            
            margin: 20,
            padding: 20,
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