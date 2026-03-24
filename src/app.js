const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const path = require('path');
const multer = require('multer');




const app = express();
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // parse the form data
app.use('/uploads', express.static('uploads')); 

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
// app.use('/upload', uploadRoutes);


const storage = multer.diskStorage({ // Configure the storage settings for multer locally on the server
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  }
}); 

const upload = multer({ storage: storage }); // Create the multer instance with the defined storage configuration


app.get('/', (req, res) => {
  return res.render('home');
});


app.post('/upload', upload.single('profileimage'), (req, res) => { // Handle the file upload with multer middleware matching the field name 'profileimage'
  // req.file contains information about the uploaded file
  console.log('File uploaded:', req.file);
  console.log(req.body); // Contains other form data if any
  console.log('File uploaded successfully');
  res.redirect('/'); // Redirect to the home page after successful upload
}
);



module.exports = app;