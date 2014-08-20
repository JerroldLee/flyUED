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
> ####2.脚本合并
>	每个script标签初始下载时都会阻塞页面渲染，所以减少页面包含的script标签数量有助于改善这一情况。这不仅仅针对外链脚本，内嵌脚本的数量同样也要限制。浏览器在解析HTML页面的过程中每遇到一个script标签，都会因执行脚本而导致一定的延时，因此最小化延迟时间将会明显改善页面的总体性能。通常一个大型网站或网络应用需要依赖数个javascript文件。你可以把多个文件合并成一个，这样只需引用一个script标签，就可以减少性能消耗。文件合并的工作可通过离线打包工具或者类似像YaHoo!combo handle的实时在线服务来实现。
```
<!-- example2： -->
<html>
  <head>
  <title>Script Example</title>
  </head>
  <body>
    <p>Hello world!</p>
    <script type="http://yui.yahooapis.com/combo?2.7.0/build/yahoo/yahoo-min.js"></script>
    <script type="http://yui.yahooapis.com/combo?2.7.0/build/event/event-min.js"></script>
  </body>
</html>

<!-- better： -->
<html>
  <head>
	<title>Script Example</title>
  </head>
  <body>
  	<p>Hello world!</p>
    <script src="http://yui.yahooapis.com/combo?2.7.0/build/yahoo/yahoo-min.js&2.7.0/build/event/event-min.js" type="text/javascript"></script>
  </body>
</html>
```

> ####3.动态加载脚本
> 通过文档对象模型（DOM），几乎可以用Javascript动态创建HTML中的所有 内容。其根本在于，script标签与页面中的其他元素并无差异：都能通过DOM引用，都能在文档中移动、删除，甚至被创建。用标准的DOM方法可以非常容易地创建一个新年的script元素：
```
<!--example4:-->
<script type="text/javascript">
	var script=document.createElement("script");
	script.type="text/javascript";
	script.src="file1.js";
	document.getElementByTagNames("head")[0].appendChild(script);
</script>
```
>这个新创建的script元素加载了file1.js文件。文件在该元素被添加到页面时开始下载。这种技术的重点在于：无论在何时启动下载，文件的下载和执行过程不会阻塞页面其他进程。你甚至可以将代码放到页面head区域而不会影响页面其他部分。
    


## 二、数据访问
> ####1、减少访问DOM的次数
> 访问DOM元素是有代价的，修改DOM元素则更为昂贵，因为它会导致浏览器重新计算页面的几何变化。当然，最坏的情况是在循环中访问修改元素，尤其是对HTML元素集合循环操作。例如：
```
<!-- example5 -->
<script type="text/javascript">
  function innerHTMLLoop () {
    for(var count = 0; count < 15000; count++){
      document.getElementById('here').innerHTML+='a';
    }
  }
</script>
```
> 这个函数循环修改页面元素的内容。这段代码的问题在于，每次循环迭代，该元素都被访问两次：一次读取innerHTML属性，另外一次重写它。一个效率更高的做法是使用局部变量存储更新后的内容，然后在循环结束后一次性写入：
```
<!-- better -->
<script type="text/javascript">
  function innerHTMLLoop () {
    var content = '';
    for(var count = 0; count < 15000; count++){
      content+='a';
    }
    document.getElementById('here').innerHTML+=content;
  }
</script>
```
> 访问DOM的次数越多，代码运行速度越慢。因此，在有其他方案可以代替的时候，我们要尽量减少访问DOM的次数。

> ####2.减少遍历集合的开销
> 在每次迭代过程中，读取元素集合length属性会引发集合进行更新，这在所有浏览器中都会有明显的性能问题。优化方法很简单，把集合的长度缓存到一个局部变量中，然后在循环的条件退出语句中使用该变量。例如：
```
<!-- example6 -->
<script type="text/javascript">
  function loopFeifeiDiv () {
    var coll = document.getElementByTagName('div');
    for (var count = 0; count < coll.length; count++) {
      /*代码处理*/
    };
  }
</script>

<!-- better -->
<script type="text/javascript">
  function loopFeifeiDiv () {
    var coll = document.getElementByTagName('div'),
        len = coll.length;//将长度用临时变量存储起来，避免每次去遍历集合
    for (var count = 0; count < len; count++) {
      /*代码处理*/
    };
  }
```

