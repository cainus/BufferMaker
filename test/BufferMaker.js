require('should');
var BufferMaker = require('../Buffermaker');

describe("BufferMaker", function(){
  it("can create a one byte buffer", function(){
    var buffer = new Buffer(1);
    buffer.writeUInt8(5,0);
    var actual = new BufferMaker().UInt8(5).make();
    actual.should.eql(buffer);
  });
  it("can create a two-byte buffer", function(){
    var buffer = new Buffer(2);
    buffer.writeUInt16BE(5,0);
    var actual = new BufferMaker().UInt16BE(5).make();
    actual.should.eql(buffer);
  });
  it("can create a four-byte buffer", function(){
    var buffer = new Buffer(4);
    buffer.writeUInt32BE(5,0);
    var actual = new BufferMaker().UInt32BE(5).make();
    actual.should.eql(buffer);
  });
  it("can create a buffer from a string", function(){
    var buffer = new Buffer(8);
    buffer.write("12345678");
    var actual = new BufferMaker().string("12345678").make();
    actual.should.eql(buffer);
  });
});
