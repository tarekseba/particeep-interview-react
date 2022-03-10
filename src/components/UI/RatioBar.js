import "./RatioBar.css";
const RatioBar = (props) => {
  return (
    <div className="bar-wrapper">
      <div className="bar">
        <div className="ratio" style={{ width: props.ratio+"%" }}></div>
      </div>
    </div>
  );
};
export default RatioBar;
