# MongoDb-Fitness
# Personal Fitness Tracking Using Non-Relational Database

Using spreadsheets and relational databases has for tracking all workout data has always been a headache.  Due to the infinite combination of exercises that might need to be recorded it's almost impossible to capture everything in a way that can could be easily queried and analyzed later.

I recently read an article about transitioning from a relational database to a non-relational database.  One of the points they stressed was letting of the idea that you need a strict schema, or worry about having consistent data.  I realized that trying to record everything you did in a single workout might be great for this approach.

For now I'm just sticking everything in a JavaScript object and submitting it as a mongo document.  After a get a decent amount of data I'll try to add queries and see if I can pull useful information.  If that works, I'll build out a UI for submitting it and some data visualizations to show (hopefully) improvements over time in my workout.
