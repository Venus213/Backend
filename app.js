var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var servicesRouter = require('./routes/services');
var priceRouter = require('./routes/price');
var beauticianRouter = require('./routes/beautician');
var galleryRouter = require('./routes/gallery');
var blogRouter = require('./routes/blog');
var offerRouter = require('./routes/offer');
var contactRouter = require('./routes/contact');
var appoinmentRouter = require('./routes/appoinment');
var clientRouter = require('./routes/client');
var signupRouter = require('./routes/signup');
var footerRouter = require('./routes/footer');
var feedbackRouter = require('./routes/feedback');
var singleRouter = require('./routes/single');
var nailRouter = require('./routes/nail');
var makeupRouter = require('./routes/makeup');
var facialRouter = require('./routes/facial');
var bodymassageRouter = require('./routes/bodymassage');
var adminRouter = require('./routes/admin');

const mongoose = require('mongoose');

var cors = require('cors')

mongoose.connect('mongodb+srv://amisavani43:ami13@cluster0.ws1qcgg.mongodb.net/beauty')
  .then(() => console.log('Connected!'))
  .catch((err) => {
    console.log(err.message);
  })

var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/services', servicesRouter);
app.use('/price', priceRouter);
app.use('/beautician', beauticianRouter);
app.use('/gallery', galleryRouter);
app.use('/blog', blogRouter);
app.use('/offer', offerRouter);
app.use('/contact', contactRouter);
app.use('/appoinment', appoinmentRouter);
app.use('/client', clientRouter);
app.use('/signup', signupRouter);
app.use('/footer', footerRouter);
app.use('/feedback', feedbackRouter);
app.use('/single', singleRouter);
app.use('/nail', nailRouter);
app.use('/makeup', makeupRouter);
app.use('/facial', facialRouter);
app.use('/bodymassage', bodymassageRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
