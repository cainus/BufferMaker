BufferMaker
===========

A convenient way of creating binary strings in node.js because Buffer is a bit too low-level for comfort in this regard.  

Examples:  

```javascript
// signed varieties
var someBuffer = new BufferMaker()
                        .UInt8(1)
                        .UInt16BE(2)
                        .UInt32BE(3)
                        .UInt64BE(4)
                        .string("this is a test!")
                        .make();
//  <Buffer 01 00 02 00 00 00 03 00 00 00 00 00 00 00 04 74 68 69 73 20 69 73 20 61 20 74 65 73 74 21>
```

```javascript
// unsigned are also supported:
var someBuffer = new BufferMaker()
                        .Int8(1)
                        .Int16BE(2)
                        .Int32BE(3)
                        .Int64BE(4)
                        .make();
// <Buffer 01 00 02 00 00 00 03 00 00 00 00 00 00 00 04> 
```




Missing these methods (but taking pull requests!):
```javascript
UInt16LE(value)
UInt32LE(value)
Int16LE(value)
Int32LE(value)
FloatLE(value)
FloatBE(value)
DoubleLE(value)
DoubleBE(value)
UInt64LE()
```
