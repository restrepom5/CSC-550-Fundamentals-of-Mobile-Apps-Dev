One potential performance bottleneck with this program is the History screen, which loads and displays a list of recorded mood entries. As the list grows, rendering all items at once may result in unnecessary re-renders and affect scrolling performance. I used the React DevTools Profiler to see how many components were modified when I added new moods. To address this issue, I created a flatlist, which virtualizes list items and reduces needless rendering. In the future, I may implement pagination or limit the number of saved entries to increase efficiency even further.

Overview
I built a simple but functional React Native mobile application called Mood & Jokes that demonstrates the core concepts learned in class, including:

Network API calls  
Device capabilities (Haptics + Storage)  
Stack & Tab navigation  
Custom splash screen  
User input with controlled components  
Integration of non-core libraries  

The goal of the app is to let users load jokes, save their mood, and view their history.

App Structure (Screens)
The app contains 4 functional screens satisfying the project requirement:

Home Screen (Tab)
Loads a random joke from an API using axios  
Button to navigate to a Stack screen  

Mood Screen (Tab)
Two controlled TextInputs (mood + optional note)  
Saves mood to local storage  
Triggers haptic feedback when saving  

History Screen (Tab) 
Displays a list of saved moods using FlatList  
Ability to clear all saved moods  

Details Screen (Stack)  
Static informational screen  
Accessed from Home  

Navigation setup:
Bottom Tab Navigator  Home, Mood, History  
Stack Navigator  wraps Tabs + Details  


This project uses

axios – performs the network API request  
@react-native-async-storage/async-storage – stores mood entries  
expo-haptics – triggers vibration feedback on mood save 