import {registerScreens, registerScreenVisibilityListener, showLoginForm} from './screens';
import {EN} from "./constants";
import codePush from 'react-native-code-push';
import React,{Component} from 'react';


// screen related book keeping
// registerScreens();
// registerScreenVisibilityListener();
//
//
// var isLogin = false;
//
// if (isLogin) {
//     showHomeScreen(EN);
// } else {
//     showLoginForm(EN);
// }


class App extends Component {
    constructor(props) {
        super(props);

        registerScreens();
        registerScreenVisibilityListener();
        // codePush.sync({
        //     updateDialog: false,
        //     installMode: codePush.InstallMode.ON_NEXT_RESUME
        // });
        var isLogin = false;

        if (isLogin) {
            // showHomeScreen(EN);
        } else {
            showLoginForm(EN);
        }

    }

}
App = codePush({ checkFrequency: codePush.CheckFrequency.MANUAL })(new App());
export default App;