package com.catalogapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import android.os.Handler;
import android.os.Looper;
import androidx.annotation.NonNull;

public class TimestampModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "TimestampModule";
    private Handler handler;
    private Runnable timestampRunnable;
    private boolean isRunning = false;

    public TimestampModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.handler = new Handler(Looper.getMainLooper());
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void getCurrentTimestamp(Promise promise) {
        try {
            long timestamp = System.currentTimeMillis();
            WritableMap result = Arguments.createMap();
            result.putDouble("timestamp", timestamp);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("TIMESTAMP_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void startTimestampInterval() {
        if (isRunning) return;
        
        isRunning = true;
        timestampRunnable = new Runnable() {
            @Override
            public void run() {
                if (isRunning) {
                    long timestamp = System.currentTimeMillis();
                    WritableMap params = Arguments.createMap();
                    params.putDouble("timestamp", timestamp);
                    
                    getReactApplicationContext()
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("TimestampUpdate", params);
                        
                    handler.postDelayed(this, 20000); // 20 seconds
                }
            }
        };
        handler.post(timestampRunnable);
    }

    @ReactMethod
    public void stopTimestampInterval() {
        isRunning = false;
        if (handler != null && timestampRunnable != null) {
            handler.removeCallbacks(timestampRunnable);
        }
    }
}