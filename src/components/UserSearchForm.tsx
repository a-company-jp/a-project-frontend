import React from "react";

// UserSeachForm
// ユーザーを検索するところ
const UserSearchForm = () => {
  return (
    <div className="p-4">
      <div className="my-4">
        <p className="text-base my-4">ユーザーを検索する</p>
        <input
          type="text"
          placeholder="キーワードで検索"
          className="p-2 mr-3 text-sm rounded-lg bg-gray-100"
        />
        <button className="py-2 px-4 text-sm rounded-lg bg-blue-400 text-white ">
          検索
        </button>
      </div>
    </div>
  );
};

export default UserSearchForm;
