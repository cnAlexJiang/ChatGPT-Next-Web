"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./login.module.scss";
import { Button, Checkbox, Form, Input, message, Space } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { requestCaptcha, login } from "../requests";
import { useRouter } from "next/navigation";

// const useCountDown = (s: number) => {
//   const [seconds, setSeconds] = useState(s);
//   useEffect(() => {
//     setTimeout(() => {
//       if (seconds > 0) {
//         setSeconds(seconds - 1);
//       }
//     }, 1000);
//   }, [seconds]);

//   return [seconds, setSeconds];
// };

// const Counter = () => {
//   const [seconds, setSeconds] = useCountDown(0);
//   return (
//     <button disabled={seconds !== 0} onClick={() => setSeconds(4)}>
//       {seconds > 0 ? `${seconds}s后可点击` : "点击开始倒计时"}
//     </button>
//   );
// };

const PhoneLogin: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const sendCode = async () => {
    setDisabled(true);
    try {
      const data = await form.validateFields(["phone"]);
      const res = await requestCaptcha(data.phone);
      console.log(22, "send code res=", res);
    } catch (e) {
      console.log(e);
    }
  };

  const loginHandle = async () => {
    try {
      const data = await form.validateFields(["phone", "captcha"]);
      const res = await login(data);
      console.log(22, "loginHandle=", res);
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      messageApi
        .open({
          type: "success",
          content: "登录成功!",
          duration: 1,
        })
        .then(() => {
          router.push("/");
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Form
      form={form}
      name="login"
      wrapperCol={{ flex: 1 }}
      layout="vertical"
      style={{ width: "100%" }}
    >
      {contextHolder}

      <Form.Item
        name="phone"
        label="手机登录"
        rules={[
          { required: true, message: "请输入手机号!" },
          {
            pattern:
              /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/,
            message: "请输入正确的手机号",
          },
        ]}
      >
        <Input style={{ maxWidth: "100%" }} />
      </Form.Item>
      <Form.Item
        label="验证码"
        name="captcha"
        rules={[{ required: true, message: "请输入验证码!" }]}
      >
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <Input placeholder="" style={{ maxWidth: "100%" }} />
          <Button
            onClick={sendCode}
            disabled={disabled}
            style={{ width: "fit-content" }}
          >
            {disabled ? "已发送,请查收!" : "发送验证码"}
          </Button>
        </Space>
      </Form.Item>
      <Form.Item>
        <Button onClick={loginHandle} type="primary" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export interface LoginProps {}

export default function LoginUI(props: LoginProps) {
  const [curKey, setCurKey] = useState("2");

  const onChange = (key: string) => {
    console.log(key);
    setCurKey(key);
  };
  const sendCaptcha = () => {};

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `扫码登陆`,
      children: "",
    },
    {
      key: "2",
      label: `手机登陆`,
      children: "",
    },
  ];

  return (
    <div className={styles["container"]}>
      <div className={styles["card"]}>
        <img
          className={styles["card-img"]}
          src="https://studio.orang.cloud/332fba35f16604391aa31e6ff9b6bd13.png"
          alt=""
        />
        <div className={styles["card-form"]}>
          <div className={styles["title"]}>账号登录</div>
          <div className={styles["center"]}>
            <Tabs
              style={{ width: "fit-content" }}
              defaultActiveKey={curKey}
              items={items}
              onChange={onChange}
            />
          </div>
          <div className={styles["form-content"]}>
            <div>
              <PhoneLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
