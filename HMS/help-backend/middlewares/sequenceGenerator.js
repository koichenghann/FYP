const {Counter} = require('../model/counter');
module.exports = function(sequenceName) {
    let sequenceDocument = Counter.findAndModify({
        query:{_id: sequenceName },
        update: {$inc:{seq:1}},
        new:true
     });
     return sequenceDocument.seq;
  }