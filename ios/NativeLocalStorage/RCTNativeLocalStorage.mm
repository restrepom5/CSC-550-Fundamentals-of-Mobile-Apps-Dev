//
//  RCTNativeLocalStorage.mm
//  app
//
//  Created by Jesse Boateng on 9/28/25.
//

#import "RCTNativeLocalStorage.h"

static NSString *const RCTNativeLocalStorageSuite = @"com.boateng.nativeLocalStorage";

@interface RCTNativeLocalStorage ()
@property (nonatomic, strong) NSUserDefaults *defaults;
@end

@implementation RCTNativeLocalStorage

- (instancetype)init {
  if ((self = [super init])) {
    _defaults = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageSuite];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
}

- (void)setItem:(NSString *)value key:(NSString *)key { [self.defaults setObject:value forKey:key]; }
- (NSString *)getItem:(NSString *)key { id v=[self.defaults objectForKey:key]; return [v isKindOfClass:[NSString class]]?(NSString*)v:nil; }
- (void)removeItem:(NSString *)key { [self.defaults removeObjectForKey:key]; }
- (void)clear { for (NSString *k in [self.defaults dictionaryRepresentation]) { [self.defaults removeObjectForKey:k]; } }

+ (NSString *)moduleName { return @"NativeLocalStorage"; }
@end
