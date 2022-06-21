import React, {useEffect, useState, createContext} from 'react';
import Config from 'react-native-config';
import {Alert, Platform} from 'react-native';
import {UserInfoStorage} from 'src/Factory';

import {Mixpanel} from 'mixpanel-react-native';

const assignRandId = () => {
  let length = 24;
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  //   setUserId(result);
  return result;
};

const useMixPanel = () => {
  const [statusText, setStatusText] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [mixpanel, setMixPanel] = useState(null);
  const [user, setUser] = useState(null);

  const getUserInfo = async () => {
    // let user = await UserInfoStorage.getStoreUserProfile();
    let user = {id: 'g0xRVY5TdsTuiaAhMo7cOnAJ'};
    console.log('The ', user);
    if (user) {
      return setUser(user);
    }
  };
  useEffect(() => {
    initializeMixPanel();
    getUserInfo();
  }, []);

  function logStatus(status) {
    console.log(status);
    setStatusText(status);
  }

  const optInTracking = mixpanel => {
    if (!mixpanel) {
      return logStatus('Mixpanel not initialized: OptInTracking');
    }
    mixpanel.optInTracking();
  };

  const optOutTracking = mixpanel => {
    if (!mixpanel) {
      return logStatus('Mixpanel not initialized: OptOutTracking');
    }
    mixpanel.optOutTracking();
  };

  const setUserIdentity = userId => {
    if (!mixpanel) {
      return logStatus('Mixpanel not initialized: setUserIdentity');
    }
    console.log('THE USER ID', userId);
    mixpanel.identify(userId);
  };
  const getUserIdentity = userId => {
    if (!mixpanel) {
      return logStatus('Mixpanel not initialized: setUserIdentity');
    }
    mixpanel.identify(userId);
  };

  const getUserTrackingPermission = mixpanel => {
    if (!mixpanel) {
      return;
    }
    Alert.alert(
      'Support Us',
      `Instacured collects valuable data from user events and errors so that we can provide better service to overall users.`,
      [
        {
          text: 'Share Information',
          onPress: () => optInTracking(mixpanel),
        },
        {
          text: 'Not Sure',
          onPress: () => optOutTracking(mixpanel),
          style: 'destructive',
        },
      ],
    );
  };

  const hasUserOpted = async () => {
    if (!mixpanel) {
      return logStatus('Mixpanel not initialized');
    }
    // Check user’s opt-out status locally
    let hasOptedOut = await mixpanel.hasOptedOutTracking();
    if (hasOptedOut) {
      getUserTrackingPermission(mixpanel);
    }
  };

  const initializeMixPanel = async () => {
    // mixpanel.is
    const mixpanel = new Mixpanel(Config.MIXPANEL_PROJECT_TOKEN);
    setMixPanel(mixpanel);
    mixpanel.init();
    setIsInitialized(true);
    mixpanel.setLoggingEnabled(true);
    let hasOptedOut = await mixpanel.hasOptedOutTracking();
    logStatus(hasOptedOut);
    if (hasOptedOut) {
      getUserTrackingPermission(mixpanel);
    }
  };

  useEffect(() => {
    if (isInitialized) {
      if (user && user.id) {
        setUserIdentity(user.id);
      }
    }
  }, [isInitialized]);

  const trackEvent = (msg, data, trackTime) => {
    Alert.alert('Hello');
    // Track with event-name - || -
    // Track with event-name and property
    if (!mixpanel) {
      return logStatus('Mixpanel not initialized: trackEvent');
    }
    if (trackTime) {
      trackEvent(msg);
    }
    mixpanel.track(msg, data);
  };

  const trackTime = msg => {
    if (!mixpanel) {
      return logStatus('Mixpanel not initialized: trackTime');
    }
    mixpanel.timeEvent(msg);
  };

  const getSuperProperties = async () => {
    if (!mixpanel) {
      return logStatus('Mixpanel not initialized: getSuperProperties');
    }
    const superProperties = await mixpanel.getSuperProperties();
    logStatus(superProperties);
  };

  const setUserProfileProperty = (attribute, property) => {
    if (!user) {
      return logStatus('User is not defined');
    }
    // identify must be called before
    // user profile properties can be set
    mixpanel.identify(user.id);
    // Sets user 13793's "Plan" attribute to "Premium"
    mixpanel.getPeople().set(attribute, property);
  };

  const flushOutEvents = () => {
    if (!mixpanel) {
      return logStatus('Mixpanel not initialized: flushOutEvents');
    }
    mixpanel.flush();
  };

  /**
      registerSuperProperties will store a new superProperty and possibly overwriting any existing superProperty with the same name.
    */
  const registerSuperProperties = properties => {
    if (!mixpanel) {
      return logStatus('Mixpanel not initialized: registerSuperProperties');
    }
    mixpanel.registerSuperProperties(properties);
  };
  /**
      Erase all currently registered superProperties.
    */
  const clearSuperProperties = () => {
    if (!mixpanel) {
      return logStatus('Mixpanel not initialized: clearSuperProperties');
    }
    mixpanel.clearSuperProperties();
  };

  const unregisterSuperProperty = propertyName => {
    if (!mixpanel) {
      return logStatus('Mixpanel not initialized: unregisterSuperProperty');
    }
    mixpanel.unregisterSuperProperty(propertyName);
  };

  return {
    initializeMixPanel,
    isInitialized,
    statusText,
    mixpanel,
    trackEvent,
    trackTime,
    getSuperProperties,
    setUserIdentity,
    getUserIdentity,
    setUserProfileProperty,
    flushOutEvents,
    registerSuperProperties,
    clearSuperProperties,
    unregisterSuperProperty,
  };
};

export default useMixPanel;
