import { Spin } from "antd";

import './index.css';

const Loading = () => {
    return(
<div className="loading-container">
      <Spin size="large" fullscreen/>
    </div>
    )
}

export default Loading;