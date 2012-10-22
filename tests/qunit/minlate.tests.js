(function() {
  
  module("Minlate-js Tests");
  
  test("Simple minlate test, template provided", function() {
    
    var template = "<p>Hello {key}!</p>",
        expected = "<p>Hello World!</p>",
        actual;
        
    actual = minlate({
      template : template,
      values : {
        key : "World"
      }
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
    
  });
  
  test("Test overriding replacement symbols", function() {
    
    var template = "<p>Hello [key]!</p>",
        expected = "<p>Hello World!</p>",
        actual;
        
    actual = minlate({
      template : template,
      values : {
        key : "World"
      },
      startChar : "[",
      endChar : "]"
    });
    
    equal(actual, expected, "Expect correctly rendered template.");
     
  });

})();