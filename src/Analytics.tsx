import React from 'react';
import { Location as LocationHistory } from 'history';
import ReactGA from 'react-ga';
import useRouter from 'use-react-router';

const { REACT_APP_TRACKING_ID, NODE_ENV } = process.env;

const sendAnalytics =
  !!REACT_APP_TRACKING_ID && NODE_ENV === 'production';
if (!!sendAnalytics && REACT_APP_TRACKING_ID)
  ReactGA.initialize(REACT_APP_TRACKING_ID);

export const Analytics = () => {
  const router = useRouter();
  const subscription = React.useRef<() => void>();
  React.useEffect(() => {
    if (!!sendAnalytics) {
      const setAnalytics = ({ pathname, hash }: LocationHistory) => {
        const page = `${pathname}${hash.replace('#/', '')}`;
        ReactGA.set({
          page,
        }); // Update the user's current page
        ReactGA.pageview(page); // Record a pageview for the given page
      };
      // Initialize google analytics page view tracking
      subscription.current = router.history.listen((update) =>
        setAnalytics(update),
      );
      setAnalytics(router.history.location);
      return () => {
        subscription.current && subscription.current();
      };
    }
  });
  return null;
};

export default Analytics;
