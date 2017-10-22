package com.witaidemo;

import android.support.v4.content.ContextCompat;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.ImageView;
import android.view.Gravity;
import android.util.TypedValue;
import com.reactnativenavigation.controllers.SplashActivity;

        public class MainActivity extends SplashActivity {
                @Override
                public LinearLayout createSplashLayout() {
                        LinearLayout view = new LinearLayout(this);
                        ImageView imageView = new ImageView(this);

                        view.setBackgroundColor(Color.parseColor("#FFFFFF"));
                        view.setGravity(Gravity.CENTER);

                        // hard code the width and the height of the logo
                        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(400, 167);
                        layoutParams.gravity = Gravity.CENTER;
                        imageView.setLayoutParams(layoutParams);
                        imageView.setImageDrawable(ContextCompat.getDrawable(this.getApplicationContext(), R.drawable.splashscreen));

                        view.addView(imageView);
                        return view;
                }
        }