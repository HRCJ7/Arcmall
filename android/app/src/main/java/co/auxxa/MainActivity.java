package co.auxxa;

import android.view.Gravity;
import android.widget.LinearLayout;
import android.content.Intent;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
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

}
