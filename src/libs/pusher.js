import Pusher from "pusher-js";

import config from "config";

const MemoizedPusher = () => {
  let pusher = null;
  const { appKey, cluster, logOutput } = config.pusherConfig;
  Pusher.logToConsole = logOutput;
  return () => {
    if (!pusher) {
      if (appKey && cluster) {
        pusher = new Pusher(appKey, {
          cluster,
        });
      } else {
        console.warn("No appKey or cluster configured for Pusher. Returning a null instance.")
      }
    }
    return pusher;
  };
};

export default MemoizedPusher();
