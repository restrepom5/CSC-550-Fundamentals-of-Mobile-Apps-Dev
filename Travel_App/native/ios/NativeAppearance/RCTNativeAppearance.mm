#import "RCTNativeAppearance.h"
#import "NativeAppearanceImpl.h"

using namespace facebook::react;

@implementation RCTNativeAppearance

+ (NSString *)moduleName { return @"NativeAppearance"; }

- (std::shared_ptr<TurboModule>)getTurboModule:(const ObjCTurboModule::InitParams &)params {
  return std::make_shared<NativeAppearanceSpecJSI>(params);
}

- (void)setStyle:(NSString *)style {
  [[NativeAppearanceImpl shared] setStyle:style];
}

- (NSString *)getCurrentStyle {
  return [[NativeAppearanceImpl shared] getCurrentStyle];
}

// Codegen declares NSNumber* here, so return a boxed BOOL.
- (NSNumber *)isSimulator {
  return @([[NativeAppearanceImpl shared] isSimulator]);
}

@end
