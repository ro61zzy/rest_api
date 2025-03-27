const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/StudentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

require('./student.model');
