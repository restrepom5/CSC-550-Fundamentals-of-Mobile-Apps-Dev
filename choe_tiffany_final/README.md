I used React Native Profiler to inspect my code and find bottlenecks and areas where unecessary component renders occured.
Although there isn't an issue right now I know that the book list inside index.tsx can become a problem.
With the mock data everything loads quickly but if there were 100s of books pagination should be implemented
so that the payload from the API isn't so large as well as the render time.

Also in index.tsx I am using useFocusEffect where a network request is made to fetch the book
data. This is happening everytime the page comes into focus even if the current book has not changed meaning
the network requst is not necessary.