## 三、编程
> ####1.采用nextSibling方法来查找DOM节点
> 通常我们需要从某个DOM元素开始，操作周围的元素，或者递归查找所有子节点。我们可以使用childNodes得到元素集合，或者用nextSibling来获取每个相邻元素。
考虑以下两个等价的例子，都是以非递归的方式遍历元素子节点：
```
<!--example7-->
<script type="text/javascript">
  function testNextSibling () {
    var el = document.getElementByID('mydiv'),
        ch = el.firstChild,
        name = '';
    do {
      name = ch.nodeName;
    }while (ch = ch.testNextSibling);
    return name;
  }

  function testChildNodes () {
    var el = document.getElementByID('mydiv'),
        ch = el.testChildNodes,
        len = ch.length,
        name = '';
    for (var count = 0; count < len; count++) {
      name = ch[count].nodeName;
    }
    return name;
  }
</script>
```
> 请牢记,childNodes是个元素集合，因此在循环中注意缓存length属性以避免在每次迭代中更新。在不同浏览器中，这两种方法的运行时间几乎相等。但在IE中，nextSibling比childNode表现优异。在IE6中，nextSibling要快16倍，IE7中是105背。从结果分析，在性能要求极高的时候，在老版本的IE中更推荐用nextSibling方法来查找DOM节点。

> ####2.最小化重绘和重排
> 页面的重绘和重排会产生计算消耗，为了提升性能，我们应该尽可能的降低页面的重绘和重排。
用展开/折叠的方式来显示和隐藏部分页面是一种常见的交互模式。它通常包括展开区域的几何动画，并将页面其他部分推向下方。
一般来说，重排只影响渲染树中的一小部分，但也可能影响很大的部分，甚至整个渲染树。浏览器所需重排的次数越少，应用程序的响应速度就越快。因此当页面顶部的一个动画推移页面整个月下的部分时，会导致一次代价昂贵的大规模重排。渲染树中需要重新计算的节点越多，情况就会越糟糕。
使用以下步骤可以避免页面中的大部分重排：

> (1)使用绝对位置定位页面上的动画元素，将其脱离文档流。

> (2)让元素动起来。当它扩大时，会临时覆盖部分页面。但这只是页面一个小区域的重绘过程，不会产生重排并重绘页面的大部分内容。

> (3)当动画结束时恢复定位，从而只会下移一次文档的其他元素。



## 四、算法和流程控制
> #### 1.减少循环迭代的工作量
> 常用的循环类型有for循环、while循环、do-while循环、for-in循环，一个典型的数组处理循环可以采用前三种循环中的任何一种。
```
<!-- example8 -->
<script type="text/javascript">
  for (var i = 0; i < items.length; i++) {
    process(items[i]);
  }
  var j = 0;
  while (j < items.length) {
    process(items[j++]);
  }
  var k = 0;
  do {
    process(items[k++]);
  } while (k < items.length);
</script>
```
> 上面的每个循环中，每次运行循环体时都会产生如下操作：

> 1、一次控制条件中的属性查找（items.length）。

> 2、一次控制条件中的数值大小比较（i<items.length）。

> 3、一次控制条件结果是否为true的比较（i<items.length==true）。

> 4、一次自增操作（i++）。

> 5、一次数组查找（items[i]）。

> 6、一次函数调用（process(items[i])）。

> 优化循环的第一步是要减少对象成员及数组项的查找次数，这个例子中每次循环都要查找items.length。这样做很耗时，由于该值在循环运行过程中从未改变，因此产生了不必要的性能损失。提高这个循环性能很简单，只查找一次属性，并把值存储到一个局部变量，然后在控制条件中使用这个变量：

