//
//  ContentView_Marina.swift
//  Oct07App
//
//  Created by Marina Diaz on 10/7/25.
//
import Foundation
import SwiftUI
import UIKit

@objc(ContentViewMarina)
class ContentViewMarina: NSObject {

    // Optional: old message method
    @objc
    func showMessage(_ message: String) {
        print("Message from JS: \(message)")
    }

    // Correct method to show SwiftUI view
    @objc
    func showSwiftUIView() {
        DispatchQueue.main.async {
            // Use UIWindowScene.windows instead of deprecated UIApplication.shared.windows
            guard let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
                  let rootVC = windowScene.windows.first?.rootViewController else { return }

            let contentView = ContentView()          // Your SwiftUI view
            let hostingController = UIHostingController(rootView: contentView)

            rootVC.present(hostingController, animated: true, completion: nil)
        }
    }
}


