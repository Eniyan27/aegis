package com.aegisrn;  

import android.content.BroadcastReceiver;
import android.content.Context;
import android.os.Build;
import android.content.Intent;




public class Bootupreciever extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent.getAction() == Intent.ACTION_BOOT_COMPLETED){
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                //log("Starting the service in >=26 Mode from a BroadcastReceiver")
                context.startForegroundService(new Intent(context, Locationservice.class));
                return;
            }
            //log("Starting the service in < 26 Mode from a BroadcastReceiver")
            context.startService(new Intent(context, Locationservice.class));
        }

    }   
}