```
<script type="text/javascript">
  for (var i = 0; len =items.length; i < len ; i++) {
    process(items[i]);
  }

  var j = 0,
      count = items.length;
  while (j < count) {
    process(items[j++]);
  }

  var k = 0,
      num = items.length;
  do {
    process(items[k++]);
  } while (k < num);
</script>
```

> 另外还可以通过点到数组的是循序来提高循环性能，倒序循环是一种常用的性能优化方法，但相对来说也比较难理解。

```
<!-- 颠倒数组优化后 -->
<script type="text/javascript">
  for (var i = items.length; i--) {
    process(items[i]);
  }

  var j = items.length;
  while (j--) {
    process(items[j]);
  }

  var k = items.length - 1;
  do {
    process(items[k]);
  }while (k--);
</script>
```

> 本例中使用了倒叙循环，并把减法操作整合在控制条件中。现在每个控制条件只是简单地与零比较。控制条件与true值比较，任何非零数会自动转换为true，而零值等同于false。实际上，控制条件从两次比较（迭代次数少于总数吗？它是否为true?）减少到一次比较（它是true吗？）。每次迭代从两次比较减少到一次，进一步提高了循环速度。通过倒序循环和减少属性查找，你可以看到运行速度比原始版本快了50%~60%。

> 对比原始版本，每次迭代中只有如下操作：

> 1、一次控制条件中的比较（i == true）;

> 2、一次减法操作（i--）;

> 3、一次数组查找（items[i]）;

> 4、一次函数调用(process(items[i])).

> 新的循环代码每次迭代中减少了两次操作，伴随着迭代次数的增加，性能的提升会更趋明显。

> ####2.Duff's Device
> 即使是循环中最快的代码，累计迭代上千次也会慢下来。此外，循环体运行时也会带来小性能开销，不仅仅是增加了总体运行时间。减少迭代次数能获得更加显著的性能提升，最广为人知的一种限制循环迭代次数的模式被称为“达夫设备（Duff's Device）”。Duff's Device是一种循环体展开技术，它使得一次迭代中实际执行了多次迭代的操作。一个典型的实现如下：

```
<!--example9-->
<script type="text/javascript">
  var iterations = Math.floor(items.length/8),
      startAt = items.length % 8,
      i = 0;
      do {
        switch(startAt) {
          case 0: process(items[i++]);
          case 7: process(items[i++]);
          case 6: process(items[i++]);
          case 5: process(items[i++]);
          case 4: process(items[i++]);
          case 3: process(items[i++]);
          case 2: process(items[i++]);
          case 1: process(items[i++]);
        }
        startAt = 0;
      }while(--iterations);
</script>
```

> 达夫设备背后的基本理念是：每次循环中最多可8次调用process()函数。循环迭代次数为元素总数除以8.因为总数不一定是8的整数倍，所以startAt变量存放余数，指出第一次循环中应当执行多少次process()。比方说现在有12个元素，那么第一次循环将调用process()4次，第二次循环调用process()8次，用2次循环代替了12次循环。

> 次算法一个稍快的版本取消了switch表达式，将余数处理与主循环分开：

```
<script type="text/javascript">
    var i = items.length % 8;
    while(i){
      process(items[i--]);
    }
    i = Math.floor(items.length / 8);
    while (i) {
      process(items[i--]);
      process(items[i--]);
      process(items[i--]);
      process(items[i--]);
      process(items[i--]);
      process(items[i--]);
      process(items[i--]);
      process(items[i--]);
    }
  </script>
```

> 虽然此代码中使用两个循环替代了先一个循环，但它去掉了循环体重的switch表达式，速度更快。

> 是否值得使用达夫设备，无论是原始的版本还是修改后的版本，很大程度上依赖于迭代的次数。如果循环迭代次数少于1000次，你可能只看到它与普通循环相比只有微不足道的性能提升。如果迭代次数超过1000次，达夫设备的效率明显提升。例如500000次迭代中，运行时间比普通循环减少到70%。

