//
//  ContentViewMarinaBridge.m 
//  Oct07App
//
//  Created by Marina Diaz on 10/7/25.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ContentViewMarina, NSObject)

// Expose the SwiftUI method to React Native
RCT_EXTERN_METHOD(showSwiftUIView)

// (Optional) Keep your old showMessage if you still need it
RCT_EXTERN_METHOD(showMessage:(NSString *)message)

@end
