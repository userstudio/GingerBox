# GingerBox
The image lightbox used on http://user.io, inspired from Android GingerBread's screen shutdown animation:

![alt tag](http://www.smallab.org/content/files/9/file55b8fc9dc8c32.gif)

## JS integration

Either between the ```<head>``` tags of your html document, or at the end of the ```<body>``` tags to optimize loading, use:
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="[PATH-TO-JS-ASSETS]/gingerbox.min.js"></script>
```

## CSS integration

Within the ```<head>``` tags of your html document:
```html
<link rel="stylesheet" type="text/css" href="[PATH-TO-CSS-ASSETS]/gingerbox.css">
```

## HTML links

Anywhere within your html code, where you're willing to generate an image lightbox:
```html
<a href="[PATH-TO-IMAGE]/my-image.jpg" class="gingerBoxLink">Open my-image.jpg in a GingerBox!</a>
```