import LoadingBar from "react-redux-loading-bar";

const ProgressBar = () => {
  return (
    <div className="h-1">
      <LoadingBar style={{ height: "4px" }} />
    </div>
  );
};

export default ProgressBar;
