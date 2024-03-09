import Sidebar from "@/components/Sidebar";
import UserList from "@/components/UserList";

const Main = () => {
  return (
    <div className="h-screen w-screen">
      <div className="w-full h-full">
        <div className="h-full grid grid-cols-12">
          <div className="col-span-1">
            <Sidebar />
          </div>
          <div className="col-span-11">
            <div className="p-10 h-full grid grid-cols-5">
              <div className="col-span-3">
                <div>
                  <UserList />
                </div>
              </div>
              <div className="col-span-2">Career Preview</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
