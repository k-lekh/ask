I try to avoid loops, arrays, and everything which is not a string.
At the same time I use async/await, which is fundamental from the certain point of view, but also very sophisticated.
Much more sophisticated than a string in a wold of types.
Or not? Tell me what do you think.

I also rely on file system a lot.
I love it, files are nice, and text files are beautiful.
You can read text on every device. Like 100%. It's essential.
My smart drum sticks cannot handle mp4, but they can handle text for sure, and this mean I can use ask on them.
At least I will have read, write, ls and their after-functions like append, prepend which is already enough.
I can read system file or files list and build a string with information I need, and then 'write' it to their tiny screen.

This leads me to the idea of transpiling Ask to other language like Python, Kotlin, Swift, Go, C++, R and other.
Bidirectional transpilation to R may be integral part of the project, because a lot of useful researches are made with R.

Imagine I have a routine which contains other routines on many levels, and it takes 10 minutes and $1 to run.
This routine produces easy to read nice and good dashboard, based on all possible company data, available from all the adopted vendors by their apis and public resources.
Routine may access any resource with read(custom/path) and cache the result.
((It may add #date to url, which will not affect any requests, but will reset the cache)).

So this routine do respectful job and writes html and other files here and there.
Then client applies these changes and re-renders uncached parts.
(Because render is a routine?)

So every day we clean cache and spend $1 on a cold start.
Another 30 days we use cache and rebuild mostly rendering based on data.
The more deterministic output, the cheaper the routine in expluatation.
(Do we need stability-tests?)