db.artistsnestedsongs.findOne()

db.artistsnestedsongs.find({Link : {$exists:true}},{Artist: 1, Genre:1})

db.artistsnestedsongs.find( { Artist: { $regex: /Stones/ } } )

db.artistsnestedsongs.find( { Artist: { $regex: /Stones/ } } ).count()

db.artistsnestedsongs.find({Popularity : {$gt : 4 }}, {Artist: 1})

db.artistsnestedsongs.find({Popularity : {$lt : 1 }}, {Artist: 1})

db.artistsnestedsongs.find( { $where: "this.Songs.length >= 10" } ,{Artist: 1});

db.artistsnestedsongs.find( { $where: "this.Songs.length == 0" } ,{Artist: 1});


//9. (3 point) - Give the list of artists that have at list 10 distinct songs listed and the criteria that you used for this distinct operation.//
db.artistsnestedsongs.aggregate([
 { $match : {Artist : {"$exists":true}, Songs : {"$exists":true}}},
 { $project: {
   "Artist": 1,
   "Songs": 1,
   "distinct_songs_count": { 
     "$size": { "$setDifference": [ "$Songs.SLink", [] ] }
   } 
  }}
])



//10,11 : complete set of genres
db.artistsnestedsongs.aggregate([
{"$addFields" : {GenreList : {$split : ["$Genres",";"] }}},
{$group: {_id: null, items: {$push: '$GenreList'}}},
{$addFields : {"items" : 
    {$reduce : {input : "$items", initialValue : [], in :{$setUnion:["$$value", "$$this"]}}} 
    }},
 {$unwind: '$items'},
]).itcount()


//12. (3 points) - Give the number of artists having Folk among the genres
db.artistsnestedsongs.find({  Genres: { $regex: /Folk/ }   }).count()


//13. (3 points) Give the number of song by main genre of the artist and language.
db.artistsnestedsongs.aggregate([
    { $match : {Artist : {"$exists":true}, Genre : {"$exists":true}}},
    { $project: {just_songs: { "$size": "$Songs" }, Artist : 1 , Genre: 1}},
    { $group: { _id : "$Genre", totalSongs :  {$sum : "$just_songs"}}}
    ]);




db.artistsnestedsongs.find()


