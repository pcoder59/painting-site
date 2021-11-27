var express = require('express');
var router = express.Router();
const url = require('url');
var MongoClient = require('mongodb').MongoClient;
var md5 = require("md5");
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    if(err) {
      console.log(err);
      res.render("index", { title: 'Canvas', error: true });
    } else {
      db.db("canvas").collection('videos').find({}).toArray(function(err, result) {
        if(result) {
          console.log(result);
          db.db("canvas").collection('sample').find({}).toArray(function(err, resul) {
            if(resul) {
              console.log(sample);
              var samples = [];
              var i = 1;
              var j = 0;
              samples.push([]);
              for(var sample in resul) {
                console.log(result[sample]);
                if(i == 6) {
                  i = 2;
                  j = j+1;
                  samples.push([]);
                  samples[j].push(resul[sample]);
                } else {
                  samples[j].push(resul[sample]);
                  i = i+1;
                }
              }
              console.log(samples);
              res.render("index", { title: 'Canvas', videos: true, images: true, v: result, s: samples });
            } else {
              res.render("index", { title: 'Canvas', videos: true, images: null, v: result, s: null });
            }
          });
        } else {
          db.db("canvas").collection('sample').find({}).toArray(function(err, resul) {
            if(resul) {
              console.log(resul);
              res.render("index", { title: 'Canvas', videos: false, images:true, v: null, s: resul });
            } else {
              res.render("index", { title: 'Canvas', videos: false, images:false, v: null, s: null });
            }
          });
        }
      });
    }
  });
});

router.get("/gallery", function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    if(err) {
      console.log(err);
      res.render("index", { title: 'Canvas', error: true });
    } else {
      db.db("canvas").collection('gallery').find({}).toArray(function(err, result) {
        if(result) {
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
          db.db("canvas").collection('galleryp').find({}).toArray(function(err, result) {
            if(result) {
              var samplesp = [];
              var i = 1;
              var j = 0;
              samplesp.push([]);
              for(var sample in result) {
                console.log(result[sample]);
                if(i == 3) {
                  i = 2;
                  j = j+1;
                  samplesp.push([]);
                  samplesp[j].push(result[sample]);
                } else {
                  samplesp[j].push(result[sample]);
                  i = i+1;
                }
              }
              res.render("gallery", { title: 'Canvas - Gallery', gallery: true, galleryp: true, v: samples, g: samplesp });
            } else {
              res.render("gallery", { title: 'Canvas - Gallery', gallery: true, galleryp: false, v: samples, g: null });
            }
          });
        } else {
          db.db("canvas").collection('galleryp').find({}).toArray(function(err, result) {
            if(result) {
              var samplesp = [];
              var i = 1;
              var j = 0;
              samplesp.push([]);
              for(var sample in result) {
                console.log(result[sample]);
                if(i == 6) {
                  i = 2;
                  j = j+1;
                  samplesp.push([]);
                  samplesp[j].push(result[sample]);
                } else {
                  samplesp[j].push(result[sample]);
                  i = i+1;
                }
              }
              res.render("gallery", { title: 'Canvas - Gallery', gallery: false, galleryp: true, v: null, g: samplesp });
            } else {
              res.render("gallery", { title: 'Canvas - Gallery', gallery: false, galleryp: false, v: null, g: null });
            }
          });
        }
      });
    }
  });
});

