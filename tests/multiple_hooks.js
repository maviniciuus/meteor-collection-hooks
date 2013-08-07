Tinytest.addAsync("general - multiple hooks should all fire the appropriate number of times", function (test, next) {
  var collection = new Meteor.Collection(null);
  var counts = {
    before: {
      insert: 0,
      update: 0,
      remove: 0
    },
    after: {
      insert: 0,
      update: 0,
      remove: 0
    }
  };

  collection.before({
    insert: function () { counts.before.insert++; },
    update: function () { counts.before.update++; },
    remove: function () { counts.before.remove++; },
  });

  collection.before({
    insert: function () { counts.before.insert++; },
    update: function () { counts.before.update++; },
    remove: function () { counts.before.remove++; },
  });

  collection.after({
    insert: function () { counts.after.insert++; },
    update: function () { counts.after.update++; },
    remove: function () { counts.after.remove++; },
  });

  collection.after({
    insert: function () { counts.after.insert++; },
    update: function () { counts.after.update++; },
    remove: function () { counts.after.remove++; },
  });

  InsecureLogin.ready(function () {
    collection.insert({start_value: true}, function (err, id) {
      if (err) throw err;
      collection.update({_id: id}, {$set: {}}, function (err) {
        if (err) throw err;
        collection.remove({_id: id}, function (err) {
          test.equal(counts.before.insert, 2);
          test.equal(counts.before.update, 2);
          test.equal(counts.before.remove, 2);
          test.equal(counts.after.insert, 2);
          test.equal(counts.after.update, 2);
          test.equal(counts.after.remove, 2);
          next();
        })
      });
    });
  });
});