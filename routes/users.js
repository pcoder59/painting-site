var express = require('express');
var router = express.Router();
var url = require('url');
var MongoClient = require('mongodb').MongoClient;

/* GET users listing. */
router.get("/", function(req, res, next) {
  var queryObj = url.parse(req.url, true).query.q;
  var errorObj = url.parse(req.url, true).query.e;
  if(queryObj == "v") {
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
      if(err) {
        console.log(err);
        res.render("adminChange", { title: 'Canvas - Admin', error: true });
      } else {
        db.db("canvas").collection('videos').find({}).toArray(function(err, result) {
          if(result) {
            console.log(result);
            if(errorObj == "t") {
              res.render("upload", { title: 'Canvas - Videos', videos: true, v: result, error: true });
            } else if(errorObj == "key") {
              res.render("upload", { title: 'Canvas - Videos', videos: true, v: result, errorkey: true });
            } else if(errorObj == "delete") {
              res.render("upload", { title: 'Canvas - Videos', videos: true, v: result, errordelete: true });
            } else {
              res.render("upload", { title: 'Canvas - Videos', videos: true, v: result });
            }
          } else {
            res.render("upload", { title: 'Canvas - Videos', videos: true, v: null });
          }
        });
      }
    });
  } else if(queryObj == "s") {
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
      if(err) {
        console.log(err);
        res.render("adminChange", { title: 'Canvas - Admin', error: true });
      } else {
        db.db("canvas").collection('sample').find({}).toArray(function(err, result) {
          if(result) {
            console.log(result);
            if(errorObj == "t") {
              var samples = [];
              var i = 1;
              var j = 0;
              samples.push([]);
              for(var sample in result) {
                console.log(result[sample]);
                if(i == 6) {
                  i = 2;
                  j = j+1;
                  samples.push([]);
                  samples[j].push(result[sample]);
                } else {
                  samples[j].push(result[sample]);
                  i = i+1;
                }
              }
              res.render("upload", { title: 'Canvas - Videos', sample: true, v: samples, error: true });
            } else if(errorObj == "key") {
              var samples = [];
              var i = 1;
              var j = 0;
              samples.push([]);
              for(var sample in result) {
                console.log(result[sample]);
                if(i == 6) {
                  i = 2;
                  j = j+1;
                  samples.push([]);
                  samples[j].push(result[sample]);
                } else {
                  samples[j].push(result[sample]);
                  i = i+1;
                }
              }
              res.render("upload", { title: 'Canvas - Videos', sample: true, v: samples, errorkey: true });
            } else if(errorObj == "delete") {
              var samples = [];
              var i = 1;
              var j = 0;
              samples.push([]);
              for(var sample in result) {
                console.log(result[sample]);
                if(i == 6) {
                  i = 2;
                  j = j+1;
                  samples.push([]);
                  samples[j].push(result[sample]);
                } else {
                  samples[j].push(result[sample]);
                  i = i+1;
                }
              }
              res.render("upload", { title: 'Canvas - Videos', sample: true, v: samples, errordelete: true });
            } else {
              var samples = [];
              var i = 1;
              var j = 0;
              samples.push([]);
              for(var sample in result) {
                console.log(result[sample]);
                if(i == 6) {
                  i = 2;
                  j = j+1;
                  samples.push([]);
                  samples[j].push(result[sample]);
                } else {
                  samples[j].push(result[sample]);
                  i = i+1;
                }
              }
              console.log(samples);
              res.render("upload", { title: 'Canvas - Videos', sample: true, v: samples });
            }
          } else {
            res.render("upload", { title: 'Canvas - Videos', sample: true, v: null });
          }
        });
      }
    });
  } else if(queryObj == "g") {
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
      if(err) {
        console.log(err);
        res.render("adminChange", { title: 'Canvas - Admin', error: true });
      } else {
        db.db("canvas").collection('gallery').find({}).toArray(function(err, result) {
          if(result) {
            console.log(result);
            if(errorObj == "t") {
              var samples = [];
              var i = 1;
              var j = 0;
              samples.push([]);
              for(var sample in result) {
                console.log(result[sample]);
                if(i == 6) {
                  i = 2;
                  j = j+1;
                  samples.push([]);
                  samples[j].push(result[sample]);
                } else {
                  samples[j].push(result[sample]);
                  i = i+1;
                }
              }
              res.render("upload", { title: 'Canvas - Videos', gallery: true, v: samples, error: true });
            } else if(errorObj == "key") {
              var samples = [];
              var i = 1;
              var j = 0;
              samples.push([]);
              for(var sample in result) {
                console.log(result[sample]);
                if(i == 6) {
                  i = 2;
                  j = j+1;
                  samples.push([]);
                  samples[j].push(result[sample]);
                } else {
                  samples[j].push(result[sample]);
                  i = i+1;
                }
              }
              res.render("upload", { title: 'Canvas - Videos', gallery: true, v: samples, errorkey: true });
            } else if(errorObj == "delete") {
              var samples = [];
              var i = 1;
              var j = 0;
              samples.push([]);
              for(var sample in result) {
                console.log(result[sample]);
                if(i == 6) {
                  i = 2;
                  j = j+1;
                  samples.push([]);
                  samples[j].push(result[sample]);
                } else {
                  samples[j].push(result[sample]);
                  i = i+1;
                }
              }
              res.render("upload", { title: 'Canvas - Videos', gallery: true, v: samples, errordelete: true });
            } else {
              var samples = [];
              var i = 1;
              var j = 0;
              samples.push([]);
              for(var sample in result) {
                console.log(result[sample]);
                if(i == 6) {
                  i = 2;
                  j = j+1;
                  samples.push([]);
                  samples[j].push(result[sample]);
                } else {
                  samples[j].push(result[sample]);
                  i = i+1;
                }
              }
              console.log(samples);
              res.render("upload", { title: 'Canvas - Videos', gallery: true, v: samples });
            }
          } else {
            res.render("upload", { title: 'Canvas - Videos', gallery: true, v: null });
          }
        });
      }
    });
  } else if(queryObj == "gp") {
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
      if(err) {
        console.log(err);
        res.render("adminChange", { title: 'Canvas - Admin', error: true });
      } else {
        db.db("canvas").collection('galleryp').find({}).toArray(function(err, result) {
          if(result) {
            console.log(result);
            if(errorObj == "t") {
              res.render("upload", { title: 'Canvas - Gallery', galleryp: true, v: result, error: true });
            } else if(errorObj == "key") {
              res.render("upload", { title: 'Canvas - Gallery', galleryp: true, v: result, errorkey: true });
            } else if(errorObj == "delete") {
              res.render("upload", { title: 'Canvas - Gallery', galleryp: true, v: result, errordelete: true });
            } else {
              res.render("upload", { title: 'Canvas - Gallery', galleryp: true, v: result });
            }
          } else {
            res.render("upload", { title: 'Canvas - Gallery', galleryp: true, v: null });
          }
        });
      }
    });
  } else if(queryObj == "cat") {
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
      if(err) {
        console.log(err);
        res.render("adminChange", { title: 'Canvas - Admin', error: true });
      } else {
        db.db("canvas").collection('categories').find({}).toArray(function(err, result) {
          if(result) {
            console.log(result);
            if(errorObj == "t") {
              res.render("upload", { title: 'Canvas - Categories', category: true, v: result, error: true });
            } else if(errorObj == "key") {
              res.render("upload", { title: 'Canvas - Categories', category: true, v: result, errorkey: true });
            } else if(errorObj == "delete") {
              res.render("upload", { title: 'Canvas - Categories', category: true, v: result, errordelete: true });
            } else {
              res.render("upload", { title: 'Canvas - Categories', category: true, v: result });
            }
          } else {
            res.render("upload", { title: 'Canvas - Categories', category: true, v: null });
          }
        });
      }
    });
  }
});

module.exports = router;
