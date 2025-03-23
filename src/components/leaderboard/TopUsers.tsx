const TopUsers = () => {
  return (
    <div className="w-fit bg-transparent p-4">
      <h3 className="mb-3 text-2xl font-medium">Top Users</h3>
      <div className="flex flex-col gap-2 bg-white">
        <div className="grid grid-cols-[max-content_auto_20%]">
          <div className="text-lg font-medium">1.</div>
          <div className="text-lg font-medium">
            <img src="" alt="profile" className="h-6 rounded-full" />
            <span>John Doe</span>
          </div>
          <div className="text-lg font-medium">100</div>
        </div>
      </div>
    </div>
  );
};

export default TopUsers;
