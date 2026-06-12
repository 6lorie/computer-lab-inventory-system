import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  message,
} from "antd";

import { login } from "../services/authService";

import "../styles/login.css";

import { useNavigate } from "react-router-dom";

import { saveUser } from "../services/authStorage";

const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const res = await login(values);

      // 💾 save user to localStorage
      saveUser(res.user);

      message.success(res.message);

      // 🚀 redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      message.error("Wrong credentials");
    }
  };

  return (
    <div className="login-container">

      <Card className="login-card">

        <div className="login-header">

          <Text className="login-system">
            COMPUTER LABORATORY MANAGEMENT SYSTEM
          </Text>

          <Title level={2} className="login-title">
            Login
          </Title>

          <Text className="login-subtitle">
            Inventory & Equipment Management
          </Text>

        </div>

        <Form layout="vertical" onFinish={onFinish}>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter username",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="login-submit"
            >
              Login
            </Button>
          </Form.Item>

        </Form>

      </Card>

    </div>
  );
}

export default Login;