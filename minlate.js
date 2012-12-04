/*!
 * Minlate JS - v2.0 - 10/21/2012
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
        mem = {}, // store used templates outside of DOM
        render = function(template, values, startChar, endChar, groupStartChar, groupEndChar, escChar) {
          
          var buf = "",
              bufOpen = 0,
              grpStartIndex,// index of the beginning of current group
              grpCount = -1,// number of times through current group, group closed if < zero
              result = "",
              currentChar = "",
              values = values || {},
              value,
              arrLength;
          
          // process template char by char
          for (var i = 0; i < template.length; i++) {
            currentChar = template.charAt(i);            
            switch (currentChar) {
              case startChar:// start capturing a value                
                bufOpen = 1;
                break;
              case endChar:// done capturing a value
                value = values[buf] || "";
                if (grpCount+1 && value instanceof Array) {// in a group and value is an array
                   arrLength = value.length;// save the length of value array
                   if (arrLength) value = value[grpCount];// if the array has a length, get the value
                   if (grpCount >= arrLength-1) grpCount = -1;// no more elements, mark group exhausted
                }
                result += value;// add retrieved value to end result
                bufOpen = 0;// clear the value buffer
                buf = "";
                break;
              case groupStartChar:
                if (grpCount == -1) grpCount++;
                grpStartIndex = i;
                break;
              case groupEndChar:
                if (grpCount+1) {// groupCount was not set to -1
                  i = grpStartIndex - 1;// start group again
                  grpCount++;
                }// otherwise this group is done..
                break;
              case escChar:
                currentChar = template.charAt(++i);// jump ahead one
              default:
                if (bufOpen) buf += currentChar;
                else result += currentChar;                
             }
          }
          return result;
        };
        
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
      if (specialCharCount) throw new Error("Special characters must be unique.");
      
      if (opts.id) {// render a template specified in the DOM
        inDOMNode = document.getElementById(opts.id);
        sourceNode = savedNodes[opts.id] || inDOMNode;
        if (sourceNode && sourceNode.className.match(/\bminlate\b/)) {
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
          copyNode.className = copyNode.className.replace(/\bminlate\b/,"");
          savedNodes[opts.id] = sourceNode;
          opts.inPlace && inDOMNode.parentNode.replaceChild(copyNode, inDOMNode);
          return copyNode;
        }
        throw new Error("Invalid template element.");
      } else {// render a template provided as a string
        if (typeof templateStr === "string") {
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
        throw new Error("Invalid template string.");
      }
    };
     
}(document);