router.get("/category", function(req, res, next) {
  var queryObj = url.parse(req.url, true).query.q;
  if(queryObj == "pencil") {
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
      if(err) {
        console.log(err);
        res.render("index", { title: 'Canvas', error: true });
      } else {
        db.db("canvas").collection("categories").find({"category": "Pencil Drawing"}).toArray(function(err, result) {
          if(err) {
            console.log(err);
            res.render("index", { title: 'Canvas', error: true });
          } else {
            if(result) {

              console.log(result);
              res.render("category", { title: 'Canvas - Pencil Drawings', v: result});
            } else {
              res.render("category", { title: 'Canvas - Pencil Drawings', v: null});
            }
          }
        });
      }
    });
  } else if(queryObj == "painting") {
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
      if(err) {
        console.log(err);
        res.render("index", { title: 'Canvas', error: true });
      } else {
        db.db("canvas").collection("categories").findOne({"category": "Painting"}, function(err, result) {
          if(err) {
            console.log(err);
            res.render("index", { title: 'Canvas - Paintings', error: true });
          } else {
            if(result) {
              res.render("category", { title: 'Canvas - Paintings', v: result});
            } else {
              res.render("category", { title: 'Canvas - Paintings', v: null});
            }
          }
        });
      }
    });
  } else if(queryObj == "art") {
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
      if(err) {
        console.log(err);
        res.render("index", { title: 'Canvas', error: true });
      } else {
        db.db("canvas").collection("categories").findOne({"category": "Bottle Art"}, function(err, result) {
          if(err) {
            console.log(err);
            res.render("index", { title: 'Canvas - Bottle Art', error: true });
          } else {
            if(result) {
              res.render("category", { title: 'Canvas - Bottle Art', v: result});
            } else {
              res.render("category", { title: 'Canvas - Bottle Art', v: null});
            }
          }
        });
      }
    });
  } else if(queryObj == "mural") {
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
      if(err) {
        console.log(err);
        res.render("index", { title: 'Canvas', error: true });
      } else {
        db.db("canvas").collection("categories").findOne({"category": "Bottle Art"}, function(err, result) {
          if(err) {
            console.log(err);
            res.render("index", { title: 'Canvas - Mural Painting', error: true });
          } else {
            if(result) {
              res.render("category", { title: 'Canvas - Mural Painting', v: result});
            } else {
              res.render("category", { title: 'Canvas - Mural Painting', v: null});
            }
          }
        });
      }
    });
  }
});

router.get("/admin", function(req, res, next) {
  res.render("admin", { title: 'Canvas- Admin '});
});

router.post("/loginadm", function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    if(err) {
      console.log(err);
      res.render("admin", { title: 'Canvas -Admin', error: true });
    } else {
      db.db("canvas").collection("admin").findOne({"username": req.body.username}, function(err, result) {
        if(err) {
          console.log(err);
          res.render("admin", { title: 'Canvas -Admin', error: true });
        } else {
          if(result) {
            if(result.password == md5(req.body.password)) {
              req.session.username = result.username;
              res.render("adminChange", { title: 'Canvas - Admin' });
            } else {
              res.render("admin", { title: 'Canvas -Admin', errorPass: true });
            }
          } else {
            res.render("admin", { title: 'Canvas -Admin', errorUser: true });
          }
        }
      });
    }
  });
});

router.get("/adminChange", function(req, res, next) {
  res.render("adminChange", { title: 'Canvas - Admin' });
});

router.post("/upgallery", function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    if(err) {
      console.log(err);
      res.redirect("/uvideos?q=g&e=t");
    } else {
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields,files) {
        if(err) {
          console.log(err);
          res.redirect("/uvideos?q=g&e=t");
        } else {
          db.db("canvas").collection("gallery").findOne({"filename": fields.filename}, async function(err, result) {
            if(err) {
              console.log(err);
              res.redirect("/uvideos?q=g&e=t");
            } else {
              if(result) {
                res.redirect("/uvideos?q=g&e=key");
              } else {
                await db.db("canvas").collection("gallery").insertOne({"filename": fields.filename});
                var oldpath = files.file.filepath;
                var newpath = "/home/prem/രേഖകള്‍/Projects/Canvas/public/images/gallery/"+fields.filename+".jpg";
                fs.copyFile(oldpath, newpath, function(err) {
                  if(err) {
                    console.log(err);
                    res.redirect("/uvideos?q=g&e=t");
                  } else {
                    console.log("File Uploaded!");
                    res.redirect("/uvideos?q=g");
                  }
                });
              }
            }
          });
        }
      });
    }
  });
});

