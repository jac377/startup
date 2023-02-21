# Mindly Drinking App

## Design <br>
**Elevator Pitch**<br>
How many times have you tried to keep up with your hydration? Well, I lost my count. Today, drinking water is becoming more and more important. However, it is hard to keep track of how much water we drink. That is why we created Mindly Drinking. This app lets you track you water consumption every day. But should you do it alone? No! You will be able to do it with other people as well, and they will be able to send message to remind you to drink that cup of water you are missing. So, are you ready to help others keep themselves hydrated?

### Login Screen
![Login_screen](Login_screen.png)

### Main Screen
![Main_page](Main_page.png)

*Key features*
-	Secure login over HTTPS
-	Be able to set up a profile, so users can get to know each other a little bit
-	Ability to add/delete water consumption
-	Record data log
-	Display individual progress bar
-	Display real-time leaderboard to show people’s overall water consumption
-	Be able to send a message to the whole group, so people can be encouraged to drink more water
-	Be able to set-up a water consumption goal

### What I have learned so far
2/20/2023 - Since I started working on this app, I have been making extensively use of the *Go Live* feature of VS Code. Moreover, I was able to organize the login page where I wanted to have it. I also was able to create some messages to see which pages I still need to develop. For example, when clicking "Sing Up" button, it will take you to the sign up sheet. It can be read that the sites in underconstruction, with a construction sign emoji (&#128679;). I can the code for the construction is '&' + '#128679' without space in between.
Moreover, I decided to create five different htmls. One with the login screen, another for the signup screen, leadeboard, main page, and about page. I am slowly making progress.
Remember that I need to check 'flex' under style to see how the website responds to different screens.

In order to allow Bootstrap in my code and also have some functionality when "flexing", include the following code:
```html
        <link 
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" 
            rel="stylesheet" 
            integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" 
            crossorigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
```

Also, if I don't know why a code is not working, try to edit it in bootstrap and see what I am missing.