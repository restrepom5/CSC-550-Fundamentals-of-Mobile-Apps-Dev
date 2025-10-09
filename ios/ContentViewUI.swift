//
//  ContentViewUI.swift
//  Oct07App
//
//  Created by Marina Diaz on 10/7/25.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            MyView(helloFont: .title)
        }
    }
}

struct MyView: View {
    let helloFont: Font

    var body: some View {
        ZStack {
            VStack(spacing: 12) {
                Text("CSC 550")
                    .font(.headline)
                    .padding(.top, 10)
                Spacer(minLength: 20)
            }

            VStack(spacing: 12) {
                Text("Let's build an app!")
                    .font(.system(size: 34, weight: .bold, design: .default))
                    .padding(.top, 30)
                Text("Enjoy the ride :)")
                    .font(.system(size: 30, weight: .bold, design: .rounded))
                    .opacity(0.5)
            }

            VStack {
                Spacer()
                NavigationLink(destination: NextPageView()) {
                    Text("Continue")
                        .font(.headline)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: 50)
                        .background(Color.black)
                        .cornerRadius(8)
                        .padding(.horizontal, 40)
                        .padding(.bottom, 40)
                }
            }
        }
    }
}

struct NextPageView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("To build your first iOS app you will need:")
                .font(.system(size: 34, weight: .bold, design: .default))
                .padding()
            VStack(alignment: .leading, spacing: 15) {
                Text("• Xcode")
                Text("• A Mac computer")
                Text("• Swift Language basic Skills")
                Text("• Basic understanding of View and Components States")
                Text("• Basic understanding of Native Modules")
            }
            .font(.system(size: 25))
            .padding(.leading, 15)

            Spacer()

            NavigationLink(destination: NextPageView2()) {
                Text("Next")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .frame(height: 50)
                    .background(Color.black)
                    .cornerRadius(8)
                    .padding(.horizontal, 40)
                    .padding(.bottom, 40)
            }
        }
        .navigationTitle("Next Page")
    }
}

struct NextPageView2: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Overview of View, Components and Native Modules:")
                .font(.system(size: 34, weight: .bold, design: .default))
                .padding()
            VStack(alignment: .leading, spacing: 15) {
                Text("• View")
                Text("• Components")
                Text("• Native Modules")
            }
            .font(.system(size: 25))
            .padding(.leading, 15)

            Spacer()
        }
        .navigationTitle("Final Page")
    }
}
