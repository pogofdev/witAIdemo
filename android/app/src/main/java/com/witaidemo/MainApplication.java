package com.witaidemo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.microsoft.codepush.react.CodePush;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

import com.evollu.react.fcm.FIRMessagingPackage;
import com.RNFetchBlob.RNFetchBlobPackage;

public class MainApplication extends NavigationApplication implements ReactApplication {
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }


    // from react-natice-code-push
    @Override
    public String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {

        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
            new ReactNativeAudioPackage(),
                new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
                new FIRMessagingPackage(),
                new RNFetchBlobPackage(),
                new RNAdMobPackage()
        );
    }
}
