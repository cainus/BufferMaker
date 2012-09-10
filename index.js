var bignum = require('bignum');

var BufferMaker = function(){
  this.plan = [];
};
BufferMaker.prototype.UInt8 = function(val){
  this.plan.push({ type : "UInt8", value : val});
  return this;
};
BufferMaker.prototype.UInt16BE = function(val){
  this.plan.push({ type : "UInt16BE", value : val});
  return this;
};

BufferMaker.prototype.UInt32BE = function(val){
  this.plan.push({ type : "UInt32BE", value : val});
  return this;
};

BufferMaker.prototype.UInt64BE = function(val){
  this.plan.push({ type : "UInt64BE", value : bignum(val)});
  return this;
};

BufferMaker.prototype.Int8 = function(val){
  this.plan.push({ type : "Int8", value : val});
  return this;
};
BufferMaker.prototype.Int16BE = function(val){
  this.plan.push({ type : "Int16BE", value : val});
  return this;
};

BufferMaker.prototype.Int32BE = function(val){
  this.plan.push({ type : "Int32BE", value : val});
  return this;
};

BufferMaker.prototype.Int64BE = function(val){
  this.plan.push({ type : "Int64BE", value : bignum(val)});
  return this;
};

BufferMaker.prototype.string = function(val){
  this.plan.push({ type : "string", value : val});
  return this;
};

BufferMaker.prototype.make = function(){
  var bytecount = 0;
  var offset = 0;
  var item;
  var i, j = 0;
  for(i = 0; i < this.plan.length; i++){
    item = this.plan[i];
    switch(item.type){
      case "UInt8": bytecount += 1; break;
      case "UInt16BE": bytecount += 2; break;
      case "UInt32BE": bytecount += 4; break;
      case "UInt64BE": bytecount += 8; break;
      case "Int8": bytecount += 1; break;
      case "Int16BE": bytecount += 2; break;
      case "Int32BE": bytecount += 4; break;
      case "Int64BE": bytecount += 8; break;
      case "string": bytecount += item.value.length; break;
    }
  }
  var buffer = new Buffer(bytecount);
  for(i = 0; i < this.plan.length; i++){
    item = this.plan[i];
    switch(item.type){
      case "UInt8": buffer.writeUInt8(item.value, offset); offset += 1; break;
      case "UInt16BE": buffer.writeUInt16BE(item.value, offset); offset += 2; break;
      case "UInt32BE": buffer.writeUInt32BE(item.value, offset); offset += 4; break;
      case "UInt64BE":
        var bit64Buffer = item.value.toBuffer({endian : "big", size : 8});
        for(j = 0; j < bit64Buffer.length; j++){
          buffer[offset + j] = bit64Buffer[j];
        }
        offset += 8;
        break;
      case "Int8": buffer.writeInt8(item.value, offset); offset += 1; break;
      case "Int16BE": buffer.writeInt16BE(item.value, offset); offset += 2; break;
      case "Int32BE": buffer.writeInt32BE(item.value, offset); offset += 4; break;
      case "Int64BE":
        var signed64BitBuffer = item.value.toBuffer({endian : "big", size : 8});
        for(j = 0; j < signed64BitBuffer.length; j++){
          buffer[offset + j] = signed64BitBuffer[j];
        }
        offset += 8;
        break;
      case "string": 
        if (typeof item.value === 'string'){
          buffer.write(item.value, offset);
          offset += Buffer.byteLength(item.value);
        } else {
          item.value.copy(buffer, offset, 0);
          offset += item.value.length;
        }

        break;
    }
  }
  return buffer;

};

module.exports = BufferMaker;
