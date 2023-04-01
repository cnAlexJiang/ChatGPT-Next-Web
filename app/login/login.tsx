
'use client'
import * as React from "react";
import {useState} from 'react'
import styles from "./login.module.scss";
import { Button, Checkbox, Form, Input, message, Select, Space } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const PhoneLogin: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="login"
      wrapperCol={{ flex: 1 }}
      layout="vertical"
      style={{ width:'100%'}}
    >
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
        <Input  style={{maxWidth:'100%'}}/>
      </Form.Item>
      <Form.Item
        label="验证码"
      >
        <div style={{display:'flex'}}>
          <Input 
            style={{maxWidth:'100%'}}
          />
          <Button style={{ width: 80 }}  >
            sned
          </Button>
        </div>
      
      </Form.Item>
    </Form>
  );
};

export interface LoginProps {}

export default function LoginUI(props: LoginProps) {
  const [curKey, setCurKey] = useState('2')

  const onChange = (key: string) => {
    console.log(key);
    setCurKey(key)
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `扫码登陆`,
      children: '',
    },
    {
      key: "2",
      label: `手机登陆`,
      children: ''
    }
  ];

  return (
    <div className={styles["container"]}>
      <div className={styles["card"]}>
        <img src="https://studio.orang.cloud/332fba35f16604391aa31e6ff9b6bd13.png" alt="" />
        <div className={styles["form"]}>
            <div className={styles["title"]}>账号登录</div>
            <div  className={styles["center"]}>
              <Tabs style={{width:'fit-content'}} defaultActiveKey={curKey} items={items} onChange={onChange} />
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
