const Main = () => {
  return (
    <div className="h-screen w-screen">
      <div className="w-full h-full">
        <div className="h-full grid grid-cols-12">
          <div className="col-span-2">
            <div className="p-4 h-full bg-blue-300">Sidebar</div>
          </div>
          <div className="col-span-10">
            <div className="p-4 h-full grid grid-cols-3">
              <div className="col-span-2">User List and Search Form</div>
              <div className="col-span-1">Career Preview</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
