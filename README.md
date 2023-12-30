
# Call logging application.

This project was for a client that I work with, who's practice was wanting to change the way it dealt with calls made from/to the organisation.

 - Needed a dedicated web app to log calls, and search through previous calls.

 - Previous spreadsheet was getting too full, each day was a different sheet with no way to search through all of the data.

 - Wanted something which everyone could have their own user account on.

![App Screenshot](https://github.com/johnnywalker-git/call-logger/blob/main/README-IMG/New-call.jpg?raw=true)


# The Stack

Supabase was a good choice due to built-in auth, and also as the data had come from a spreadsheet, it made sense to have the option of SQL functions on the data. It also has a generous free tier, and good docs and community support. Supabase also offers a real-time database option. So this will keep the app constantly updated for when new calls come in.

I decided on Vanilla React for the front-end via Vite. It is lightweight and as the app doesn’t need much routing NextJS would be overkill.

Also used MUI to simplify and speed-up the process for things like checkboxes and the calender to select a certain date to query the database.

![App Screenshot](https://github.com/johnnywalker-git/call-logger/blob/main/README-IMG/MUI-calendar.jpg?raw=true)

# Merging data


 - Merging data was a big task, as the spreadsheet had a different worksheet for each day.

 - Had to set up a script which would take each call from each day, and also create a new column for the date (name of she sheet)

 - Once this was collated, I was able to use a lot of Excel functionality to get the correct format for each cell to import in to Supabase. Mainly using Visual Basic functions.

![App Screenshot](https://github.com/johnnywalker-git/call-logger/blob/main/README-IMG/VB-editor.jpg?raw=true)

# Security

Because this is secure customer data, it was important that the only people who can gain access to the database are those who have a working email account for the organisation. This has been implementing in two ways. On the back-end, row-level security rules will only allow any server request (including sign-up) to be successful if the logged in user’s email ends in the organisations email address.

Similarly, on the front-end there are checks in place using the <UseContext /> hook to make sure the logged in user is who they say they are, only then are the components containing any data rendered.


# Login functionality

A user can log in to the app.

This component is taken from the Supabase library, however this can be edited via props to change things like a custom logo, colouring and behaviour.

As mentioned previously, only a user with the allowed domain can sign up, and this needs to be authenticated via a user clicking a confirmation in an email.

![App Screenshot](https://github.com/johnnywalker-git/call-logger/blob/main/README-IMG/Log-in.jpg?raw=true)

# New call functionality
This form has a real-time updating clock feature so the user knows the time and date, and is also automatically filled in the employee name field by who is logged in and using the app.

In the top right is the user section, where a user can click the profile logo in order to update their preferred name, this then sends the new username to the database and the auth table is updated with a new 'casual' name whilst still retaining the employees original email.


![App Screenshot](https://github.com/johnnywalker-git/call-logger/blob/main/README-IMG/New-call.jpg?raw=true)

The user will then fill in the required fields of the new incoming or outgoing call.

In terms of displaying the call, it is not optimistically rendered as was planned, but instead relies on the real-time functionality of supabase to add it to the section I talk about below. This is something that may need changing in the future, but for now I am happy with the reliability of this feature.

# Latest calls

This section, as expected is below the 'new call' section and calls to the database in order to get the most current calls and display these to the user.

![App Screenshot](https://github.com/johnnywalker-git/call-logger/blob/main/README-IMG/Latest-calls.jpg?raw=true)

It has a real-time connection to the database, so is always listening to Supabase for any changes to the call table. If a new call occurs, it then updates the state and add this call to the top of the list. 

Because every call is timestamped everything is in order of who called the most recent.

It is also important to note that in this application I implemented a form of pagination. As the database has a lot of calls from the initial data which had to be inserted, this made the amount of data coming back on each CRUD request enourmous. I then added a 'see more' button to the app, to request more calls from a further range. To stop getting every call back from the table, I implemented only certain ranges, which are then passed to my request in the utility function below...

![App Screenshot](https://github.com/johnnywalker-git/call-logger/blob/main/README-IMG/Pagination-req.jpg?raw=true)

# Filtered calls

This has a similar lay out to the latest calls, and is initiated by changing any of the search criteria options in the search bar.

![App Screenshot](https://github.com/johnnywalker-git/call-logger/blob/main/README-IMG/Filtered-calls.jpg?raw=true)

It is important for a user to be able to specify which criteria they are searching for. Once selected and an input value is typed in to the controlled component, a database call can begin. 

All three of these selections use the same utility function, but the parameters of this function are decided by which checkbox is selected, and therefore which column is set to be searched in the table.

Once returned, the section for latest calls is replaced by filtered calls. These are non-paginated, as there is never more than 20-ish results for any one day, or search criteria. This may be changed in the future but is stable for now.

This section also features a manual reset button once the document has done being searched, which manually resets all controller component fields and thus brings back the latest calls.

![App Screenshot](https://github.com/johnnywalker-git/call-logger/blob/main/README-IMG/filter-function.jpg?raw=true)









## Installation

This application is built bespoke for a private client, so cannot easily be run without creating a back-end infrastructure. 

However, please feel free to have a dig through the code-base to see how I approached any challenges during the build.



## Future prospects.

Going forward, I would like to style this application more, it is responsive to mobile but definitely could be prettier accross all aspects. If I was to do this again I would use a library such as tailwind for speed, efficiency and generally making things look more proffesional.

I would also like to ention that I am keeping an active eye on speed, especially from my Supabase dashboard, and can change things like the refresh rate of the real-time feature amongst other things.
