import UIKit

@objc(NativeAppearanceImpl)
public class NativeAppearanceImpl: NSObject {
  @objc public static let shared = NativeAppearanceImpl()

  private func style(from s: String) -> UIUserInterfaceStyle {
    switch s.lowercased() {
      case "dark": return .dark
      case "light": return .light
      default: return .unspecified
    }
  }

  @objc public func setStyle(_ s: String) {
    let ui = style(from: s)
    DispatchQueue.main.async {
      if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
         let window = scene.windows.first {
        window.overrideUserInterfaceStyle = ui
      }
    }
  }

  @objc public func getCurrentStyle() -> String {
    if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
       let window = scene.windows.first {
      switch window.overrideUserInterfaceStyle {
        case .dark: return "dark"
        case .light: return "light"
        default: break
      }
    }
    return "unspecified"
  }

  @objc public func isSimulator() -> Bool {
  #if targetEnvironment(simulator)
    return true
  #else
    return false
  #endif
  }
}