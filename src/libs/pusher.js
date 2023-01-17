import Pusher from "pusher-js";

import config from "config";

const MemoizedPusher = () => {
  let pusher;
  const { appKey, cluster, logOutput } = config.pusherConfig;
  Pusher.logToConsole = logOutput;
  return () => {
    if (!pusher) {
      pusher = new Pusher(appKey, {
        cluster,
      });
    }
    return pusher;
  };
};

export default MemoizedPusher();
