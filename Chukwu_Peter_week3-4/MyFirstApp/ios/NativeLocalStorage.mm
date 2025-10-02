#import "NativeLocalStorage.h"

@implementation NativeLocalStorage

// This registers the module so JS can find "NativeLocalStorage"
RCT_EXPORT_MODULE();

// Not required to be on main thread
+ (BOOL)requiresMainQueueSetup { return NO; }

// Synchronous getter (returns NSString* or nil)
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getItem:(NSString *)key)
{
  return [[NSUserDefaults standardUserDefaults] stringForKey:key];
}

// Set value for key (async fire-and-forget)
RCT_EXPORT_METHOD(setItem:(NSString *)value key:(NSString *)key)
{
  [[NSUserDefaults standardUserDefaults] setObject:value forKey:key];
}

// Remove value for key (async fire-and-forget)
RCT_EXPORT_METHOD(removeItem:(NSString *)key)
{
  [[NSUserDefaults standardUserDefaults] removeObjectForKey:key];
}

@end

