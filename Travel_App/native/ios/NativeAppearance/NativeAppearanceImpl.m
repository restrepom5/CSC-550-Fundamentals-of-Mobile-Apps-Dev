// ios/250App/NativeAppearance/NativeAppearanceImpl.m
#import "NativeAppearanceImpl.h"
#import <UIKit/UIKit.h>
#import <TargetConditionals.h>

@implementation NativeAppearanceImpl

+ (instancetype)shared {
  static NativeAppearanceImpl *s;
  static dispatch_once_t once;
  dispatch_once(&once, ^{ s = [NativeAppearanceImpl new]; });
  return s;
}

- (UIUserInterfaceStyle)styleFromString:(NSString *)str {
  NSString *s = str.lowercaseString;
  if ([s isEqualToString:@"dark"]) { return UIUserInterfaceStyleDark; }
  if ([s isEqualToString:@"light"]) { return UIUserInterfaceStyleLight; }
  return UIUserInterfaceStyleUnspecified;
}

- (void)setStyle:(NSString *)styleString {
  UIUserInterfaceStyle style = [self styleFromString:styleString];
  dispatch_async(dispatch_get_main_queue(), ^{
    // iOS 13+: connectedScenes → first window
    UIWindow *window = nil;
    NSSet *scenes = UIApplication.sharedApplication.connectedScenes;
    if (scenes.count > 0) {
      UIScene *scene = scenes.allObjects.firstObject;
      if ([scene isKindOfClass:UIWindowScene.class]) {
        window = ((UIWindowScene *)scene).windows.firstObject;
      }
    }
    if (window) {
      window.overrideUserInterfaceStyle = style;
    }
  });
}

- (NSString *)getCurrentStyle {
  NSSet *scenes = UIApplication.sharedApplication.connectedScenes;
  if (scenes.count > 0) {
    UIScene *scene = scenes.allObjects.firstObject;
    if ([scene isKindOfClass:UIWindowScene.class]) {
      UIWindow *window = ((UIWindowScene *)scene).windows.firstObject;
      if (window) {
        switch (window.overrideUserInterfaceStyle) {
          case UIUserInterfaceStyleDark: return @"dark";
          case UIUserInterfaceStyleLight: return @"light";
          default: return @"unspecified";
        }
      }
    }
  }
  return @"unspecified";
}

- (BOOL)isSimulator {
#if TARGET_OS_SIMULATOR
  return YES;
#else
  return NO;
#endif
}

@end
