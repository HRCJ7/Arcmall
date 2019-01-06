package com.arcmall;



import android.view.Gravity;
import android.widget.LinearLayout;
import android.content.Intent;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.reactnativenavigation.controllers.SplashActivity;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends SplashActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */


    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        view.setBackground(getResources().getDrawable(R.drawable.splash));
        view.setGravity(Gravity.CENTER);

        return view;
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

//
//    protected ReactActivityDelegate createReactActivityDelegate() {
//        return new ReactActivityDelegate(this, getMainComponentName()) {
//            @Override
//            protected ReactRootView createRootView() {
//                return new RNGestureHandlerEnabledRootView(MainActivity.this);
//            }
//        };
//    }

}
