timeAgo.js
=====================
Simple module, that displays the date in a "time ago" format.


Usage:
------

```javascript
var TimeAgo = new timeAgo();
console.log(timeAgo.getTime()); 
```
### Set date

#### Timestamp

```javascript
var timestamp = 930949200; // 1999,6,3
var TimeAgo = new timeAgo(timestamp);
console.log(timeAgo.getTime()); 
```
#### UTC Date

```javascript
var TimeAgo = new timeAgo(1999,6,3);
console.log(timeAgo.getTime()); 
```

Options:
------
......

Created By:
-----------
[xC0d3rZ](https://xc0d3rz.github.io)

License:
--------
timeAgo is released under the
[MIT license](http://www.opensource.org/licenses/MIT).
