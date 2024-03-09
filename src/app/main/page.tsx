import Sidebar from "@/components/Sidebar";
import UserList from "@/components/UserList";

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
              <div className="grid grid-cols-4">
                <div className="col-span-1">Search Form</div>
                <div className="col-span-3">
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
