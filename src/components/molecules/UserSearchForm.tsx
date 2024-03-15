import React, { useState } from "react";

interface UserSearchFormProps {
  handleSearch: (keyword: string) => void;
}

const UserSearchForm: React.FC<UserSearchFormProps> = ({ handleSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(searchKeyword); // ここでは最新の searchKeyword を使用する
  };
  return (
    <div className="pb-4 h-max">
      <p className="text-lg font-bold my-4">ユーザーを検索する</p>
      <input
        type="text"
        placeholder="キーワードで検索"
        className="p-2 mr-3 text-sm rounded-lg bg-gray-100"
        value={searchKeyword}
        onChange={handleChange}
      />
      <button
        className="py-2 px-4 text-sm rounded-lg bg-blue-400 text-white "
        onClick={handleSearchClick}
      >
        検索
      </button>
    </div>
  );
};

export default UserSearchForm;
