import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  BlockOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from "@/styles/Header.module.css";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/logout`);
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu
      theme="light"
      mode="horizontal"
      key="menu"
      selectedKeys={[current]}
      className={`${styles.header} mb-2`}
    >
      <Item
        key="/"
        className={`${styles.logo}`}
        icon={<BlockOutlined />}
        onClick={(e) => setCurrent(e.key)}
      >
        <Link href="/">CodingLessons</Link>
      </Item>

      <ul>
        {user && user.role && user.role.includes("Instructor") ? (
          <Item
            key="/instructor/course/create"
            onClick={(e) => setCurrent(e.key)}
            icon={<CarryOutOutlined />}
          >
            <Link href="/instructor/course/create">
              <a>Create A Course</a>
            </Link>
          </Item>
        ) : (
          <Item
            key="/user/become-instructor"
            onClick={(e) => setCurrent(e.key)}
            icon={<TeamOutlined />}
          >
            <Link href="/user/become-instructor">Become an Instructor</Link>
          </Item>
        )}

        {user === null && (
          <>
            {router.asPath.includes("register") ? null : (
              <Item
                className="float-right"
                key="/register"
                onClick={(e) => setCurrent(e.key)}
                icon={<UserAddOutlined />}
              >
                <Link href="/register">Register</Link>
              </Item>
            )}
            {router.asPath.includes("login") ? null : (
              <Item
                className="float-right"
                key="/login"
                onClick={(e) => setCurrent(e.key)}
                icon={<LoginOutlined />}
              >
                <Link href="/login">Login</Link>
              </Item>
            )}
          </>
        )}

        {user !== null && (
          <SubMenu
            title={user && user.name}
            key="user"
            icon={<UserOutlined />}
            className="float-right dropdown"
          >
            <ItemGroup>
              <Item key="/user">
                <Link href="/user">
                  <a>Dashboard</a>
                </Link>
              </Item>
              <Item key="logout" onClick={logout}>
                Logout
              </Item>
            </ItemGroup>
          </SubMenu>
        )}

        {user && user.role && user.role.includes("Instructor") && (
          <Item
            key="/instructor"
            onClick={(e) => setCurrent(e.key)}
            icon={<TeamOutlined />}
            className="float-right"
          >
            <Link href="/instructor">
              <a>Instructor</a>
            </Link>
          </Item>
        )}
      </ul>
    </Menu>
  );
};

export default TopNav;
