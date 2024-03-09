import Sidebar from "@/components/Sidebar";
import UserList from "@/components/UserList";
import UserSearchForm from "@/components/UserSearchForm";

const Main = () => {
  return (
    <div className="h-screen w-screen">
      <div className="grid grid-cols-10">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-9">
          <div className="grid grid-cols-5">
            <div className="col-span-3">
              <div className="h-screen overflow-scroll">
                <div className="h-max">
                  <UserSearchForm />
                </div>
                <div className="">
                  <UserList />
                </div>
              </div>
            </div>
            <div className="col-span-2">Career Preview</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
