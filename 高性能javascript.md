{<1>}![欢迎来到飞飞UED](/content/images/2014/Aug/bizhi-0757-6571.jpg)
## 一、加载和运行
> ####1.合理放置脚本位置
	> 大多数人在编写html代码的时候习惯将script标签和css一起放在头部，但是这样放置的话脚本会阻塞页面渲染，直到脚本全部下载并执行完成后，页面的渲染才会继续。因此页面的性能问题会很明显。将脚本放到页面顶部将会导致明显的延迟，通常表现为显示空白页面，用户无法浏览内容，也无法与页面进行交互。由于脚本会阻塞页面其他资源的下载，因此推荐将所有的script标签尽可能放到body标签的底部，以尽量减少对整个页面下载的影响。
    
```
<!-- example1： -->
<html>
  <head>
	<title>Script Example</title>
	<!-- Example of inefficient script position -->
	<script src="file1.js" type="text/javascript"></script>
	<script src="file2.js" type="text/javascript"></script>
	<script src="file3.js" type="text/javascript"></script>
  </head>
  <body>
  	<p>Hello world!</p>
  </body>
</html>

<!-- better： -->
<html>
  <head>
	<title>Script Example</title>
  </head>
  <body>
  	<p>Hello world!</p>
  	<!-- Example of inefficient script position -->
	<script src="file1.js" type="text/javascript"></script>
	<script src="file2.js" type="text/javascript"></script>
	<script src="file3.js" type="text/javascript"></script>
  </body>
</html>
```

    


## 二、数据访问
## 三、编程
## 四、算法和流程控制
## 五、字符串和正则表达式
## 六、响应接口
## 七、异步javascript
## 八、编程实践
## 九、构建和部署高性能javascript应用
## 十、工具


You're live! Nice. We've put together a little post to introduce you to the Ghost editor and get you started. You can manage your content by signing in to the admin area at `<your blog URL>/ghost/`. When you arrive, you can select this post from a list on the left and see a preview of it on the right. Click the little pencil icon at the top of the preview to edit this post and read the next section!

## Getting Started

Ghost uses something called Markdown for writing. Essentially, it's a shorthand way to manage your post formatting as you write!

Writing in Markdown is really easy. In the left hand panel of Ghost, you simply write as you normally would. Where appropriate, you can use *shortcuts* to **style** your content. For example, a list:

* Item number one
* Item number two
    * A nested item
* A final item

or with numbers!

1. Remember to buy some milk
2. Drink the milk
3. Tweet that I remembered to buy the milk, and drank it

### Links

Want to link to a source? No problem. If you paste in url, like http://ghost.org - it'll automatically be linked up. But if you want to customise your anchor text, you can do that too! Here's a link to [the Ghost website](http://ghost.org). Neat.

### What about Images?

Images work too! Already know the URL of the image you want to include in your article? Simply paste it in like this to make it show up:

{<2>}![The Ghost Logo](https://ghost.org/images/ghost.png)

Not sure which image you want to use yet? That's ok too. Leave yourself a descriptive placeholder and keep writing. Come back later and drag and drop the image in to upload:

{<3>}![A bowl of bananas]


### Quoting

Sometimes a link isn't enough, you want to quote someone on what they've said. It was probably very wisdomous. Is wisdomous a word? Find out in a future release when we introduce spellcheck! For now - it's definitely a word.

> Wisdomous - it's definitely a word.

### Working with Code

Got a streak of geek? We've got you covered there, too. You can write inline `<code>` blocks really easily with back ticks. Want to show off something more comprehensive? 4 spaces of indentation gets you there.

    .awesome-thing {
        display: block;
        width: 100%;
    }

### Ready for a Break? 

Throw 3 or more dashes down on any new line and you've got yourself a fancy new divider. Aw yeah.

---

### Advanced Usage

There's one fantastic secret about Markdown. If you want, you can  write plain old HTML and it'll still work! Very flexible.

<input type="text" placeholder="I'm an input field!" />

That should be enough to get you started. Have fun - and let us know what you think :)

