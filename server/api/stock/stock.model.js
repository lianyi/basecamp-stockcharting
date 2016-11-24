'use strict';

import mongoose from 'mongoose';

var StockSchema = new mongoose.Schema({
  name: String,
  code: String
});

export default mongoose.model('Stock', StockSchema);
