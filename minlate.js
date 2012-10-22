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
        render = function(template, values, startChar, endChar) {
          
          var buf = "",
              bufOpen = 0,
              result = "",
              currentChar = "",
              values = values || {};
          
          // process template char by char, look for tokens
          for (var i = 0; i < template.length; i++) {
            currentChar = template.charAt(i);
            switch (currentChar) {
              case startChar:
                bufOpen = 1;
                break;
              case endChar:
                result += values[buf] || "";
                bufOpen = 0;
                buf = "";
                break;
              default:
                if (bufOpen) {
                  buf += currentChar;
                } else {
                  result += currentChar;
                }
             }
          }
          return result;
        },
        initCSS = function() {
          // add css rule to hide all templates
          cssEl.type = "text/css";
          if (cssEl.styleSheet) {
              cssEl.styleSheet.cssText = cssHide;
          } else {
              cssEl.appendChild(document.createTextNode(cssHide));
          }
          document.getElementsByTagName("head")[0].appendChild(cssEl);      
        };
    
        initCSS();
    
    // public interface
    return function(options) {
      
      var inDOMNode,
          sourceNode,
          copyNode,
          values = options.values || {},
          savedTemplateNodes,
          startChar = options.startChar || "{",
          endChar = options.endChar || "}";
          
      if (options.id) {// render a template specified in the DOM
        inDOMNode = document.getElementById(options.id);
        sourceNode = savedTemplateNodes[options.id] || inDOMNode;
        if (sourceNode && sourceNode.className.indexOf(/\bminlate\b/) !== -1) {
          copyNode = sourceNode.cloneNode();
          copyNode.innerHTML = render(sourceNode.innerHTML, values, startChar, endChar);
          copyNode.className = copy.className.replace(/\bminlate\b/,"");
          savedTemplateNodes[options.id] = sourceNode;
          inDOMNode.parentNode.replaceChild(copyNode, inDOMNode);
          return copyNode;
        }
        throw "Invalid template element";
      } else {// render a template provided as a string
        if (options.template && (typeof options.template === "string")) {
          return render(options.template, values, startChar, endChar);
        }
        throw "Invalid template string";
      }
    };
     
}(document);