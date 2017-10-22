import React, {Component} from "react";
import {Platform} from 'react-native';
import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType
} from "react-native-fcm";

export default class PushNotificationController extends Component {
    constructor(props) {
        super(props);
    }

    saveNotificationToLocalStorage(notif) {

        let ls = require('react-native-local-storage');
        // ls.clear();
        if (typeof  notif['message'] !== 'undefined' && typeof  notif['google.message_id'] !== 'undefined') {
            const message = notif['message'];
            const messageId = notif['google.message_id'];
            const tam = [{messageId, message}];
            ls.get('notifications')
                .then((data) => {
                        console.log("get notifications: ", data)
                        ls.save('notifications', tam.concat(data))
                            .then((data) => {
                                console.log("get notifications: ", data)
                            })
                    }
                );

        }
    }

    componentDidMount() {
        FCM.requestPermissions();
        const {onReceivedNotification, deviceToken} = this.props;

        FCM.getFCMToken().then(token => {
            // console.log("TOKEN (getFCMToken)", token);
            FCM.subscribeToTopic('all');
            FCM.subscribeToTopic('general_en');
            FCM.unsubscribeFromTopic('general_vi');
            deviceToken(token);
        });

        if (Platform.OS === 'ios') {
            FCM.getAPNSToken().then(token => {
                // console.log("APNS TOKEN (getFCMToken)", token);
            });
        }


        FCM.getInitialNotification().then(notif => {
            console.log("getInitialNotification", notif)
            // this.saveNotificationToLocalStorage(notif);

        });


        this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
            console.log("FCMEvent.Notification", notif);
            onReceivedNotification(notif);
            if (notif.local_notification) {
                return;
            }
            if (notif.opened_from_tray) {

                return;
            }

            if (Platform.OS === 'ios') {
                //optional
                //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
                //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                //notif._notificationType is available for iOS platfrom
                switch (notif._notificationType) {
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
                        break;
                }
            }

            this.showLocalNotification(notif);
        });

        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
            console.log("TOKEN (refreshUnsubscribe)", token);
            this.props.deviceToken(token);
        });

        // direct channel related methods are ios only
        // directly channel is truned off in iOS by default, this method enables it
        // FCM.enableDirectChannel();
        // this.channelConnectionListener = FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
        //     console.log('direct channel connected' + data);
        // });
        // setTimeout(function () {
        //     FCM.isDirectChannelEstablished().then(d => console.log(d));
        // }, 1000);

    }

    showLocalNotification(notif) {
        FCM.presentLocalNotification({
            click_action: notif.click_action,
            local: true,
            // body:'chay di pa',
            body: Platform.OS === 'ios' ? notif.notification.body : notif.fcm.body,
            priority: "high",
            title: Platform.OS === 'ios' ? '' : notif.fcm.title,
            // title:'pa di chay',
            sound: "default",
            "large_icon": "ic_launcher",// Android only
            icon: "ic_launcher",
            "show_in_foreground": true, /* notification when app is in foreground (local & remote)*/
            vibrate: 300, /* Android only default: 300, no vibration if you pass null*/
            "lights": true, // Android only, LED blinking (default false)
            // status: notif.status
        });
    }

    componentWillUnmount() {
        console.log('notification listener will unmount');
        this.notificationListner.remove();
        this.refreshTokenListener.remove();
    }


    render() {
        return null;
    }
}