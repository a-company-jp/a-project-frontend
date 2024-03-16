"use client";

import CareerPreview from "@/components/organisms/CareerPreview";
import Sidebar from "@/components/organisms/Sidebar";
import UserList from "@/components/organisms/UserList";
import UserSearchForm from "@/components/molecules/UserSearchForm";
import React, { useEffect, useState } from "react";
import { UserInfoResponse } from "../../../proto/typescript/pb_out/main";
import useFetchUser from "@/hooks/useFetchUser";

const MainContent = () => {
  const [hoveredUserInfo, setHoveredUserInfo] =
    useState<UserInfoResponse | null>(null);
  const [allUsers, setAllUsers] = useState<UserInfoResponse[]>([]); // テストデータを初期値としてセット
  const [filteredUsers, setFilteredUsers] =
    useState<UserInfoResponse[]>(allUsers); // allUsers を初期値としてセット
  const { list } = useFetchUser();
  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await list();
      console.log("resp: ", resp.userInfoResponses);
      setAllUsers(resp.userInfoResponses);
      setFilteredUsers(resp.userInfoResponses);
    };
    fetchUsers();
  }, []);

  const handleSearch = (keyword: string) => {
    // キーワードが空の場合、すべてのユーザーを表示する
    if (keyword.trim() === "") {
      setFilteredUsers(allUsers);
      return;
    }

    // ユーザーリストをフィルタリングして、キーワードに一致するユーザーを抽出する
    const filtered = allUsers.filter((userInfo) =>
      userInfo.userData?.username.toLowerCase().includes(keyword.toLowerCase())
    );

    // フィルタリングされた結果を更新する
    setFilteredUsers(filtered);
  };

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="w-full grid grid-cols-5">
        <div className="col-span-3 p-4 h-screen overflow-scroll hidden-scrollbar">
          <UserSearchForm handleSearch={handleSearch} />
          <UserList
            setHoveredUserInfo={setHoveredUserInfo}
            hoveredUserInfo={hoveredUserInfo}
            userInfos={filteredUsers} // フィルタリングされたユーザーリストを渡す
          />
        </div>
        <div className="col-span-2">
          <CareerPreview userInfo={hoveredUserInfo} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
