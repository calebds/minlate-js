/*!
 * Minlate JS - v2.0 - 12/4/2012
 * 
 * Copyright (c) 2012 "Paislee" Caleb Sotelo
 * Dual licensed under the MIT and GPL licenses.
 * http://dev.paislee.net/about/license/
 */

/**
 * Example: paislee.net/minlate/minlate-test.html
 * 
 * minlate A miniature, logic-less templating function written in JavaScript.
 * 
 *
 */
var minlate = function(document) {

    var cssHide = ".minlate{display:none !important;}",
        cssEl = document.createElement("style"),
        CLASS_NAME = "className",
        mem = {}, // store used templates outside of DOM
        render = function(template, values, startChar, endChar, groupStartChar, groupEndChar, escChar) {
          
          var buf = "",
              bufOpen = 0,
              grpStartIndex,// index of the beginning of current group
              grpCount = 0,// number of times through current group
              grpOpen = 0,// true if a group is being processed
              grpDone = 0,// true if we exhausted any value lists within a group
              result = "",// the final result string
              currentChar = "",// the current character of the input template
              values = values || {},// the replacement value map, or empty map
              value,
              noArrays = 1;
          
          // process template char by char
          for (var i = 0; i < template.length; i++) {
            currentChar = template.charAt(i);            
            switch (currentChar) {
              case startChar:// start capturing a value
                bufOpen && throwErr("",i,currentChar);
                bufOpen = 1;
                break;
              case endChar:// done capturing a value
                !bufOpen && throwErr("",i,currentChar);
                value = values[buf] || "";
                if (value instanceof Array) {// an array was provided
                  value = value[grpCount];// get the value
                  if (grpOpen && (grpCount >= values[buf].length-1)) grpDone = 1;
                  // no more elements, mark group exhausted
                  noArrays = 0;
                } else noArrays = 1;// prevent infinite loop
                result += value || "";// add retrieved value to end result
                bufOpen = 0;// clear the value buffer
                buf = "";
                break;
              case groupStartChar:// beginning of a group
                grpOpen && throwErr("",i,currentChar);
                grpOpen = 1;// open group state
                grpStartIndex = i;// remember the starting index of this group
                break;
              case groupEndChar:// the end of a group
                !grpOpen && throwErr("",i,currentChar);
                if (noArrays) grpDone = 1;                
                if (!grpDone) {
                  i = grpStartIndex - 1;// start group again
                  grpCount++;
                } else {// otherwise this group is done..
                  grpDone = grpCount = 0;// reset everything
                }
                grpOpen = 0;// do this every time for error checking
                break;
              case escChar:
                currentChar = template.charAt(++i);// jump ahead one
              default:
                if (bufOpen) buf += currentChar;
                else result += currentChar;                
             }
          }
          if (grpOpen || bufOpen) throwErr();// something didn't close
          return result;
        },
        throwErr = function(message, index, token) {
          var suffix = "";
          if (typeof index != "undefined") suffix += " at index " + index;
          if (typeof token != "undefined") suffix += ": '" + token + "'";
          throw new Error((message || "Invalid template") + suffix + ".");
        }
        
        cssEl.type = "text/css";
        if (cssEl.styleSheet) {
            cssEl.styleSheet.cssText = cssHide;
        } else {
            cssEl.appendChild(document.createTextNode(cssHide));
        }
        document.getElementsByTagName("head")[0].appendChild(cssEl);
    
    // public interface
    // opts:
    //   templateString
    //   id
    //   values
    //   inPlace
    //   startChar
    //   endChar
    //   groupStartChar
    //   groupEndChar
    //   escapeChar
    return function(opts) {
      
      var inDOMNode,
          sourceNode,
          copyNode,
          templateStr       = opts.templateString,
          values            = opts.values || {},
          savedNodes        = {},
          startChar         = opts.startChar || "{",
          endChar           = opts.endChar || "}",
          groupStartChar    = opts.groupStartChar || "[",
          groupEndChar      = opts.groupEndChar || "]",
          escChar           = opts.escapeChar || "\\",
          specialCharMap    = {},
          specialCharCount  = 0;
      
      // make sure special characters are unique
      specialCharMap[startChar]       = ++specialCharCount;
      specialCharMap[endChar]         = ++specialCharCount;
      specialCharMap[groupStartChar]  = ++specialCharCount;
      specialCharMap[groupEndChar]    = ++specialCharCount;
      specialCharMap[escChar]         = ++specialCharCount;      
      for (var specialChar in specialCharMap) {
        specialCharMap.hasOwnProperty(specialChar) && specialCharCount--;
      }
      if (specialCharCount) throwErr("Special characters must be unique.");
      
      if (opts.id) {// render a template specified in the DOM
        inDOMNode = document.getElementById(opts.id);
        sourceNode = savedNodes[opts.id] || inDOMNode;
        if (sourceNode && sourceNode[CLASS_NAME].match(/\bminlate\b/)) {
          copyNode = sourceNode.cloneNode();
          copyNode.innerHTML = render(
            sourceNode.innerHTML,
            values,
            startChar,
            endChar,
            groupStartChar,
            groupEndChar,
            escChar
          );
          copyNode[CLASS_NAME] = copyNode[CLASS_NAME].replace(/\bminlate\b/,"");
          savedNodes[opts.id] = sourceNode;
          opts.inPlace && inDOMNode.parentNode.replaceChild(copyNode, inDOMNode);
          return copyNode;
        }
        throwErr("Invalid template element");
      } else {// render a template provided as a string
        if (typeof templateStr == "string") {
          return render(
            templateStr,
            values,
            startChar,
            endChar,
            groupStartChar,
            groupEndChar,
            escChar
          );
        }
        throwErr();
      }
    };
     
}(document);