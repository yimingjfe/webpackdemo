- 验证打包是否无问题
- fix hot-reload
- 内联css不能用cssnext的问题(使用class吧)
- dots初始化，左右箭头初始化
- dots可定制
- 点击的时候不要动画，左右滑动的时候要动画怎么处理
- 默认custom-pasing有两种选择，一种组件代码里面定制css类。外界使用的时候就不能根据类名加样式
- 初始的跳转如何设置
- 多个元素滚动的实现
- autoplay功能

正常的滚动，最大的区别就是到了最前面或者最后面；要跳到真实对应的地方

如果有4个元素的话，当前的sliderIndex只有0 1 2 3,遇到问题；curIndex不是实际的sliderIndex，如果curIndex只在内部使用；则没有必要

但是dot又是根据真实的curIndex

判断是否到了最前面或者最后面， 然后移除transition， 然后改到指定的位置，加上transition

css-module的问题:
- 所有的样式都有hash不能覆盖一些库的样式


动画效果会变

样式也会变

dot要可定制