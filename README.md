# Pastery

Currently deployed at https://pastery.xyz/

## 👋 Intro
Everyone knows that feeling, of having a perfect image for some discussion or topic but struggling because of how long it takes for you to find it.

### **Well not anymore ❗**

With Pastery, you can store your favorite images, add keywords to them, and quickly find them when they're needed. For example, you might have that one specific meme that you're sending regularly on Discord, so what you can do, is to click on the image, copy the image url, open [**Pastery**](https://pastery.xyz/) and just hit `Ctrl+V` or `Cmd+V`. Then, if you want to use it later, just hover on your image, any you can either copy the original link, or you can open the preview, and copy the image istelf.

## 💯 Features
- Add / Edit / Remove any image
- Multiple item selection
- Export / Import of all the images into JSON format, to your clipboard
- Some quality of life improvements to make this website as quick as possible

## ☄ Get stared
Copy this JSON into clipboard
```json
[{"url":"https://cdn.discordapp.com/attachments/783097729530200094/899402138407534632/image0.png","keywords":"finding who asked"},{"url":"https://cdn.discordapp.com/attachments/822395486727962648/921219554477240350/20211217_025522.jpg","keywords":"opinion correct wrong"},{"url":"https://cdn.discordapp.com/emojis/771029769268494378.webp?v=1","keywords":"smile pepe"}]
```
**OR** you can just copy this link for example `https://cdn.discordapp.com/emojis/771029769268494378.webp?v=1`


Open [**Pastery**](https://pastery.xyz/) and just hit `Ctrl+V` or `Cmd+V`. Isn't that cool ? ❤

## 🚩 Important info
Pastery is not saving any of your image on any server. The way this web works, is that the links to your *memes* are stored in so called **LocalStorage** which is client-side storage (no sh\*t Sherlock, right). There are two reasons few this:
- To save money on a server, which would essentially just store your memes 💰
- To not having any responsibility for storing any of your images on my server 🚓
- To make loading and serving images as quick as possible 🤠

## 🤖 Future plans
- Comments
- Comments
- Comments
- Probably some kind of refactor. I am aware of that the code behind this website might not be perfect, but you know, we're still learning, right ?
- Rewrite image cache with Svelte actions
- Add PWA support
- Add some sort of tutorial on the web
- Better mobile support, eh ? I guess ..?

## Seriously important info
In order to run this locally, you need to have node enviroment installed, alongside with with npm.

First you need to install dependencies, required by this project. You can do so by `npm i` command.

To run DEV server use `npm run dev`

To build for a production use `npm run build`

---

### 😎 Feel free to open any issue :)