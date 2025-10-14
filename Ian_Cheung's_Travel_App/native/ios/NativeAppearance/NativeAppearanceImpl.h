#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NativeAppearanceImpl : NSObject
+ (instancetype)shared;
- (void)setStyle:(NSString *)style;
- (NSString *)getCurrentStyle;
- (BOOL)isSimulator;
@end

NS_ASSUME_NONNULL_END