router.post("/upgalleryp", function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    if(err) {
      console.log(err);
      res.redirect("/uvideos?q=gp&e=t");
    } else {
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields,files) {
        if(err) {
          console.log(err);
          res.redirect("/uvideos?q=gp&e=t");
        } else {
          db.db("canvas").collection("galleryp").findOne({"filename": fields.filename}, async function(err, result) {
            if(err) {
              console.log(err);
              res.redirect("/uvideos?q=gp&e=t");
            } else {
              if(result) {
                res.redirect("/uvideos?q=gp&e=key");
              } else {
                await db.db("canvas").collection("galleryp").insertOne({"filename": fields.filename, "description": fields.description});
                var oldpath = files.file.filepath;
                var newpath = "/home/prem/രേഖകള്‍/Projects/Canvas/public/images/galleryp/"+fields.filename+".jpg";
                fs.copyFile(oldpath, newpath, function(err) {
                  if(err) {
                    console.log(err);
                    res.redirect("/uvideos?q=gp&e=t");
                  } else {
                    console.log("File Uploaded!");
                    res.redirect("/uvideos?q=gp");
                  }
                });
              }
            }
          });
        }
      });
    }
  });
});

router.post("/upcategory", function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    if(err) {
      console.log(err);
      res.redirect("/uvideos?q=cat&e=t");
    } else {
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields,files) {
        if(err) {
          console.log(err);
          res.redirect("/uvideos?q=cat&e=t");
        } else {
          db.db("canvas").collection("categories").findOne({"filename": fields.filename}, async function(err, result) {
            if(err) {
              console.log(err);
              res.redirect("/uvideos?q=cat&e=t");
            } else {
              if(result) {
                res.redirect("/uvideos?q=cat&e=key");
              } else {
                await db.db("canvas").collection("categories").insertOne({"filename": fields.filename, "description": fields.description, "artist": fields.artist, "price": fields.price, "category": fields.category});
                var oldpath = files.file.filepath;
                var newpath = "/home/prem/രേഖകള്‍/Projects/Canvas/public/images/category/"+fields.filename+".jpg";
                fs.copyFile(oldpath, newpath, function(err) {
                  if(err) {
                    console.log(err);
                    res.redirect("/uvideos?q=cat&e=t");
                  } else {
                    console.log("File Uploaded!");
                    res.redirect("/uvideos?q=cat");
                  }
                });
              }
            }
          });
        }
      });
    }
  });
});

router.post("/upsample", function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    if(err) {
      console.log(err);
      res.redirect("/uvideos?q=s&e=t");
    } else {
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields,files) {
        if(err) {
          console.log(err);
          res.redirect("/uvideos?q=s&e=t");
        } else {
          db.db("canvas").collection("sample").findOne({"filename": fields.filename}, async function(err, result) {
            if(err) {
              console.log(err);
              res.redirect("/uvideos?q=s&e=t");
            } else {
              if(result) {
                res.redirect("/uvideos?q=s&e=key");
              } else {
                await db.db("canvas").collection("sample").insertOne({"filename": fields.filename});
                var oldpath = files.file.filepath;
                var newpath = "/home/prem/രേഖകള്‍/Projects/Canvas/public/images/"+fields.filename+".jpg";
                fs.copyFile(oldpath, newpath, function(err) {
                  if(err) {
                    console.log(err);
                    res.redirect("/uvideos?q=s&e=t");
                  } else {
                    console.log("File Uploaded!");
                    res.redirect("/uvideos?q=s");
                  }
                });
              }
            }
          });
        }
      });
    }
  });
});

router.get("/deleteGal", function(req, res, next) {
  var queryObj = url.parse(req.url, true).query.v;
  MongoClient.connect("mongodb://localhost:27017/", async function(err, db) {
    if(err) {
      console.log(err);
      res.redirect("/uvideos?q=g&e=delete");
    } else {
      await db.db("canvas").collection('gallery').deleteOne({"filename": queryObj});
      fs.unlink("/home/prem/രേഖകള്‍/Projects/Canvas/public/images/gallery/"+queryObj+".jpg", function(err) {
        if(err) {
          console.log(err);
          res.redirect("/uvideos?q=g&e=delete");
        } else {
          console.log("File Deleted!");
          res.redirect("/uvideos?q=g");
        }
      });
    }
  });
});

