//
//  ContentView.swift
//  MyFirstApp
//
//  Created by Ebube Dike on 9/11/25.
//

import SwiftUI

struct ContentView: View {
    @State private var count = 0   // keeps track of button taps
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Hello, iOS 👋")
                .font(.largeTitle)
                .bold()
                .foregroundColor(.purple)
            
            Text("You tapped \(count) times")
                .font(.headline)
            
            Button("Reset Counter") {
                count = 0
            }
            .buttonStyle(.bordered)
            
            Button("Tap Me!") {
                count += 1
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