> ####3.合理使用if-else 和switch

> 使用if-else 或者switch 是基于测试条件的数量：条件数量较大，倾向于使用switch 而不是if-else。这通常归结到代码的易读性，如果条件较少时，if-else 容易阅读，而条件较多时switch更容易阅读。考虑下面几点：

```
if (found) {
    //do something
  } else {
    //do something else
}
switch (found) {
    case true:
      //do something
      break;
    default:
      //do something else
}
```

> 虽然两个代码块实现同样任务，很多人会认为if-else 表达式比witch 表达式更容易阅读。如果增加条件体的数量，通常会扭转这种观点：

```
if (color == "red") {
    //do something
  } else if (color == "blue") {
    //do something
  } else if (color == "brown") {
    //do something
  } else if (color == "black") {
    //do something
  } else {
    //do something
  }
  switch (color) {
    case "red":
      //do something
      break;
    case "blue":
      //do something
      break;
    case "brown":
      //do something
      break;
    case "black":
      //do something
      break;
    default:
      //do something
  }
```

> 大多数人会认为这段代码中的switch 表达式比if-else 表达式可读性更好。

> 事实证明，大多数情况下switch 表达式比if-else 更快，但只有当条件体数量很大时才明显更快。两者间的主要性能区别在于：当条件体增加时，if-else 性能负担增加的程度比switch 更多。因此，我们的自然倾向认为条件体较少时应使用if-else 而条件体较多时应使用switch 表达式，如果从性能方面考虑也是正确的。一般来说，if-else 适用于判断两个离散的值或者判断几个不同的值域。如果判断多于两个离散值，switch表达式将是更理想的选择。

> 优化if-else 的目标总是最小化找到正确分支之前所判断条件体的数量。最简单的优化方法是将最常见的条件体放在首位。考虑下面的例子：

```
if (value < 5) {
    //do something
  } else if (value > 5 && value <10) {
    //do something
  } else {
    //do something
  }
```

> 这段代码只有当value 值经常小于5 时才是最优的。如果value 经常大于等于10，那么在进入正确分支之前，必须两次运算条件体，导致表达式的平均时间提高。if-else 中的条件体应当总是按照从最大概率到最小概率的顺序排列，以保证理论运行速度最快。

> 另外一种减少条件判断数量的方法是将if-else 组织成一系列嵌套的if-else 表达式。使用一个单独的一长串的if-else 通常导致运行缓慢，因为每个条件体都要被计算。例如：

```
if (value == 0){
    return result0;
  } else if (value == 1){
    return result1;
  } else if (value == 2){
    Download at www.Pin5i.Com
    return result2;
  } else if (value == 3){
    return result3;
  } else if (value == 4){
    return result4;
  } else if (value == 5){
    return result5;
  } else if (value == 6){
    return result6;
  } else if (value == 7){
    return result7;
  } else if (value == 8){
    return result8;
  } else if (value == 9){
    return result9;
  } else {
    return result10;
  }
```

> 在这个if-else 表达式中，所计算条件体的最大数目是10。如果假设value 的值在0 到10 之间均匀分布，那么会增加平均运行时间。为了减少条件判断的数量，此代码可重写为一系列嵌套的if-else 表达式，例如：

```
if (value < 6){
  if (value < 3){
    if (value == 0){
      return result0;
      Download at www.Pin5i.Com
    } else if (value == 1){
      return result1;
    } else {
      return result2;
    }
  } else {
    if (value == 3){
      return result3;
    } else if (value == 4){
      return result4;
    } else {
      return result5;
    }
  }
} else {
  if (value < 8){
    if (value == 6){
      return result6;
    } else {
      return result7;
    }
  } else {
    if (value == 8){
      return result8;
    } else if (value == 9){
      return result9;
    } else {
      return result10;
    }
    Download at www.Pin5i.Com
  }
}
```

