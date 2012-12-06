(function() {
  
  module("Rendering tests");
  
  test("Render simple template out of DOM", function() {
    
    var template = "<p>Hello {key}!</p>",
        expected = "<p>Hello World!</p>",
        actual;
        
    actual = minlate({
      templateString : template,
      values : {
        key : "World"
      }
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
    
  });
  
  test("Render larger template out of DOM", function() {
    
      var template = "Lorem {one} dolor sit amet, {two} adipiscing elit. Mauris ultricies {three} turpis, viverra pharetra sem {four} non. Donec a mi vel orci luctus {five} nec nec quam. Morbi facilisis tempor odio in {six}. Sed gravida viverra {seven}. Vestibulum condimentum ligula a eros {eight} dapibus non a quam. Integer {nine} commodo ornare. Aenean urna nibh, adipiscing ac auctor {ten}, mollis a velit. Nam non diam non mauris {eleven} vestibulum eu sit amet leo. {twelve} potenti. Nulla facilisi.",
          expected = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies auctor turpis, viverra pharetra sem posuere non. Donec a mi vel orci luctus facilisis nec nec quam. Morbi facilisis tempor odio in ultricies. Sed gravida viverra sollicitudin. Vestibulum condimentum ligula a eros fermentum dapibus non a quam. Integer vestibulum commodo ornare. Aenean urna nibh, adipiscing ac auctor dictum, mollis a velit. Nam non diam non mauris vehicula vestibulum eu sit amet leo. Suspendisse potenti. Nulla facilisi.",          
          actual;

      actual = minlate({
        templateString : template,
        values : {
          one : "ipsum",
          two : "consectetur",
          three : "auctor",
          four : "posuere",
          five : "facilisis",
          six : "ultricies",
          seven : "sollicitudin",
          eight : "fermentum",
          nine : "vestibulum",
          ten : "dictum",
          eleven : "vehicula",
          twelve : "Suspendisse"
        }
      });
      
      equal(actual, expected, "Expect correctly rendered template.");
    });
    
  test("Render simple template with array value", function() {
    
    var template = "<p>Hello {key}!</p>",
        expected = "<p>Hello World!</p>",
        actual;
        
    actual = minlate({
      templateString : template,
      values : {
        key : ["World","ignore"]
      }
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
    
  });
  
  test("Render simple template out of DOM, override replacement symbols", function() {
    
    var template = "<p>Hello $key%!</p>",
        expected = "<p>Hello World!</p>",
        actual;
        
    actual = minlate({
      templateString : template,
      values : {
        key : "World"
      },
      startChar : "$",
      endChar : "%"
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
     
  });
  
  test("Render group template out of DOM", function() {
    
    var template = "Hello test[, {number}]!",
        expected = "Hello test, one, two, three!",
        actual;
        
    actual = minlate({
      templateString : template,
      values : {
        number : ["one", "two", "three"]
      }
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
    
  });
  
  test("Render group template, multiple values", function() {
    
    var template = "Hello test[, {numbers} AND {colors}]!",
        expected = "Hello test, one AND red, two AND orange, three AND yellow!",
        actual;
        
    actual = minlate({
      templateString : template,
      values : {
        colors : ["red", "orange", "yellow"],
        numbers : ["one", "two", "three"]
      }
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
    
  });
  
  test("Render group template, multiple groups", function() {
    
    var template = "Hello[ {numbers}] AND[ {colors}].",
        expected = "Hello one two three AND red orange yellow.",
        actual;
        
    actual = minlate({
      templateString : template,
      values : {
        colors : ["red", "orange", "yellow"],
        numbers : ["one", "two", "three"]
      }
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
    
  });
  
  test("Render group template without value list", function() {
    
    var template = "Hello test[, {number}]!",
        expected = "Hello test, one!",
        actual;
        
    actual = minlate({
      templateString : template,
      values : {
        number : "one"
      }
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
    
  });
  
  test("Render group template, multiple values mixed type", function() {
    
    var template = "Hello test[, {numbers} AND {colors}]!",
        expected = "Hello test, one AND red, one AND orange, one AND yellow!",
        actual;
        
    actual = minlate({
      templateString : template,
      values : {
        colors : ["red", "orange", "yellow"],
        numbers : "one"
      }
    });    
    equal(actual, expected, "Expect correctly rendered template.");
    
  });
  
  test("Render group template, multiple groups and values", function() {
    
    var template = "Hello test[, {numbers} AND {colors}]:[, {numbers} AND {colors}]!",
        expected = "Hello test, one AND red, two AND orange, three AND yellow:, one AND red, two AND orange, three AND yellow!",
        actual;
        
    actual = minlate({
      templateString : template,
      values : {
        colors : ["red", "orange", "yellow"],
        numbers : ["one", "two", "three"]
      }
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
    
  });
  
  module("Escape character");
  
  test("Render simple template with escape character", function() {
    
    var template = "<p>\\{Hello {key}!</p>",
        expected = "<p>{Hello World!</p>",
        actual;
        
    actual = minlate({
      templateString : template,
      values : {
        key : "World"
      }
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
    
  });
  
  test("Render simple template with escape character override", function() {
    
    var template = "<p>${Hello {key}!</p>",
        expected = "<p>{Hello World!</p>",
        actual;
        
    actual = minlate({
      templateString : template,
      escapeChar : "$",
      values : {
        key : "World"
      }
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
    
  });
  
  test("Render group template with escape char.", function() {
    
    var template = "Hello test[, \\[\\]{number}]!",
        expected = "Hello test, []one, []two, []three!",
        actual;
                
    actual = minlate({
      templateString : template,
      values : {
        number : ["one", "two", "three"]
      }
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
    
  });
  
  module("Errors");
  
  test("No template string", function() {    
    var callMinlate = function() {
      minlate({      
        values : {
          key : "World"
        }
      });
    };    
    raises(callMinlate, "Expect error thrown.");    
  });
  
  test("Unopened value in template string", function() {    
    var callMinlate = function() {
      minlate({
        templateString : "Hello }world"
      });
    };    
    raises(callMinlate, "Expect error thrown.");    
  });
  
  test("Unclosed value in template string", function() {    
    var callMinlate = function() {
      minlate({
        templateString : "Hello {world"
      });
    };    
    raises(callMinlate, "Expect error thrown.");    
  });
  
  test("Unopened value in group", function() {    
    var callMinlate = function() {
      minlate({
        templateString : "He[llo }wor]ld"
      });
    };    
    raises(callMinlate, "Expect error thrown.");    
  });
  
  test("Unclosed value in group", function() {    
    var callMinlate = function() {
      minlate({
        templateString : "He[llo {wor]ld"
      });
    };    
    raises(callMinlate, "Expect error thrown.");    
  });
  
  test("Unopened group in template string", function() {    
    var callMinlate = function() {
      minlate({
        templateString : "Hello ]world"
      });
    };    
    raises(callMinlate, "Expect error thrown.");    
  });
  
  test("Unclosed group in template string", function() {    
    var callMinlate = function() {
      minlate({
        templateString : "Hello [world"
      });
    };    
    raises(callMinlate, "Expect error thrown.");    
  });
  
  test("Duplicate special characters", function() {    
    var callMinlate = function() {
      minlate({
        templateString : "Hello {world}.",
        escapeChar : "{"
      });
    };    
    raises(callMinlate, "Expect error thrown.");    
  });
  
  test("Duplicate special characters", function() {    
    var callMinlate = function() {
      minlate({
        templateString : "Hello {world}.",
        escapeChar : "$",
        startChar : "$",
        grpStartChar : "$"
      });
    };    
    raises(callMinlate, "Expect error thrown.");    
  });

})();