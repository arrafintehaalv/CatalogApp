#import "TimestampModule.h"
#import <React/RCTLog.h>

@implementation TimestampModule {
    NSTimer *timestampTimer;
    BOOL hasListeners;
    BOOL isTimerRunning;
}

// Export this module to React Native
RCT_EXPORT_MODULE();

// Define which events this module can send
- (NSArray<NSString *> *)supportedEvents {
    return @[@"TimestampUpdate"];
}

// Called when the first listener is added
- (void)startObserving {
    hasListeners = YES;
    RCTLogInfo(@"TimestampModule: Started observing events");
}

// Called when the last listener is removed
- (void)stopObserving {
    hasListeners = NO;
    RCTLogInfo(@"TimestampModule: Stopped observing events");
}

// Method to get current timestamp - can be called from React Native
RCT_EXPORT_METHOD(getCurrentTimestamp:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        // Get current timestamp in milliseconds
        NSTimeInterval timestamp = [[NSDate date] timeIntervalSince1970] * 1000;
        
        // Create result dictionary
        NSDictionary *result = @{
            @"timestamp": @(timestamp)
        };
        
        RCTLogInfo(@"TimestampModule: Getting current timestamp: %f", timestamp);
        resolve(result);
    } @catch (NSException *exception) {
        RCTLogError(@"TimestampModule: Error getting timestamp: %@", exception.reason);
        reject(@"TIMESTAMP_ERROR", exception.reason, nil);
    }
}

// Method to start the 20-second interval timer
RCT_EXPORT_METHOD(startTimestampInterval) {
    // Stop existing timer if running
    if (timestampTimer) {
        [timestampTimer invalidate];
        timestampTimer = nil;
    }
    
    RCTLogInfo(@"TimestampModule: Starting timestamp interval (20 seconds)");
    isTimerRunning = YES;
    
    // Create and schedule the timer for 20-second intervals
    timestampTimer = [NSTimer scheduledTimerWithTimeInterval:20.0
                                                     repeats:YES
                                                       block:^(NSTimer * _Nonnull timer) {
        if (self->hasListeners && self->isTimerRunning) {
            // Get current timestamp in milliseconds
            NSTimeInterval timestamp = [[NSDate date] timeIntervalSince1970] * 1000;
            
            // Create event data
            NSDictionary *eventData = @{
                @"timestamp": @(timestamp)
            };
            
            // Send event to React Native
            [self sendEventWithName:@"TimestampUpdate" body:eventData];
            
            RCTLogInfo(@"TimestampModule: Sent timestamp update: %f", timestamp);
        } else {
            RCTLogInfo(@"TimestampModule: Timer fired but no listeners or timer stopped");
        }
    }];
    
    // Also send initial timestamp immediately
    if (hasListeners) {
        NSTimeInterval initialTimestamp = [[NSDate date] timeIntervalSince1970] * 1000;
        NSDictionary *initialEventData = @{
            @"timestamp": @(initialTimestamp)
        };
        [self sendEventWithName:@"TimestampUpdate" body:initialEventData];
        RCTLogInfo(@"TimestampModule: Sent initial timestamp: %f", initialTimestamp);
    }
}

// Method to stop the timestamp interval
RCT_EXPORT_METHOD(stopTimestampInterval) {
    RCTLogInfo(@"TimestampModule: Stopping timestamp interval");
    isTimerRunning = NO;
    
    if (timestampTimer) {
        [timestampTimer invalidate];
        timestampTimer = nil;
    }
}

// Clean up when module is deallocated
- (void)dealloc {
    if (timestampTimer) {
        [timestampTimer invalidate];
        timestampTimer = nil;
    }
    RCTLogInfo(@"TimestampModule: Module deallocated");
}

// Override invalidate to clean up when React Native bridge is invalidated
- (void)invalidate {
    [super invalidate];
    if (timestampTimer) {
        [timestampTimer invalidate];
        timestampTimer = nil;
    }
    isTimerRunning = NO;
    hasListeners = NO;
    RCTLogInfo(@"TimestampModule: Module invalidated");
}

@end