#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface TimestampModule : RCTEventEmitter <RCTBridgeModule>
@end

#import "TimestampModule.h"

@implementation TimestampModule {
    NSTimer *timestampTimer;
    BOOL hasListeners;
}

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
    return @[@"TimestampUpdate"];
}

- (void)startObserving {
    hasListeners = YES;
}

- (void)stopObserving {
    hasListeners = NO;
}

RCT_EXPORT_METHOD(getCurrentTimestamp:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        NSTimeInterval timestamp = [[NSDate date] timeIntervalSince1970] * 1000;
        NSDictionary *result = @{@"timestamp": @(timestamp)};
        resolve(result);
    } @catch (NSException *exception) {
        reject(@"TIMESTAMP_ERROR", exception.reason, nil);
    }
}

RCT_EXPORT_METHOD(startTimestampInterval) {
    if (timestampTimer) {
        [timestampTimer invalidate];
    }
    
    timestampTimer = [NSTimer scheduledTimerWithTimeInterval:20.0
                                                     repeats:YES
                                                       block:^(NSTimer * _Nonnull timer) {
        if (hasListeners) {
            NSTimeInterval timestamp = [[NSDate date] timeIntervalSince1970] * 1000;
            NSDictionary *params = @{@"timestamp": @(timestamp)};
            [self sendEventWithName:@"TimestampUpdate" body:params];
        }
    }];
}

RCT_EXPORT_METHOD(stopTimestampInterval) {
    if (timestampTimer) {
        [timestampTimer invalidate];
        timestampTimer = nil;
    }
}

@end
