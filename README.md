# 📕 My Library App

## 🌍 Overview

## 🛠️ Technologies & Dependencies

This application fetches data from the [Google Books API](https://developers.google.com/books/docs/overview). In order to use the API appropriately, you need to follow the instructions in the Google Books API documentation to create and use an API key.

You can find information about [getting started with the Google Books API here](https://developers.google.com/books/docs/v1/getting_started). And you can read more about the two different [ways to authorize requests and identifying your application here](https://developers.google.com/books/docs/v1/using#auth). This application was built with the API Key version of authorization and identification, but you also have the option to use OAuth 2.0 tokens.

[This section of the documentation](https://developers.google.com/books/docs/v1/using#WorkingVolumes) has some great examples of how to search for different types of data with the API.

Other dependencies include:

- [Radix UI](https://www.radix-ui.com/primitives/docs/components/toast) -- specifically, I used the Toast primitive component
- [Tanstack Query](https://tanstack.com/query/latest/docs/react/overview) -- In the branch named "working-mylibrary", I tried to use Tanstack Query to fetch user library data (get books, search google for book details), but there's something not working with the setup in the present version.

Other tech notes:

- [Truncating text with CSS](https://benmarshall.me/css-limit-text-length/)

## 🤔 Reflection

- Updating functions from non-auth to multi-user versions of the app

  - [Adding book to library](https://docs.google.com/document/d/1ngVcPB2SWkWXQUasi5kP_nFRyTU-YciLwX4t4YHQDMc/edit?usp=sharing)

- "reviews-working" branch of repo includes functionality for everything except frontend review updating. However, the mylibrarycomponent is rendering multiples of the books in a user's library. There's something wrong with the functions to get the user library data. It's been challenging troubleshooting because sometimes it seems like the backend is working (database seems right), and the problem is in the frontend code. But then other times it seems that multiple items are indeed being added to the user library. I dont'know. I need to revisit this later.