router.get("/deleteGalp", function(req, res, next) {
  var queryObj = url.parse(req.url, true).query.v;
  MongoClient.connect("mongodb://localhost:27017/", async function(err, db) {
    if(err) {
      console.log(err);
      res.redirect("/uvideos?q=gp&e=delete");
    } else {
      await db.db("canvas").collection('galleryp').deleteOne({"filename": queryObj});
      fs.unlink("/home/prem/രേഖകള്‍/Projects/Canvas/public/images/galleryp/"+queryObj+".jpg", function(err) {
        if(err) {
          console.log(err);
          res.redirect("/uvideos?q=gp&e=delete");
        } else {
          console.log("File Deleted!");
          res.redirect("/uvideos?q=gp");
        }
      });
    }
  });
});

router.get("/deleteCat", function(req, res, next) {
  var queryObj = url.parse(req.url, true).query.v;
  MongoClient.connect("mongodb://localhost:27017/", async function(err, db) {
    if(err) {
      console.log(err);
      res.redirect("/uvideos?q=cat&e=delete");
    } else {
      await db.db("canvas").collection('categories').deleteOne({"filename": queryObj});
      fs.unlink("/home/prem/രേഖകള്‍/Projects/Canvas/public/images/category/"+queryObj+".jpg", function(err) {
        if(err) {
          console.log(err);
          res.redirect("/uvideos?q=cat&e=delete");
        } else {
          console.log("File Deleted!");
          res.redirect("/uvideos?q=cat");
        }
      });
    }
  });
});

router.get("/deleteSam", function(req, res, next) {
  var queryObj = url.parse(req.url, true).query.v;
  MongoClient.connect("mongodb://localhost:27017/", async function(err, db) {
    if(err) {
      console.log(err);
      res.redirect("/uvideos?q=s&e=delete");
    } else {
      await db.db("canvas").collection('sample').deleteOne({"filename": queryObj});
      fs.unlink("/home/prem/രേഖകള്‍/Projects/Canvas/public/images/"+queryObj+".jpg", function(err) {
        if(err) {
          console.log(err);
          res.redirect("/uvideos?q=s&e=delete");
        } else {
          console.log("File Deleted!");
          res.redirect("/uvideos?q=s");
        }
      });
    }
  });
});

router.post("/upvideo", function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    if(err) {
      console.log(err);
      res.redirect("/uvideos?q=v&e=t");
    } else {
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields,files) {
        if(err) {
          console.log(err);
          res.redirect("/uvideos?q=v&e=t");
        } else {
          db.db("canvas").collection("videos").findOne({"name": fields.filename}, async function(err, result) {
            if(err) {
              console.log(err);
              res.redirect("/uvideos?q=v&e=t");
            } else {
              if(result) {
                res.redirect("/uvideos?q=v&e=key");
              } else {
                await db.db("canvas").collection("videos").insertOne({"name": fields.filename});
                var oldpath = files.file.filepath;
                var newpath = "/home/prem/രേഖകള്‍/Projects/Canvas/public/videos/"+fields.filename+".mp4";
                fs.copyFile(oldpath, newpath, function(err) {
                  if(err) {
                    console.log(err);
                    res.redirect("/uvideos?q=v&e=t");
                  } else {
                    console.log("File Uploaded!");
                    res.redirect("/uvideos?q=v");
                  }
                });
              }
            }
          });
        }
      });
    }
  });
});

router.get("/deleteVid", function(req, res, next) {
  var queryObj = url.parse(req.url, true).query.v;
  MongoClient.connect("mongodb://localhost:27017/", async function(err, db) {
    if(err) {
      console.log(err);
      res.redirect("/uvideos?q=v&e=delete");
    } else {
      await db.db("canvas").collection('videos').deleteOne({"name": queryObj});
      fs.unlink("/home/prem/രേഖകള്‍/Projects/Canvas/public/videos/"+queryObj+".mp4", function(err) {
        if(err) {
          console.log(err);
          res.redirect("/uvideos?q=v&e=delete");
        } else {
          console.log("File Deleted!");
          res.redirect("/uvideos?q=v");
        }
      });
    }
  });
});

module.exports = router;