> 在重写的if-else 表达式中，每次抵达正确分支时最多通过四个条件判断。它使用二分搜索法将值域分成了一系列区间，然后逐步缩小范围。当数值范围分布在0 到10 时，此代码的平均运行时间大约是前面那个版本的一半。此方法适用于需要测试大量数值的情况（相对离散值来说switch 更合适）。


## 五、字符串和正则表达式
> ####1.字符串连接

> 用str  = str + "one" + "two" 代替 str += "one" + "two"。除了IE以外，浏览器尝试扩展表达式左端字符串的内存，然后简单地将第二个字符拷贝到它的尾部；如果在一个循环中，基本的字符串位于最左端，就可以避免多次复制一个越来越大的基本字符串。（低版本IE不适用）


## 六、响应接口
> ####1、在数组处理中使用定时器
> 一个常见的长运行脚本就是循环占用了太长的运行时间。使用定时器进行优化的基本方法是将循环工作分解到定时器序列中。

> 典型的循环模式如下：

```
for (var i=0, len=items.length; i < len; i++){
process(items[i]);
}
```

> 这样的循环结构运行时间过长的原因有二，process()的复杂度，items 的大小，或两者兼有。是否可用定时器取代循环的决定性因素有两个：（1）此处理过程是否必须是同步处理；（2）数据是否必须按顺序处理。如果这两个回答都是“否”，那么代码将适于使用定时器分解工作。

```
function processArray(items, process, callback){
	var todo = items.concat(); //create a clone of the original
	setTimeout(function(){
		process(todo.shift());
		if (todo.length > 0){
			setTimeout(arguments.callee, 25);
		} else {
			callback(items);
		}
	}, 25);
}

var items = [123, 789, 323, 778, 232, 654, 219, 543, 321, 160];
function outputValue(value){
	console.log(value);
}
processArray(items, outputValue, function(){
	console.log("Done!");
});
```

> ####2、

> 我们通常将一个任务分解成一系列子任务。如果一个函数运行时间太长，那么查看它是否可以分解成一系列能够短时间完成的较小的函数。可将一行代码简单地看作一个原子任务，多行代码组合在一起构成一个独立任务。某些函数可基于函数调用进行拆分。例如：

```
function saveDocument(id){
	//save the document
	openDocument(id);
	writeText(id);
	closeDocument(id);
	//update the UI to indicate success
	updateUI(id);
}
```

> 如果函数运行时间太长，它可以拆分成一系列更小的步骤，把独立方法放在定时器中调用。你可以将每个函数都放入一个数组，然后使用数组处理模式：

```
function saveDocument(id){
	var tasks = [openDocument, writeText, closeDocument, updateUI];
	setTimeout(function(){
		//execute the next task
		var task = tasks.shift();
		task(id);
		//determine if there's more
        if (tasks.length > 0){
            setTimeout(arguments.callee, 25);
        }
	}, 25);
}
```

> ####3、限时运行代码

> 有时每次只执行一个任务效率不高。考虑这样一种情况：处理一个拥有1'000 个项的数组，每处理一个
项需要1 毫秒。如果每个定时器中处理一个项，在两次处理之间间隔25 毫秒，那么处理此数组的总时间
是(25 + 1) × 1'000 = 26'000 毫秒，也就是26 秒。如果每批处理50 个，每批之间间隔25 毫秒会怎么样呢？
整个处理过程变成(1'000 / 50) × 25 + 1'000 = 1'500 毫秒，也就是1.5 秒，而且用户也不会察觉界面阻塞，因
为最长的脚本运行只持续了50 毫秒。通常批量处理比每次处理一个更快。

```
function timedProcessArray(items, process, callback){
	var todo = items.concat(); //create a clone of the original
	setTimeout(function(){
		var start = +new Date();
		do {
			process(todo.shift());
		} while (todo.length > 0 && (+new Date() - start < 50));
		if (todo.length > 0){
			setTimeout(arguments.callee, 25);
		} else {
			callback(items);
		}
	}, 25);
}
```




## 七、异步javascript
## 八、编程实践
## 九、构建和部署高性能javascript应用
## 十、工具


