require('should');
var BufferMaker = require('../index');

describe("BufferMaker", function(){
  
  describe("when used for big endian scenarios", function(){

    describe("when used for unsigned input", function(){
      it("can create a one byte buffer", function(){
        var buffer = new Buffer(1);
        buffer.writeUInt8(5,0);
        var actual = new BufferMaker().UInt8(5).make();
        actual.should.eql(buffer);
      });
      it("can create a two-byte (16-bit) buffer", function(){
        var buffer = new Buffer(2);
        buffer.writeUInt16BE(5,0);
        var actual = new BufferMaker().UInt16BE(5).make();
        actual.should.eql(buffer);
      });
      it("can create a four-byte (32-bit) buffer", function(){
        var buffer = new Buffer(4);
        buffer.writeUInt32BE(5,0);
        var actual = new BufferMaker().UInt32BE(5).make();
        actual.should.eql(buffer);
      });
      it("can create an eight-byte (64-bit) buffer", function(){
        var buffer = new Buffer(8);
        buffer.writeUInt32BE(0,0);
        buffer.writeUInt32BE(5,4);
        var actual = new BufferMaker().UInt64BE(5).make();
        actual.should.eql(buffer);
      });
      it ("can create a buffer from a binary string", function(){
        var messageSetBufferMaker = new BufferMaker();
        var encodedMessage = new Buffer("four");
        var messageSet = messageSetBufferMaker
                      .UInt32BE(encodedMessage.length)
                      .string(encodedMessage)
                      .make();
        messageSet.should.eql(new Buffer([0, 0, 0, 4, 'f'.charCodeAt(0), 'o'.charCodeAt(0), 'u'.charCodeAt(0), 'r'.charCodeAt(0)]));
      });
    });

    describe("when used for signed input", function(){
      it("can create a one byte buffer", function(){
        var buffer = new Buffer(1);
        buffer.writeInt8(5,0);
        var actual = new BufferMaker().Int8(5).make();
        actual.should.eql(buffer);
      });
      it("can create a two-byte (16-bit) buffer", function(){
        var buffer = new Buffer(2);
        buffer.writeInt16BE(5,0);
        var actual = new BufferMaker().Int16BE(5).make();
        actual.should.eql(buffer);
      });
      it("can create a four-byte (32-bit) buffer", function(){
        var buffer = new Buffer(4);
        buffer.writeInt32BE(5,0);
        var actual = new BufferMaker().Int32BE(5).make();
        actual.should.eql(buffer);
      });
      it("can create an eight-byte (64-bit) buffer", function(){
        var buffer = new Buffer(8);
        buffer.writeInt32BE(0,0);
        buffer.writeInt32BE(5,4);
        var actual = new BufferMaker().Int64BE(5).make();
        actual.should.eql(buffer);
      });
    });

    it ("can create a buffer from a binary string", function(){
      var messageSetBufferMaker = new BufferMaker();
      var encodedMessage = new Buffer("four");
      var messageSet = messageSetBufferMaker
                    .UInt32BE(encodedMessage.length)
                    .string(encodedMessage)
                    .make();
      messageSet.should.eql(new Buffer([0, 0, 0, 4, 'f'.charCodeAt(0), 'o'.charCodeAt(0), 'u'.charCodeAt(0), 'r'.charCodeAt(0)]));
    });
    it("can create a buffer from a string", function(){
      var buffer = new Buffer(8);
      buffer.write("12345678");
      var actual = new BufferMaker().string("12345678").make();
      actual.should.eql(buffer);
    });

    it("can create a buffer from a buffer", function(){
      var buffer = new Buffer(8);
      buffer.write("12345678");
      var expected = new BufferMaker().string(buffer).make();
      var actual = new BufferMaker().string("12345678").make();
      actual.should.eql(expected);
    });


  });

});
